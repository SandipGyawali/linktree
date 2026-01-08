import { Global, Module, OnApplicationShutdown } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ModuleRef } from "@nestjs/core";
import { IORedisKey } from "constants/redis.constants";
import { Redis } from "ioredis";
import { RedisService } from "./redis.service";
import { ENV } from "config/env";

@Global()
@Module({
  imports: [ConfigService],
  providers: [
    {
      provide: IORedisKey,
      useFactory: async () => {
        return new Redis({
          port: ENV.REDIS_PORT,
          host: ENV.REDIS_HOST,
          enableAutoPipelining: true,
        })
      },
    },
    RedisService
  ],
})
export class RedisModule implements OnApplicationShutdown {
  constructor(private readonly moduleRef: ModuleRef) {}

  async onApplicationShutdown(signal?: string) {
    return new Promise<void>((resolve) => {
      const redis = this.moduleRef.get(IORedisKey);
      redis.quit();
      redis.on("end", () => {
        resolve();
      })
    })
  }
}