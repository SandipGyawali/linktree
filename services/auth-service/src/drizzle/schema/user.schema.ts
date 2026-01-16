import { createTable } from "../helpers/create-table";

export const userSchema = createTable("users", (t) => ({
  userId: t.uuid("user_id").$defaultFn(() => crypto.randomUUID()).primaryKey(),
  
  fullName: t.text("full_name").notNull(),
  username: t.text("username").notNull().unique().default(""),

  email: t.varchar("email", { length: 255 }).notNull().unique(),
  hash: t.text("hash").notNull(),

  bio: t.text("bio"),
  image: t.text("image"),

  isEmailVerified: t.boolean("is_email_verified").notNull().default(false),
  isActive: t.boolean("is_active").default(true).notNull(),

  lastLoginAt: t.timestamp("last_login_at").$onUpdateFn(() => new Date()),
  lastLoginIp: t.text("last_login_ip"),

  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at").$onUpdateFn(() => new Date())
}));