import { createTable } from "../helpers/create-table";

export const userSchema = createTable("admins", (t) => ({
  userId: t.uuid("user_id").$defaultFn(crypto.randomUUID).primaryKey(),
  
  username: t.text().notNull().unique(),
  email: t.varchar("email", { length: 255 }).notNull().unique(),
  hash: t.text("hash").notNull(),

  isActive: t.boolean("is_active").default(true).notNull(),

  lastLoginAt: t.timestamp("last_login_at").$onUpdateFn(() => new Date()),
  lastLoginIp: t.text("last_login_ip"),

  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at").$onUpdateFn(() => new Date())
}));