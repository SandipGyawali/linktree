import { Inject, Injectable } from "@nestjs/common";
import { adminSchema } from "src/drizzle/schema";
import { userSchema } from "src/drizzle/schema/users_schema";
import type { UserType } from "../../drizzle/helpers/types";
import { and, eq } from "drizzle-orm";
import { DRIZZLE } from "../database/database.module";
import type { Database } from "src/drizzle/type";
import bcrypt from "bcryptjs";

@Injectable()
export class AuthManager<T extends UserType> {
  private type: UserType
  static SCHEMA_MAP = {
    ADMIN: adminSchema,
    USER: userSchema
  } satisfies Record<UserType, typeof adminSchema | typeof userSchema>;

  constructor(type: T, @Inject(DRIZZLE) private readonly db: Database) {
    this.type = type;
  }

  generateSessionId(length: 128) {
    const bytesNeeded = Math.ceil((length * 32) / 4);

    const bytes = crypto.getRandomValues(new Uint8Array(bytesNeeded));
    const base64 = Buffer.from(bytes).toString("base64");

    return base64.replace(/=+$/, "");
  }

  async login(
    email: string,
    password: string
  ) {
    // retrieves the 
    const schema = AuthManager.SCHEMA_MAP[this.type];
  
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
  }

  async signup() {}

  async getUserSession() {}

  logout() {}
  async forgotPassword() {}
  async resetPassword() {}
}