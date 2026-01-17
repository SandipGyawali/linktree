import { Module } from "@nestjs/common";
import { LinkCacheService } from "./link.cache.service";
import { LinkService } from "./link.service";
import { DatabaseModule } from "../database/database.module";
import { RedisModule } from "../redis/redis.module";
import { LinkController } from "./link.controller";
import { LinkSearchModule } from "./search/link-search.module";

@Module({
  imports: [DatabaseModule, RedisModule, LinkSearchModule],
  providers: [LinkCacheService, LinkService],
  controllers: [LinkController]
})
export class LinkModule {}