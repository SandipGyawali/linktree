import { Module } from '@nestjs/common';
import { EmailModule } from './modules/mail/mail.module';

@Module({
  imports: [EmailModule],
})
export class AppModule {}
