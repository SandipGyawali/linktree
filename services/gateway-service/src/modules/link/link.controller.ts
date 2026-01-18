import { 
  Body, 
  Controller, 
  GatewayTimeoutException, 
  Get, 
  Inject, 
  Param, 
  Post, 
  Put, 
  Query, 
  Req, 
  UseGuards 
} from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateLinkDto, GetLinkByIdDto, GetLinkBySlugDto, GetLinkDto, UpdateLinkDto } from "./dto/link.dto";
import { catchError, firstValueFrom, timeout, TimeoutError } from "rxjs";
import { AuthGuard } from "../auth/guards/auth.guard";

@ApiTags("Links")
@Controller()
export class LinkController {
  constructor(
    @Inject("LINK_SERVICE") private readonly linkClient: ClientProxy
  ) {}


  @Get("link")
  @ApiOperation({ summary: "Fetch User Specific Links" })
  @ApiResponse({ status: 201, description: "Links Fetched Successfully" })
  @ApiResponse({ status: 400, description: "Invalid Link Input" })
  @ApiBody({ type: GetLinkDto })
  @UseGuards(AuthGuard)
  async getLinks(@Req() req, @Query() dto: GetLinkDto) {
    console.log(req.user)
    try {
      const response = await this.linkClient.send("get_links", { 
        userId: req.user.sub,
        ...dto
      })
      return response;
    }catch(err) {
      console.error("The error is:", err);
    }
  }

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

  @Put("link/update")
  @ApiOperation({ summary: "Update Existing Link API" })
  @ApiResponse({ status: 201, description: "Link Updated Successfully" })
  @ApiResponse({ status: 400, description: "Invalid Link Input" })
  @UseGuards(AuthGuard)
  @ApiBody({ type: UpdateLinkDto })
  async updateLink(@Body() body: UpdateLinkDto) {
    try{
      const response = await firstValueFrom(
        this.linkClient.send("link_update", {
          ...body
        })
      );
      return response;
    }catch(err){
      console.error("The error is", err)
    }
  }


  @Get("link/:linkId")
  @ApiOperation({ summary: "Get Link By LinkId" })
  @ApiResponse({ status: 201, description: "Link Data Fetched Successfully" })
  @ApiResponse({ status: 400, description: "Invalid LinkId" })
  @UseGuards(AuthGuard)
  @ApiBody({ type:  GetLinkByIdDto })
  async getLinkById(@Param() params: GetLinkByIdDto) {
    console.log(params)
    try {
      const response = await firstValueFrom(
        this.linkClient.send("link_get_by_id", {
          ...params
        })
      )
      return response;
    }catch(err) {
      console.error("The Error is", err);
    }
  }

  @Get("link/slug/:slug")
  @ApiOperation({ summary: "Get Link By LinkId" })
  @ApiResponse({ status: 201, description: "Link Data Fetched Successfully" })
  @ApiResponse({ status: 400, description: "Invalid LinkId" })
  @UseGuards(AuthGuard)
  @ApiBody({ type:  GetLinkBySlugDto })
  async getLinkBySlug(@Param() params: GetLinkBySlugDto) {
    console.log(params)
    try {
      const response = await firstValueFrom(
        this.linkClient.send("link_get_by_slug", {
          ...params
        })
      )
      return response;
    }catch(err) {
      console.error("The Error is", err);
    }
  }
}