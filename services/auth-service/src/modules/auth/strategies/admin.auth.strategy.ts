import { Inject, Injectable } from "@nestjs/common";
import { AuthStrategy } from "./auth.strategy";
import type { Database } from "src/drizzle/type";
import { JwtStrategy } from "./jwt.strategy";
import { ClientProxy } from "@nestjs/microservices";
import { IORedisKey } from "src/constants/redis.constants";
import Redis from "ioredis";

@Injectable()
export class AdminAuthStrategy extends AuthStrategy<"ADMIN"> {
  constructor(
    db: Database,
    @Inject("MAIL_SERVICE") mailClient: ClientProxy, 
    @Inject(IORedisKey) redisClient: Redis,
    jwtStrategy: JwtStrategy,
  ) { 
    super(db, mailClient, redisClient ,jwtStrategy, "ADMIN"); 
  }
}