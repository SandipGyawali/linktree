import { Inject, Injectable } from "@nestjs/common";
import { IORedisKey } from "constants/redis.constants";
import Redis from "ioredis";

@Injectable()
export class RedisService {
  constructor(
    @Inject(IORedisKey) private readonly redisClient: Redis
  ) {}
     
  async getKeys(pattern: string): Promise<string[]> {
    return await this.redisClient.keys(pattern);
  }

  async insert(key: string, value: string | number) : Promise<void> {
    await this.redisClient.set(key, value);
  }

  async get(key: string): Promise<any> {
    return this.redisClient.get(key);
  }

  async delete(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  async validate(key: string, value: string): Promise<boolean> {
    const storedValue = await this.redisClient.get(key);
    return storedValue === value;
  }
}