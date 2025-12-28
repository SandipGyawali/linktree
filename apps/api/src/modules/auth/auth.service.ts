import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Drizzle } from "src/common/drizzle/decorators/drizzle.decorator";
import { usersTable } from "@linktree/db"
import { eq } from "drizzle-orm";
import { UserNotFoundException } from "src/common/errors";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { hashPassword, validatePassword } from "./utils/password";
import { UserService } from "../users/user.service";

@Injectable()
export class AuthService {
  constructor(
    @Drizzle() private readonly db: NodePgDatabase,
    private userService: UserService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if(user) 
      throw new UserNotFoundException("User exists with the provided Email");
  }

  async login() {}


  async changePassword(dto: ChangePasswordDto & { email: string }) {
    const { email, confirmPassword, oldPassword, password } = dto;
    
    if(password !== confirmPassword) 
      throw new BadRequestException("Passwords do not match");

    try {
      const user = await this.userService.findOneByEmail(email);

      const isOldPasswordValid = await validatePassword(oldPassword, user.password)
      if(!isOldPasswordValid) 
        throw new BadRequestException("Old Password is incorrect");

      await this.db
        .update(usersTable)
        .set({ password: await hashPassword(password) })
        .where(eq(usersTable.email, email));

      return { message: "Password Changed Successfully" };  
    }catch(err) {
      console.error(err);
      throw new InternalServerErrorException(err ??"Error while changing user password")
    }
  }
}
