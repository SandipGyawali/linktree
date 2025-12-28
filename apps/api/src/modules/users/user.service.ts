import { BadRequestException, Injectable } from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Drizzle } from "src/common/drizzle/decorators/drizzle.decorator";
import { usersTable } from "@linktree/db";
import { eq } from "drizzle-orm";
import { hashPassword } from "../auth/utils/password";
import { User } from "./user.interface";

@Injectable()
export class UserService {
  constructor(
    @Drizzle() private readonly db: NodePgDatabase
  ) {}

  async findOneByEmail(email: string) {
    const response = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if(response.length > 0) return response[0];
      else 
        throw new BadRequestException("User With Provided Email not found") 
  }

  async findOneById(user_id: string) {
    const response = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.user_id, user_id))
      .limit(1);

    if(response.length > 0) return response[0];
      else
        throw new BadRequestException(`User with userId: ${user_id} not found`)
  }


  async register(user: User) {
    const hashedPassword = await hashPassword(user.password);
    
    const newUser = await this.db.insert(usersTable).values({
      ...user,
      password: hashedPassword
    })
    .returning();
    
    // if(!newUser.length > 0) return newUser[0]
  }
}

