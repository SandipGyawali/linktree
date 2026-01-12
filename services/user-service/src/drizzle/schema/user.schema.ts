import { createTable } from "../helpers/create-table";

export const userSchema = createTable("users", (t) => ({
  userId: t.uuid("user_id").primaryKey(),
  
  username: t.text("username").notNull().unique(),
  bio: t.text("bio"),
  image: t.text("image"),

//   links: t.jsonb

  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at").$onUpdateFn(() => new Date())
}));