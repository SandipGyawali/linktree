import { 
  Body, 
  Controller, 
  Get, 
  Inject, 
  Param, 
  Post, 
  Put, 
  Query, 
  Req, 
  UseGuards 
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { 
  CreateLinkDto, 
  GetLinkByIdDto, 
  GetLinkBySlugDto, 
  GetLinkDto, 
  UpdateLinkDto 
} from "./dto/link.dto";
import { AuthGuard } from "../auth/guards/auth.guard";
import { RpcHelperService } from "../rpc/rpc.service";

@ApiTags("Links")
@Controller()
export class LinkController {
  constructor(
    @Inject("LINK_SERVICE") private readonly linkClient: ClientProxy,
    private readonly rpcService: RpcHelperService
  ) {}


  @Get("link")
  @ApiOperation({ summary: "Fetch User Specific Links" })
  @ApiResponse({ status: 201, description: "Links Fetched Successfully" })
  @ApiResponse({ status: 400, description: "Invalid Link Input" })
  @ApiBody({ type: GetLinkDto })
  @UseGuards(AuthGuard)
  async getLinks(@Req() req, @Query() dto: GetLinkDto) {
    const response = this.rpcService.handleRpc(() => 
      this.rpcService.sendWithTimeout(
        this.linkClient,
        "get_links",
        { userId: req.user.sub, ...dto },
        5000
      )
    );
    return response;
  }

  @Post("link/create")
  @ApiOperation({ summary: "Create a New Link API" })
  @ApiResponse({ status: 201, description: "New Link Registered Successfully" })
  @ApiResponse({ status: 400, description: "Invalid Link Input" })
  @ApiBody({ type: CreateLinkDto })
  @UseGuards(AuthGuard)
  async createLink(@Req() req, @Body() body: CreateLinkDto) { 
    const response = 
      await this.rpcService.handleRpc(
        () => 
        this.rpcService.sendWithTimeout(
          this.linkClient,
          "link_create",
          { userId: req.user.sub, dto: body },
          5000
        )
      );

    return response;
  }

  @Put("link/update")
  @ApiOperation({ summary: "Update Existing Link API" })
  @ApiResponse({ status: 201, description: "Link Updated Successfully" })
  @ApiResponse({ status: 400, description: "Invalid Link Input" })
  @UseGuards(AuthGuard)
  @ApiBody({ type: UpdateLinkDto })
  async updateLink(@Body() body: UpdateLinkDto) {
    const response = await this.rpcService.handleRpc(
      () => 
      this.rpcService.sendWithTimeout(
        this.linkClient,
        "link_update",
        { ...body },
        5000
      )
    );
    return response;
  }


  @Get("link/:linkId")
  @ApiOperation({ summary: "Get Link By LinkId" })
  @ApiResponse({ status: 201, description: "Link Data Fetched Successfully" })
  @ApiResponse({ status: 400, description: "Invalid LinkId" })
  @UseGuards(AuthGuard)
  @ApiBody({ type:  GetLinkByIdDto })
  async getLinkById(@Param() params: GetLinkByIdDto) {
    const response = await this.rpcService.handleRpc(
      () => 
      this.rpcService.sendWithTimeout(
        this.linkClient,
        "link_get_by_id",
        { ...params },
        5000
      )
    );
    return response;
  }

  @Get("link/slug/:slug")
  @ApiOperation({ summary: "Get Link By LinkId" })
  @ApiResponse({ status: 201, description: "Link Data Fetched Successfully" })
  @ApiResponse({ status: 400, description: "Invalid LinkId" })
  @UseGuards(AuthGuard)
  @ApiBody({ type:  GetLinkBySlugDto })
  async getLinkBySlug(@Param() params: GetLinkBySlugDto) {
    console.log(params)
    const response = await this.rpcService.handleRpc(
      () => 
      this.rpcService.sendWithTimeout(
        this.linkClient,
        "link_get_by_slug",
        { ...params },
        5000
      )
    );
    return response;
  }
}