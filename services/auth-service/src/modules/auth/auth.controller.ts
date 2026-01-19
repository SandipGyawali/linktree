import { Controller } from "@nestjs/common";
import { LoginDto } from "./dto/login_dto";
import { AuthService } from "./auth.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { SignupDto } from "./dto/signup_dto";

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}
  
  @MessagePattern("user_login")
  async login(@Payload() dto: LoginDto) {
    const response = await this.authService.login(dto);     
    return response;
  }

  @MessagePattern("user_signup") 
  async loginAdmin(@Payload() dto: SignupDto) {
    const response = this.authService.signup(dto);
    return response;
  }

  @MessagePattern("validate_access_token")
  async validateAccessToken(@Payload() data) {
    const { accessToken } = data;

    const response = await this.authService.validateAccessToken(accessToken);
    return response;
  }

  @MessagePattern("validate_refresh_token")
  async validateRefreshToken(@Payload() data) {
    const { refreshToken, accessToken } = data;
    const response = await this.authService.validateRefreshToken({ refreshToken });
    
    return response;
  }


  @MessagePattern("me")
  async me(@Payload() dto) {
    const response = await this.authService.me({ userId: dto.userId })
    return response;
  }
}