import { Module } from "@nestjs/common";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserAuthStrategy } from "./strategies/user.auth.strategy";
import { AdminAuthStrategy } from "./strategies/admin.auth.strategy";

@Module({
  providers: [
    JwtStrategy,   
    UserAuthStrategy,
    AdminAuthStrategy,
    AuthService
  ],
  controllers: [AuthController],
  exports: [JwtStrategy, UserAuthStrategy, AdminAuthStrategy]
})
export class AuthModule {}