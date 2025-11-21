import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator"

export class ChangePasswordDto {
  @ApiProperty({description: "Enter you current Password" })
  @IsString()
  @MinLength(8)
  oldPassword: string;

  @ApiProperty({ description: "New Password for the user" })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ description: "Confirm New Password for the user" })
  @IsString()
  @MinLength(8)
  confirmPassword: string;
}