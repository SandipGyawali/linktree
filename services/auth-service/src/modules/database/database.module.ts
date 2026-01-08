import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { drizzle } from "drizzle-orm/postgres-js"
import * as schema from "../../drizzle/schema"; 
import { DRIZZLE } from "../../constants/drizzle.constants";
import postgres from "postgres";

@Module({
  providers: [
    {
      provide: DRIZZLE,
      useFactory: async (configService: ConfigService) => {
        const databaseUrl =  configService.get<string>("DATABASE_URL") as string;
        const pool = postgres(databaseUrl, {})
        return drizzle(pool, { schema });
      },
      inject: [ConfigService]
    }
  ],
  exports: [DRIZZLE]
})
export class DatabaseModule {}