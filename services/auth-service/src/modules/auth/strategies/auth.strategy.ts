import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { adminSchema } from "src/drizzle/schema";
import { userSchema } from "src/drizzle/schema/user.schema";
import type { UserType } from "../../../drizzle/helpers/types";
import { and, eq, getTableColumns } from "drizzle-orm";
import { DRIZZLE } from "src/constants/drizzle.constants";
import type { Database } from "src/drizzle/type";
import bcrypt from "bcryptjs";
import { JwtStrategy } from "./jwt.strategy";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { IORedisKey } from "src/constants/redis.constants";
import Redis from "ioredis";
import { randomUUID } from "node:crypto";

@Injectable()
export class AuthStrategy<T extends UserType> {
  private type: UserType
  static SCHEMA_MAP = {
    ADMIN: adminSchema,
    USER: userSchema
  } satisfies Record<UserType, typeof adminSchema | typeof userSchema>;

  constructor(
    @Inject(DRIZZLE) private readonly db: Database,
    @Inject("MAIL_SERVICE") private readonly mailClient: ClientProxy,
    @Inject(IORedisKey) private readonly redisClient: Redis,
    private readonly jwtStrategy: JwtStrategy,
    type: T,
  ) {
    this.type = type;
  }
  
  async login(
    email: string,
    password: string,
    // issuer: string = "http://localhost:3001",
    // audience: string = "http://localhost:3001",
  ) {
    // retrieves the 
    const schema = AuthStrategy.SCHEMA_MAP[this.type];
  
    const filters = [
      eq(schema.email, email),
    ]

    const [_user] = await this.db
      .select()
      .from(schema)
      .where(and(...filters))
      .limit(1);

    if(!_user) 
      throw new RpcException({
        message: `User with email: ${email} not found`,
        code: "USER_NOT_FOUND",
        statusCode: HttpStatus.NOT_FOUND
      });

    if(!(await bcrypt.compare(password, _user.hash))) 
      throw new RpcException({
        message: `Invalid Password Provided`,
        code: "INVALID_PASSWORD",
        statusCode: HttpStatus.BAD_REQUEST
      })

    const accessToken = await this.jwtStrategy.signAccessToken({
        email: _user.email,
        createdAt: _user.createdAt,
        isActive: _user.isActive,
        lastLoginAt: _user.lastLoginAt,
        updatedAt: _user.updatedAt,
        sub: _user.userId
      },
      // issuer,
      // audience
    );

    const refreshToken = await this.jwtStrategy.signRefreshToken(_user.userId);

    return {
      accessToken,
      refreshToken,
      user: {
        email: _user.email,
        userId: _user.userId,
        isActive: _user.isActive,
        lastLoginAt: _user.lastLoginAt,
      }
    }
  }

  async signup(name: string, email: string, password: string) {
    const schema = AuthStrategy.SCHEMA_MAP[this.type];
    
    const existingUser = await this.db.query.userSchema.findFirst({
      where: (fields) => eq(fields.email, email)  
    });

    if(existingUser) 
      throw new RpcException({
        message: `User with email: ${email} already exists`,
        code: "USER_ALREADY_EXISTS",
        statusCode: HttpStatus.CONFLICT
      });

    const hash = await bcrypt.hash(password, 13);

    const [newUser] = await this.db.insert(schema).values({
      ...{
        fullName: name,
        email,
        hash,
      }
    }).returning();

    if(!newUser) 
      throw new RpcException({
        message: `Error while creating a new User`,
        code: "INTERNAL_SERVER_ERROR",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR
      });

    const token = randomUUID();
    console.log(token);
    const otp = this.generateRandomNumber(0, 9999);

    await this.redisClient.set(
      token, 
      JSON.stringify({ otp, input: { name, email }}),
      "EX", 
      900_000
    );

    const emailPayload = {
      "to": newUser.email,
      "subject": "Account OTP Verification",
      "body": "This is a test email message sent",
      "key": "CreateUserAccountOTPTemplate",
      "props": {
        "full_name": name,
        "otp": otp
      }
    }

    this.mailClient.emit("mail.transactional", emailPayload);

    return {
      userId: newUser.userId,
      email: newUser.email,
      isActive: newUser.isActive,
      createdAt: newUser.createdAt
    };
  }

  logout() {}

  generateRandomNumber(min: number, max: number): number {
    if (min > max) {
      throw new Error("min cannot be greater than max");
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  async me(userId: string) {
    const schema = AuthStrategy.SCHEMA_MAP[this.type];

    const filters = [
      eq(schema.userId, userId)
    ];
    
    const { hash, ...safeColumns } = getTableColumns(schema);  
    const [_user] = await this.db
      .select({ safeColumns })
      .from(schema)
      .where(and(...filters))
      .limit(1);

    if(!_user) 
       throw new RpcException({
        message: `User with provided ID not found`,
        code: "USER_NOT_FOUND",
        statusCode: HttpStatus.NOT_FOUND
      });
    
    return _user;
  }
}