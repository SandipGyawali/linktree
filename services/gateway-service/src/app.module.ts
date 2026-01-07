import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { EmailModule } from './modules/mail/email.module';

@Module({
  imports: [
    // environment variable root configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),
    EmailModule
  ],
})
export class AppModule {}
