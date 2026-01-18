import { 
  ForbiddenException, 
  Inject, 
  Injectable, 
  InternalServerErrorException, 
  NotFoundException 
} from "@nestjs/common";
import Redis from "ioredis";
import { IORedisKey } from "src/constants/redis.constants";
import { LinkCacheService } from "./link.cache.service";
import { DRIZZLE } from "../../constants/drizzle.constants";
import type { Database } from "src/drizzle/type";
import { eq } from "drizzle-orm";
import { clickSchema, linkSchema } from "src/drizzle/schema";
import { parseUserAgent } from "src/utils/agent_parser";
import { OnModuleInit } from "@nestjs/common";
import { LinkSearchService } from "./search/link-search.service";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class LinkService  implements OnModuleInit {
  constructor(
    @Inject(IORedisKey) private redisClient: Redis,
    private readonly cache: LinkCacheService,
    @Inject(DRIZZLE) private readonly db: Database,
    private readonly searchService: LinkSearchService
  ) {}

  onModuleInit() {
    console.log("LinkService initialized. Redis flush cron will start.");
  }

  /**
   * Create a new short link
   * @param slug 
   * @param req 
   * @returns 
   */
  async createLink(userId: string, dto: {
    originalUrl: string;
    slug?: string;
    title?: string;
    description?: string;
    image?: string;
    isPreviewEnabled?: boolean;
    expiresAt?: Date;
  }) {
    let slug = dto.slug;

    if(!slug)
      slug = this.generateSlug(6);

    const exists = await this.db.query.linkSchema.findFirst({
      where: (f) => eq(f.slug, slug),
    });

    if(exists)
        throw new ForbiddenException("Slug already in use");

    const [link] = await this.db.insert(linkSchema).values({
      userId,
      slug,
      originalUrl: dto.originalUrl,
      title: dto.title,
      description: dto.description,
      image: dto.image,
      isPreviewEnabled: dto.isPreviewEnabled ?? true,
      expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
      clickCount: 0
    }).returning();

    if(!link)
      throw new InternalServerErrorException("Error while inserting link to database");

    await this.searchService.indexLink({ 
      ...{
        linkId: link.linkId,
        slug: link.slug,
        userId: link.userId,
        originalUrl: link.originalUrl,
        title: link.title,
      }
    });

    return link;
  }

  async getLinkById(linkId: string) {
    const link = await this.db.query.linkSchema.findFirst({
      where: (f) => eq(f.linkId, linkId)
    });

    if(!link) throw new NotFoundException("Link Not Found");
    return link;
  }

  async getLinkBySlug(slug: string) {
    const link = await this.db.query.linkSchema.findFirst({
      where: (f) => eq(f.slug, slug)
    });
    if(!link) throw new NotFoundException("Link Not Found");
    return link;
  }

  /**
   * Update the stored Link
   * @param linkId 
   * @param dto 
   * @returns 
   */
  async updateLink(dto: {
    originalUrl?: string;
    title?: string;
    description?: string;
    image?: string;
    isPreviewEnabled?: boolean;
    isActive?: boolean;
    expiresAt?: Date;
    linkId: string;
  }) {
    const link = await this.getLinkById(dto.linkId);

    const [updated] = await this.db.update(linkSchema)
      .set({
        originalUrl: dto.originalUrl ?? link.originalUrl,
        title: dto.title ?? link.title,
        description: dto.description ?? link.description,
        image: dto.image ?? link.image,
        isPreviewEnabled: dto.isPreviewEnabled ?? link.isPreviewEnabled,
        isActive: dto.isActive ?? link.isActive,
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : link.expiresAt,
      })
      .where(eq(linkSchema.linkId, dto.linkId))
      .returning();

    await this.searchService.updateLink({ ...updated });

    if(dto.originalUrl) 
      await this.cache.setSlug(link.slug, dto.originalUrl);

    return updated; 
  } 


  async deleteLink(linkId: string) {
    const link = await this.getLinkById(linkId);

    await this.cache.deleteSlug(link.slug);

    await this.db.delete(linkSchema)
      .where(eq(linkSchema.linkId, linkId));

    await this.searchService.removeLink(linkId);

    return { success: true };
  }

  async listUserLinks(userId: string, page = 1, limit = 20) {
    const offset = (page - 1) * limit;

    const links = await this.db.query.linkSchema.findMany({
      where: (f) => eq(f.userId, userId),
      orderBy: (f) => f.createdAt,
      limit,
      offset,
    });

    return links;
  }

  /**
   * Generate Random Slug.
   * @param length 
   * @returns 
   */
  private generateSlug(length = 6) {
    return Math.random().toString(36).substring(2, 2 + length);
  }

  async resolve(slug: string, req: any): Promise<string> {  
    const cached = await this.cache.getBySlug(slug);
    if(cached) return cached;


    const link = await this.db.query.linkSchema.findFirst({
      where: (fields) => eq(fields.slug, slug)
    });

    if(!link || !link.isActive) 
      throw new NotFoundException();

    if(link.expiresAt && new Date() > link.expiresAt) 
      throw new ForbiddenException("Link Expired");

    await this.cache.setSlug(slug, link.originalUrl);

    // save the analytics info
    const userAgent = req.headers["user-agent"] || "";
    const ua = parseUserAgent(userAgent);

    await this.db.insert(clickSchema).values({
      linkId: link.linkId,
      ip: req.ip,
      country: req.headers["x-country"] as string || null,
      city: req.headers["x-city"] as string || null,
      device: ua.device,
      os: ua.os,
      browser: ua.browser,
      referrer: req.headers.referer || null,
      userAgent: userAgent,
    })


    // increment total clicks on link
    await this.db.update(linkSchema).set({
      clickCount: (link.clickCount  || 0) + 1,
    }).where(eq(linkSchema.linkId, link.linkId))

    return link.originalUrl;
  }

  /**
   * Get multiple list from links
   * @param param0 
   * @returns 
   */
  async getLinks({
    userId,
    query,
    page = 1,
    limit = 20
  }: {
    userId: string;
    query: string;
    page: number;
    limit: number
  }) {
    const from = (page - 1) * limit;
    const links = await this.searchService.search(query, userId, from, limit);

    if(!links)
      throw new RpcException("Error while getting links");

    return {
      success: true,
      links
    }
  }
}