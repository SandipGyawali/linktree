import { Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { IORedisKey } from "src/constants/redis.constants";

@Injectable()
export class LinkCacheService {
  constructor(@Inject(IORedisKey) private readonly redisClient: Redis) {}

  async getBySlug(slug: string): Promise<string | null> {
    return this.redisClient.get(`link:slug:${slug}`);
  }

  async setSlug(slug: string, url: string) {
    await this.redisClient.set(`link:slug:${slug}`, url, "EX", 60 * 60);
  }

  async deleteSlug(slug: string) {
    await this.redisClient.del(`link:slug:${slug}`)
  }

  async incrementClick(linkId: string) {
    await this.redisClient.incr(`link:clicks:${linkId}`);
  }

  async incrementDaily(linkId: string) {
    const date = new Date().toISOString().slice(0, 10);
    await this.redisClient.incr(`link:stats:${linkId}:${date}`);
  }
}
