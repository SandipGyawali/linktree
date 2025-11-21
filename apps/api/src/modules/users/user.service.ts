import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Drizzle } from "src/common/drizzle/decorators/drizzle.decorator";
import { usersTable } from "@linktree/db/schema";
import { eq } from "drizzle-orm";

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


  async create() {}

}

