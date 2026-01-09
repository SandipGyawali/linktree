import { Inject, Injectable } from "@nestjs/common";
import { AuthStrategy } from "./auth.strategy";
import type { Database } from "src/drizzle/type";
import { JwtStrategy } from "./jwt.strategy";
import { ClientProxy } from "@nestjs/microservices";
import Redis from "ioredis";
import { IORedisKey } from "src/constants/redis.constants";

@Injectable()
export class UserAuthStrategy extends AuthStrategy<"USER"> {
   constructor(
    db: Database,
    @Inject("MAIL_SERVICE") mailClient: ClientProxy, 
    @Inject(IORedisKey) redisClient: Redis,
    jwtStrategy: JwtStrategy,
  ) { 
    super(db, mailClient, redisClient ,jwtStrategy, "USER"); 
  }
}