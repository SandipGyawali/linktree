import { Inject, Injectable } from "@nestjs/common";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { AdminAuthStrategy } from "./strategies/admin.auth.strategy";
import { UserAuthStrategy } from "./strategies/user.auth.strategy";
import { LoginDto } from "./dto/login_dto";

@Injectable()
export class AuthService {
  constructor(
    @Inject() private readonly jwtStrategy: JwtStrategy,
    @Inject() private readonly adminAuthStrategy: AdminAuthStrategy,
    @Inject() private readonly userAuthStrategy: UserAuthStrategy
  ) {}

  async login(input: LoginDto) {
    const response = await this.userAuthStrategy.login(
      input.email,
      input.password
    );

    console.log(response)
    return response;
  }
  async loginAdmin() {}

  async signup() {}
  async signupAdmin() {}
}