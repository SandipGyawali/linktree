import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import Redis from "ioredis";
import { IORedisKey } from "src/constants/redis.constants";
import { createPrivateKey, generateKeyPairSync, KeyObject, randomBytes } from "crypto"
import { exportJWK, importJWK, jwtVerify, SignJWT } from "jose"

interface JwtPayload {
  sub: string;
  email: string;
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
}

interface StoredJWK {
  kid: string;
  jwk: Record<string, any>;
}

@Injectable()
export class JwtStrategy implements OnModuleInit {
  private currentKeyId: string | null = null;

  constructor(
    @Inject(IORedisKey) private readonly redisClient: Redis
  ) {}

  async onModuleInit() {
    await this.init();
    this.startKeyRotation();
  }

  async init(): Promise<void> {
    const keys = await this.redisClient.keys("jwks:*");

    if(keys.length == 0) {
      await this.rotateKeys();
    }else {
      this.currentKeyId = keys[0]?.split(":")[1] || null;
      if(!this.currentKeyId) {
        await this.rotateKeys();
      }
    }
  }


  async rotateKeys() {
    const { publicKey, privateKey } = generateKeyPairSync("rsa", {
      modulusLength: 2048,
    });

    const kid = crypto.randomUUID();

    const jwk = await exportJWK(publicKey);
    jwk.kid = kid;
    jwk.alg = "RSA256";
    jwk.use = "sig";

    await this.redisClient.set(`jwks:${kid}`, JSON.stringify(jwk));
    await this.redisClient.set(
      `private:${kid}`,
      privateKey.export({ format: "pem", type: "pkcs1" }).toString()
    );

    this.currentKeyId = kid;
  }

  async getJWKS(): Promise<StoredJWK[]> {
    const keys = await this.redisClient.keys("jwks:*");
    const jwks: StoredJWK[] = [];
    for(const key of keys) {
      const jwkStr = await this.redisClient.get(key);
      if(jwkStr) {
        const jwk = JSON.parse(jwkStr);
        jwks.push({ kid: jwk.kid, jwk })
      } 
    }
    return jwks;
  }

  private async getPrivateKey(): Promise<KeyObject> {
    if(!this.currentKeyId) throw new Error("No signing key available");
    const pem = await this.redisClient.get(`private:${this.currentKeyId}`);
    if(!pem) throw new Error("Private key not found in Redis");
    return createPrivateKey(pem);
  }

  async signAccessToken(
    payload: JwtPayload,
    issuer: string,
    audience: string,
  ): Promise<string> {
    if(!this.currentKeyId) throw new Error("No current key available");
    const privateKey = await this.getPrivateKey();
    return await new SignJWT(payload as any)
      .setProtectedHeader({ alg: "RS256", kid: this.currentKeyId })
      .setIssuedAt()
      .setIssuer(issuer)
      .setAudience(audience)
      .setExpirationTime("10m")
      .sign(privateKey);
  }


  async verifyAccessToken(token: string, issuer: string, audience: string) {
    const jwks = await this.getJWKS();

    const jwkStore = new Map<string, any>();
    for(const { kid, jwk } of jwks) {
      jwkStore.set(kid, jwk)
    }

    const { payload } = await jwtVerify(token,
      async (header) => {
         const jwk = jwkStore.get(header.kid!);
         if(!jwk) 
           throw new Error("Unknown Key ID");
         return await importJWK(jwk, "RS256");
      },
      {
        issuer: issuer,
        audience: audience,
      }
    );

    return payload as unknown as JwtPayload;
  }


  async signRefreshToken(userId: string): Promise<string> {
    const token = randomBytes(64).toString("hex");
    await this.redisClient.set(
      `refresh_tokens:${token}`,
      userId,
      "EX",
      "3d"
    );
    return token;
  }

  async verifyRefreshToken(token: string): Promise<string | null> {
    return await this.redisClient.get(`refresh_tokens:${token}`);
  }

  async revokeRefreshToken(token: string): Promise<void> {
    await this.redisClient.del(`refresh_tokens:${token}`);
  }

  private startKeyRotation() {
    const ROTATION_INTERVAL = 5 * 60 * 1000; // 5 minutes
  
    setInterval(async () => {
      try {
        await this.rotateKeys();
        console.log("JWT keys rotated");
      } catch (err) {
        console.error("Key rotation failed", err);
      }
    }, ROTATION_INTERVAL);
  }
}