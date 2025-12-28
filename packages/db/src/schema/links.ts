import { index } from "drizzle-orm/pg-core";
import { createTable } from "../helpers/create-table";
import { usersTable } from "./users";
import { randomUUID } from "node:crypto";

export const linksTable = createTable(
  "links",
  (t) => ({
    link_id: t.uuid().$defaultFn(() => randomUUID()).primaryKey(),

    user_id: t
      .uuid()
      .notNull()
      .references(() => usersTable.user_id, { onDelete: "cascade" }),

    title: t.text().notNull(),  
    url: t.text().notNull(),
    icon: t.text(),
    order: t.integer().notNull(), 
    is_active: t.boolean().default(true),
    clicks: t.integer().default(0),

    created_at: t.timestamp().defaultNow(),
    updated_at: t.timestamp().defaultNow().$onUpdateFn(() => new Date()),
  }),
  (table) => [
    index("links_user_index").on(table.user_id),
  ]
);

export const linkClicksTable = createTable("link_clicks", (t) => ({
  click_id: t.uuid().$defaultFn(() => randomUUID()).primaryKey(), 
  user_id: t
    .uuid()
    .notNull()
    .references(() => usersTable.user_id, { onDelete: "cascade" }),
  link_id: t
    .uuid()
    .notNull()
    .references(() => linksTable.link_id, { onDelete: "cascade" }),

  ip_address: t.text(),
  user_agent: t.text(),
  country: t.text(),
  city: t.text(),

  created_at: t.timestamp().defaultNow(),
}), 
  (table) => [
    index("clicks_user_index").on(table.user_id)
  ]
);