import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString, IsUrl, Length } from "class-validator";

/**
 * DTO for creating a link
 */
export class CreateLinkDto {
  @IsUrl()
  @IsNotEmpty()
  originalUrl: string;

  @IsOptional()
  @IsString()
  @Length(3, 20)
  slug?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsBoolean()
  isPreviewEnabled?: boolean;

  @IsOptional()
  @IsDateString()
  expiresAt?: Date;
}

export class CreateLinkDtoWithUserId {
  @IsString()
  @IsNotEmpty()
  userId: string;
  
  dto: CreateLinkDto;
}

/**
 * DTO for updating a link
 */
export class UpdateLinkDto {
  @IsNotEmpty()
  @IsString()
  linkId: string;  

  @IsOptional()
  @IsUrl()
  originalUrl?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsBoolean()
  isPreviewEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsDateString()
  expiresAt?: Date;
}

/**
 * DTO for resolving a link (microservice payload)
 */
export class ResolveLinkDto {
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsOptional()
  reqMeta?: {
    ip?: string;
    userAgent?: string;
    referer?: string;
    headers?: Record<string, any>;
    country?: string;
    city?: string;
  };
}


export class GetLinkByIdDto {
  @IsString()
  @IsNotEmpty()
  linkId: string;
} 


export class GetLinkBySlugDto {
  @IsString()
  @IsNotEmpty()
  slug: string;
}