import { Controller } from "@nestjs/common";
import { LoginDto } from "./dto/login_dto";
import { AuthService } from "./auth.service";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}
  
  @MessagePattern("user_login")
  async login(@Payload() dto: LoginDto) {
    const response = this.authService.login(dto);
    return response;
  }

  @MessagePattern({ cmd: "loginAdmin" }) 
  async loginAdmin(@Payload() dto: LoginDto) {
    console.log(dto)
    return this.authService.loginAdmin();
  }
}