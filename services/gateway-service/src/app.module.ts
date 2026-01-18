import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { EmailModule } from './modules/mail/email.module';
import { AuthModule } from './modules/auth/auth.module';
import { LinkModule } from './modules/link/link.module';
import { RpcHelperModule } from './modules/rpc/rpc.module';

@Module({
  imports: [
    // environment variable root configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }), 
    EmailModule,
    AuthModule,
    LinkModule,
    RpcHelperModule
  ],
})
export class AppModule {}
