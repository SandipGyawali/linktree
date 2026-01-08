import { Inject, Injectable } from "@nestjs/common";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { AdminAuthStrategy } from "./strategies/admin.auth.strategy";
import { UserAuthStrategy } from "./strategies/user.auth.strategy";

@Injectable()
export class AuthService {
  constructor(
    @Inject() private readonly jwtStrategy: JwtStrategy,
    @Inject() private readonly adminAuthStrategy: AdminAuthStrategy,
    @Inject() private readonly userAuthStrategy: UserAuthStrategy
  ) {}

  async login() {}
  async loginAdmin() {}

  async signup() {}
  async signupAdmin() {}
}