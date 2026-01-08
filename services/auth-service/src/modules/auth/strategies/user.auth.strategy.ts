import { Injectable } from "@nestjs/common";
import { AuthStrategy } from "./auth.strategy";
import type { Database } from "src/drizzle/type";
import { JwtStrategy } from "./jwt.strategy";

@Injectable()
export class UserAuthStrategy extends AuthStrategy<"USER"> {
  constructor(
    db: Database,
    jwtStrategy: JwtStrategy
  ) { 
    super(db, jwtStrategy, "USER"); 
  }
}