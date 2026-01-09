import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

export class OnboardingGuard implements CanActivate {
  constructor(
    @Inject("USER_SERVICE") private readonly userClient: ClientProxy
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const status = await firstValueFrom(
      this.userClient.send("user_onboarding_status", {})
    );

    if (!status.completed) {
      throw new ForbiddenException("Complete onboarding first");
    }

    return true;
  }
}
