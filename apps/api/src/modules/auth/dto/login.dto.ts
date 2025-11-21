import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({ description: "Enter your email" })
  @IsString()
  email: string;
  
  @ApiProperty({ description: "Enter your password" })
  @IsString()
  password: string;
}