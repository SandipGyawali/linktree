import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    const accessToken= request.cookies?.access_token;
    console.log(accessToken)

    if (!accessToken) {
      throw new UnauthorizedException('Access token missing!');
    }

    try {
      const accessResponse: { success: boolean; payload?: any } = 
        await firstValueFrom(
          this.authClient.send(
            'validate_access_token', 
            { accessToken }
          )
        );

      if(accessResponse?.success) {
        request.user = accessResponse.payload;
        return true;
      }

      // const refreshResponse: { success: boolean; payload?: any; newAccessToken?: string } =
      //   await firstValueFrom(
      //     this.authClient.send("validate_refresh_token", {  accessToken, refreshToken })
      //   );

      // if(refreshResponse?.success) {
      //   request.user = refreshResponse.payload;
      
      //   if(refreshResponse.newAccessToken) {
      //     request.headers["x-new-access-token"] = refreshResponse.newAccessToken;
      //   }
      
      //   return true;
      // }
    
      throw new UnauthorizedException("Invalid Access or Refresh Token");
    } catch (err) {
      // You can log err here for debugging if needed
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
