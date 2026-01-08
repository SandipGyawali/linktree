import { Global, Module, OnApplicationShutdown } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ModuleRef } from "@nestjs/core";
import { IORedisKey } from "src/constants/redis.constants";
import { Redis } from "ioredis";

@Global()
@Module({
  providers: [
    {
      provide: IORedisKey,
      useFactory: async (configService: ConfigService) => {
        return new Redis({
          port: configService.get<number>("REDIS_PORT"),  
          host: configService.get<string>("REDIS_HOST"),
          enableAutoPipelining: true,
        })
      },
      inject: [ConfigService]
    },
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