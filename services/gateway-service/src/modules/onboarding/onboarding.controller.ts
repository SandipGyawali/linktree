import { Body, Controller, GatewayTimeoutException, Get, Inject, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { catchError, firstValueFrom, timeout, TimeoutError } from "rxjs";
import { AuthGuard } from "../auth/guards/auth.guard";

@ApiTags("Onboarding")
@Controller("onboarding")
@Controller()
export class OnboardingController {
  private userClient;
  constructor() {}

  private async send(pattern: string, payload: any) {
    return firstValueFrom(
      this.userClient.send(pattern, payload).pipe(
        timeout(5000),
        catchError((err) => {
          if(err instanceof TimeoutError) {
            throw new GatewayTimeoutException("User Service unavailable!")
          }
          throw err;
        })
      )
    )
  }

  @Get("status")
  @ApiOperation({ summary: "Get onboarding status." })
  @UseGuards(AuthGuard)
  getStatus() {
    return this.send("user_onboarding_status", {});
  } 

  @Post("profile")
  @ApiOperation({ summary: "Create or update profile" })
  createProfile(@Body() body) {
    return this.send("user_onboarding_profile", body);
  }

  @Post("links")
  @ApiOperation({ summary: "Add initial links" })
  //   @ApiBody({ type: CreateLinkDto, isArray: true })
  addLinks(@Body() body) {
    return this.send("user_add_links", body);
  }

  @Post("theme")
  @ApiOperation({ summary: "Select Theme" })
  selectTheme(@Body() body) {
    return this.send("user_select_theme", body)
  }

  @Post("complete")
  @ApiOperation({ summary: "Complete Onboarding" })
  complete() {
    return this.send("user_onboarding_complete", {})
  }
}

