import { createTable } from "../helpers/create-table";

export const adminSchema = createTable("admins", (t) => ({
  adminId: t.uuid("admin_id").$defaultFn(crypto.randomUUID).primaryKey(),
  
  email: t.varchar("email", { length: 255 }).notNull().unique(),
  hash: t.text("hash").notNull(),

  isActive: t.boolean("is_active").default(true).notNull(),
  isBlocked: t.boolean("is_blocked").default(false).notNull(),

  lastLoginAt: t.timestamp("last_login_at").$onUpdateFn(() => new Date()),
  lastLoginIp: t.text("last_login_ip"),

  createdBy: t.uuid("created_by_admin_id"),

  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at").$onUpdateFn(() => new Date())
}));