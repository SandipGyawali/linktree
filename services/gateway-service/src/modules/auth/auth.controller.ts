import { Body, Controller, GatewayTimeoutException, Get, Inject, Post, UseGuards } from "@nestjs/common";
import { LoginDto } from "./dto/login_dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ClientProxy } from "@nestjs/microservices";
import { catchError, firstValueFrom, timeout, TimeoutError } from "rxjs";
import { SignupDto } from "./dto/signup_dto";
import { AuthGuard } from "./guards/auth.guard";

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
    const response = await firstValueFrom(this.authClient.send("user_login", body).pipe(
      timeout(3000),
      catchError(err => {
        if(err instanceof TimeoutError) {
          throw new GatewayTimeoutException("Authentication Service is Unavailable!")
        }
        throw err;
      })
    ));

    console.log(response)
    return response;
  }


  @Post("signup")
  @ApiOperation({ summary: "User Signup API" })
  @ApiResponse({ status: 201, description: "User successfully created" })
  @ApiResponse({ status: 400, description: "Invalid signup request" })
  @ApiResponse({ status: 409, description: "User already exists" })
  @ApiBody({ type: SignupDto, description: "Signup request payload" })
  async signup(@Body() body: SignupDto) {
    const response = await firstValueFrom(this.authClient.send("user_signup", body));
    console.log(response);
    return response;
  }


  @Get("profile")
  @ApiOperation({ summary: "Get Profile" })
  @ApiResponse({ status: 201, description: "User Profile" })
  @UseGuards(AuthGuard)
  getProfile() {
    return { message: 'This is profile data!' };
  }
}