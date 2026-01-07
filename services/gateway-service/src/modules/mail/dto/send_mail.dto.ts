import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer"

export class SendMailDto {
  @ApiProperty({ example: "test@example.com" })
  @IsEmail()
  to: string;

  @ApiProperty({example: "Hello World" })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ example: "This is a test email message sent" })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({ example: "CreateUserAccountOTPTemplate" })
  @IsString()
  @IsNotEmpty()
  key: ["CreateUserAccountOTPTemplate"];

  @ApiProperty({ 
    example: {
      full_name: "John Doe",
      otp: "224455"
    }
  })
  @ValidateNested()
  @Type(() => Object)
  props: Record<string, any>;
}