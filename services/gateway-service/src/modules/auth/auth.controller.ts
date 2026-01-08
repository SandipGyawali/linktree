import { Body, Controller, Inject, Post } from "@nestjs/common";
import { LoginDto } from "./dto/login_dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(
    @Inject("AUTH_SERVICE") private readonly authClient: ClientProxy
  ) {}

  @Post("login")
  @ApiOperation({ summary: "User Login API" })
  @ApiResponse({ status: 201, description: "User Login Successful" })
  @ApiResponse({ status: 400, description: "Invalid Login Request Body" })
  @ApiBody({ type: LoginDto })
  async login(@Body() body: LoginDto) {
    const response = await firstValueFrom(this.authClient.send("user_login", body));

    console.log(response)
    return response;
  }
}