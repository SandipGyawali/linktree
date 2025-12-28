import { Module } from "@nestjs/common";
import { UserService } from "./user.service";

@Module({
  providers: [UserService],
  controllers: [],
  exports: [UserService],
  imports: []
})
export class UserModule {}