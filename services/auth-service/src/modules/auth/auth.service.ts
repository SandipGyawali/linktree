import { Injectable } from "@nestjs/common";
import { JwtPayload, JwtStrategy } from "./strategies/jwt.strategy";
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

  async validateAccessToken(input): Promise<{
    success: boolean;
    payload: JwtPayload | null
  }> {
    try {
      const payload = await this.jwtStrategy.verifyAccessToken(input);
      if(!payload) throw new Error("Validation Error");
      
      return {
        success: true,
        payload,
      }
    }catch(err) {
      return {
        success: false,
        payload: null
      }
    }    
  }

  async validateRefreshToken({ refreshToken }) {
    try {
      const payload = await this.jwtStrategy.verifyRefreshToken(refreshToken);
      if (!payload) throw new Error('Invalid');

      return { success: true };
    } catch (err) {
      return { success: false };
    }
  }



  async me({ userId }: { userId: string }){
    try {
      const payload = await this.userAuthStrategy.me(userId); 
      return payload;
    }catch(err) {
      throw new Error("Error while finding user information")
    }
  }
}