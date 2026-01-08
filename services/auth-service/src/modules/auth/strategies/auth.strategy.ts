import { Inject, Injectable } from "@nestjs/common";
import { adminSchema } from "src/drizzle/schema";
import { userSchema } from "src/drizzle/schema/user_schema";
import type { UserType } from "../../../drizzle/helpers/types";
import { and, eq } from "drizzle-orm";
import { DRIZZLE } from "../../database/database.module";
import type { Database } from "src/drizzle/type";
import bcrypt from "bcryptjs";
import { JwtStrategy } from "./jwt.strategy";

@Injectable()
export class AuthStrategy<T extends UserType> {
  private type: UserType
  static SCHEMA_MAP = {
    ADMIN: adminSchema,
    USER: userSchema
  } satisfies Record<UserType, typeof adminSchema | typeof userSchema>;

  constructor(
    @Inject(DRIZZLE) private readonly db: Database,
    @Inject() private readonly jwtStrategy: JwtStrategy,
    type: T,
  ) {
    this.type = type;
  }

  async login(
    email: string,
    password: string,
    issuer: string,
    audience: string,
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
      return { error: "user_not_found" } as const;

    if(!(await bcrypt.compare(password, _user.hash))) 
      return { error: "invalid_password" } as const;

    const accessToken = await this.jwtStrategy.signAccessToken({
        email: _user.email,
        createdAt: _user.createdAt,
        isActive: _user.isActive,
        lastLoginAt: _user.lastLoginAt,
        updatedAt: _user.updatedAt,
        sub: _user.userId
      },
      issuer,
      audience
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

  async signup() {}


  logout() {}
}