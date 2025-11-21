import { Body, Controller, HttpStatus, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import type { Request } from "express";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "User Login" })
  @ApiResponse({ status: HttpStatus.OK, description: "Successful Login" })
  @Post("login")
  async login(@Body() loginDto: LoginDto, @Req() req: Request) {
    return this.authService.login();
  } 
}