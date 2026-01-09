import { Injectable } from "@nestjs/common";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { AdminAuthStrategy } from "./strategies/admin.auth.strategy";
import { UserAuthStrategy } from "./strategies/user.auth.strategy";
import { LoginDto } from "./dto/login_dto";
import { SignupDto } from "./dto/signup_dto";

@Injectable()
export class AuthService {
  constructor(
    readonly jwtStrategy: JwtStrategy,
    private readonly adminAuthStrategy: AdminAuthStrategy,
    private readonly userAuthStrategy: UserAuthStrategy
  ) {}

  async login(input: LoginDto) {
    const response = await this.userAuthStrategy.login(
      input.email,
      input.password
    );
    return response;
  }

  async signup(input: SignupDto) {
    const response = await this.userAuthStrategy.signup(
      input.name,
      input.email,
      input.password
    );
    return response;
  }

  async loginAdmin() {}
  async signupAdmin() {}
}