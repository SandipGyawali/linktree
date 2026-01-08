import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}