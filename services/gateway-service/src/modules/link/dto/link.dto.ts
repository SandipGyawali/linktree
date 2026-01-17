import { 
  IsBoolean, 
  IsDateString, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  IsUrl, 
  Length 
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

/**
 * DTO for creating a link
 */
export class CreateLinkDto {
  @ApiProperty({ description: "Original URL to be shortened" })
  @IsUrl()
  @IsNotEmpty()
  originalUrl: string;

  @ApiPropertyOptional({ description: "Custom slug for the shortened URL", minLength: 3, maxLength: 20 })
  @IsOptional()
  @IsString()
  @Length(3, 20)
  slug?: string;

  @ApiPropertyOptional({ description: "Title of the link" })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: "Description of the link" })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: "Preview image URL for the link" })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ description: "Enable preview mode for the link" })
  @IsOptional()
  @IsBoolean()
  isPreviewEnabled?: boolean;

  @ApiPropertyOptional({ description: "Expiration date for the link" })
  @IsOptional()
  @IsDateString()
  expiresAt?: Date;
}

export class CreateLinkDtoWithUserId {
  @ApiProperty({ description: "ID of the user creating the link" })
  @IsString()
  @IsNotEmpty()
  userId: string;
  
  @ApiProperty({ description: "Link creation data" })
  dto: CreateLinkDto;
}

/**
 * DTO for updating a link
 */
export class UpdateLinkDto {
  @ApiProperty({ description: "ID of the link to be updated" })
  @IsNotEmpty()
  @IsString()
  linkId: string;  

  @ApiPropertyOptional({ description: "Original URL to be updated" })
  @IsOptional()
  @IsUrl()
  originalUrl?: string;

  @ApiPropertyOptional({ description: "Title of the link" })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: "Description of the link" })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: "Preview image URL for the link" })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ description: "Enable preview mode for the link" })
  @IsOptional()
  @IsBoolean()
  isPreviewEnabled?: boolean;

  @ApiPropertyOptional({ description: "Activate or deactivate the link" })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ description: "Expiration date for the link" })
  @IsOptional()
  @IsDateString()
  expiresAt?: Date;
}

/**
 * DTO for resolving a link (microservice payload)
 */
export class ResolveLinkDto {
  @ApiProperty({ description: "Slug of the link to resolve" })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiPropertyOptional({ description: "Request metadata for analytics tracking" })
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
  @ApiProperty({ description: "ID of the link to fetch" })
  @IsString()
  @IsNotEmpty()
  linkId: string;
} 

export class GetLinkBySlugDto {
  @ApiProperty({ description: "Slug of the link to fetch" })
  @IsString()
  @IsNotEmpty()
  slug: string;
}
