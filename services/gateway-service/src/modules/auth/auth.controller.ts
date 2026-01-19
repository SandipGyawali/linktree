import { Body, Controller, GatewayTimeoutException, Get, Inject, Post, Req, Res, UseGuards } from "@nestjs/common";
import { LoginDto } from "./dto/login_dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ClientProxy } from "@nestjs/microservices";
import { catchError, firstValueFrom, timeout, TimeoutError } from "rxjs";
import { SignupDto } from "./dto/signup_dto";
import { AuthGuard } from "./guards/auth.guard";
import type { Response } from "express";

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
  async login(@Res({ passthrough: true }) res: Response, @Body() body: LoginDto) {
    const response = await firstValueFrom(this.authClient.send("user_login", body).pipe(
      timeout(3000),
      catchError(err => {
        if(err instanceof TimeoutError) {
          throw new GatewayTimeoutException("Authentication Service is Unavailable!")
        }
        throw err;
      })
    ));

    res.cookie("access_token", response.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000
    });
    res.cookie("refresh_token", response.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

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


  @Get("me")
  @ApiOperation({ summary: "Get Profile" })
  @ApiResponse({ status: 201, description: "User Profile" })
  @UseGuards(AuthGuard)
  async getProfile(@Req() req) {   
    const response = await firstValueFrom(this.authClient.send("me", { userId: req.user.sub }))
    return response;
  }
}