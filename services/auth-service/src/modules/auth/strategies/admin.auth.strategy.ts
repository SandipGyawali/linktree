import { Injectable } from "@nestjs/common";
import { AuthStrategy } from "./auth.strategy";
import type { Database } from "src/drizzle/type";
import { JwtStrategy } from "./jwt.strategy";

@Injectable()
export class AdminAuthStrategy extends AuthStrategy<"ADMIN"> {
  constructor(
    db: Database,
    jwtStrategy: JwtStrategy
  ) { 
    super(db, jwtStrategy, "ADMIN"); 
  }
}