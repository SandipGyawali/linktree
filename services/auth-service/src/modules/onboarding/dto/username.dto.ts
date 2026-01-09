import { ApiProperty } from "@nestjs/swagger";
import { IsLowercase, IsString, Matches } from "class-validator";

export class ClaimUsernameDto {
  @ApiProperty({ example: "sandipgy" })
  @IsString()
  @IsLowercase()
  @Matches(/^[a-z0-9_]+$/, {
    message: "Username can contain only lowercase letters, numbers and underscores",
  })
  username: string;
}
