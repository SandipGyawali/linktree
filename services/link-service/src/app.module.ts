import { Module } from '@nestjs/common';
import { RedisModule } from './modules/redis/redis.module';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { LinkModule } from './modules/link/link.module';
import { ElasticSearchModule } from './modules/elasticsearch/elasticsearch.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),
    RedisModule,
    DatabaseModule,
    LinkModule,
    ElasticSearchModule
  ],
})
export class AppModule {}
