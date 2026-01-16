import { Module } from "@nestjs/common";
import { LinkCacheService } from "./link.cache.service";
import { LinkService } from "./link.service";
import { DatabaseModule } from "../database/database.module";
import { RedisModule } from "../redis/redis.module";
import { LinkController } from "./link.controller";

@Module({
  imports: [DatabaseModule, RedisModule],
  providers: [LinkCacheService, LinkService],
  controllers: [LinkController]
})
export class LinkModule {}