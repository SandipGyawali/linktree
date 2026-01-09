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
    console.log(dto);
    const response = this.authService.login(dto);     
    return response;
  }

  @MessagePattern("user_signup") 
  async loginAdmin(@Payload() dto: SignupDto) {
    const response = this.authService.signup(dto);
    return response;
  }
}