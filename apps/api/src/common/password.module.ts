import { Global, Module } from "@nestjs/common";
import { PasswordService } from "./password/password.service";

@Global()
@Module({
  providers: [PasswordService]
})
export class PasswordModule {}