// link controller - Redirect Controller
import { Controller, Req } from "@nestjs/common";
import { LinkService } from "./link.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { 
  CreateLinkDtoWithUserId, 
  GetLinkByIdDto, 
  GetLinkBySlugDto, 
  ResolveLinkDto,
  UpdateLinkDto, 
} from "./dto/link.dto";

@Controller()
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @MessagePattern("link_resolve")
  async resolveLink(@Payload() payload: ResolveLinkDto) {
    const { slug, reqMeta } = payload;
    const url = await this.linkService.resolve(slug, reqMeta);
    return url;
  }

  @MessagePattern("link_create")
  async createLink(@Payload() payload: CreateLinkDtoWithUserId) {
    const { dto, userId } = payload;
    console.log("The payload is", payload)
    const response = await this.linkService.createLink(userId, dto);
    return response;
  }

  @MessagePattern("link_get_by_id")
  async getLinkById(@Payload() payload: GetLinkByIdDto) {
    const { linkId } = payload;
    const response = await this.linkService.getLinkById(linkId);
    return response;
  } 

  @MessagePattern("link_get_by_slug") 
  async getLinkBySlug(@Payload() payload: GetLinkBySlugDto) {
    const { slug } = payload;
    const response = await this.linkService.getLinkBySlug(slug);
    return response;
  }

  @MessagePattern("link_update")
  async updateLink(@Payload() payload: UpdateLinkDto) {
    const response = await this.linkService.updateLink(payload);
    return response;
  }

  @MessagePattern("get_links")
  async searchLinks(@Payload() payload) {
    const response = await this.linkService.getLinks({ ...payload });
    return response;
  }
}
