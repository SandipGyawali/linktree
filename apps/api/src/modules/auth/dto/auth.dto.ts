import { ApiProperty } from "@nestjs/swagger";

export class AuthInputDto {
  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly password: string;
}