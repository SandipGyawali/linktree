/**
 * The Schema Described is for the url-shortener.
 */
import { createTable } from "../helpers/create-table";
import { InferSelectModel, InferInsertModel } from "drizzle-orm"

export const linkSchema = createTable("links", (t) => ({
  linkId: t.uuid("link_id").$defaultFn(() => crypto.randomUUID()).primaryKey(),
  userId: t.uuid("user_id").notNull(),
    
  slug: t.text("slug").notNull().unique(), // abc123
  originalUrl: t.text("original_url").notNull(),

  // for preview
  title: t.text("title"),
  description: t.text("description"),
  image: t.text("image"),
  isPreviewEnabled: t.boolean("is_preview_enabled").default(true),

  isActive: t.boolean("is_active").default(true),
  expiresAt: t.timestamp("expires_at"),

  clickCount: t.integer("click_count").default(0),

  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at").$onUpdateFn(() => new Date()),
}));

export type LinkSchema = InferSelectModel<typeof linkSchema>;

export const clickSchema = createTable("clicks", (t) => ({
  clickId: t.uuid("click_id").$defaultFn(() => crypto.randomUUID()).primaryKey(),

  linkId: t
    .uuid("link_id")
    .notNull()
    .references(() => linkSchema.linkId, { onDelete: "cascade" }),

  ip: t.text("ip"),

  country: t.text("country"),
  city: t.text("city"),

  device: t.text("device"), // mobile / desktop
  os: t.text("os"),
  browser: t.text("browser"),

  referrer: t.text("referrer"),
  userAgent: t.text("user_agent"),

  createdAt: t.timestamp("created_at").defaultNow().notNull(),
}));


export const linkStatsSchema = createTable("link_stats", (t) => ({
  statId: t.uuid("stat_id").primaryKey(),

  linkId: t
    .uuid("link_id")
    .notNull()
    .references(() => linkSchema.linkId, { onDelete: "cascade" }),

  date: t.date("date").notNull(),

  clicks: t.integer("clicks").default(0),

  createdAt: t.timestamp("created_at").defaultNow().notNull(),
}));
