import { Module } from "@nestjs/common";
import { EmailService } from "./mail.service";
import { EMailController } from "./mail.controller";

@Module({
  providers: [EmailService],
  controllers: [EMailController],
  exports: [EmailService]
})
export class EmailModule {}