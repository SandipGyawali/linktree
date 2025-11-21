import { index } from "drizzle-orm/pg-core";
import { createTable } from "../helpers/create-table";

export const usersTable = createTable("users", (t) => ({
  user_id: t.uuid().$defaultFn(Bun.randomUUIDv7).primaryKey(),
  username: t.text().notNull().unique(),

  email: t.text().notNull().unique(),
  password: t.text().notNull(),

  created_at: t.timestamp().defaultNow(),
  updated_at: t
    .timestamp()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
}), 
  (table) => [
    index("username_index").on(table.username),
    index("unique_email_index").on(table.email),    
  ]
);