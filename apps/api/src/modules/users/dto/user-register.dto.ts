import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ description: 'Unique username for authentication' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Unique email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password for authentication', minLength: 8 })
  @MinLength(8)
  @IsString()
  password: string;
}