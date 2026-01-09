import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class SignupDto {
  @ApiProperty({ 
    description: "User's full name", 
    example: "John Doe" 
  })
  @IsNotEmpty({ message: "Name is required" })
  name: string;

  @ApiProperty({ 
    description: "User's email address", 
    example: "john.doe@example.com" 
  })
  @IsEmail({}, { message: "Invalid email address" })
  email: string;

  @ApiProperty({ 
    description: "Password for the account", 
    example: "strongPassword123", 
    minLength: 6 
  })
  @IsNotEmpty({ message: "Password is required" })
  @MinLength(6, { message: "Password must be at least 6 characters" })
  password: string;
}
