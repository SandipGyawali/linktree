import { index } from "drizzle-orm/pg-core";
import { createTable } from "../helpers/create-table";
import { usersTable } from "./users";

export const profileViewsTable = createTable(
  "profile_views",
  (t) => ({
    view_id: t.uuid().$defaultFn(Bun.randomUUIDv7).primaryKey(),

    user_id: t
      .uuid()
      .notNull()
      .references(() => usersTable.user_id, { onDelete: "cascade" }),

    // metadata
    ip_address: t.text(),
    user_agent: t.text(),
    country: t.text(),
    city: t.text(),

    created_at: t.timestamp().defaultNow(),
  }),
  (table) => [
    index("views_user_index").on(table.user_id),
  ]
);
