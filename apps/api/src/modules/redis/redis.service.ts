import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, RedisClientType } from "redis"

@Injectable()
export class RedisService implements OnModuleInit {
  private client: RedisClientType;

  constructor(private configService: ConfigService)  {
    const redis_url = this.configService.get<string>("REDIS_URL");
    this.client = createClient({
      url: redis_url,
    });
    this.client.on("connect", () => {
      console.log("Redis is connecting...");
    });
    this.client.on("connect", () => {
      console.log("Redis Connected>>>>>>>>...!");
    });

    this.client.on("error", (err) => {
      console.error(err);
    })
  }

  async onModuleInit() {
    await this.client.connect();
  }

  getClient(): RedisClientType {
    return this.client;
  }
}