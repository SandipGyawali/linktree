import { Body, Controller, GatewayTimeoutException, Inject, Post, Req, UseGuards } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateLinkDto, CreateLinkDtoWithUserId } from "./dto/link.dto";
import { catchError, firstValueFrom, timeout, TimeoutError } from "rxjs";
import { AuthGuard } from "../auth/guards/auth.guard";

@ApiTags("Links")
@Controller()
export class LinkController {
  constructor(
    @Inject("LINK_SERVICE") private readonly linkClient: ClientProxy
  ) {}

  @Post("link/create")
  @ApiOperation({ summary: "Create a New Link API" })
  @ApiResponse({ status: 201, description: "New Link Registered Successfully" })
  @ApiResponse({ status: 400, description: "Invalid Link Input" })
  @ApiBody({ type: CreateLinkDto })
  @UseGuards(AuthGuard)
  async createLink(@Req() req, @Body() body: CreateLinkDto) { 
    try {
      const response = await firstValueFrom(
        this.linkClient.send("link_create", { 
          userId: req.user.sub, 
          dto: body
        }).pipe(
          timeout(5000),
          catchError(err => {
            if (err instanceof TimeoutError) {
              throw new GatewayTimeoutException("Link Service is unavailable!");
            }
            throw new RpcException(err);
          })
        )
      );
  
      return response;
    }catch(err) {
      console.error("The error is: ", err)
    }  
  }
}