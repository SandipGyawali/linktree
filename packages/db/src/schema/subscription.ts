import { index } from "drizzle-orm/pg-core";
import { createTable } from "../helpers/create-table";
import { usersTable } from "./users";

export const subscriptionPlansTable = createTable(
  "subscription_plans",
  (t) => ({
    plan_id: t.uuid().$defaultFn(Bun.randomUUIDv7).primaryKey(),

    name: t.text().notNull().unique(), // e.g., "Premium"
    description: t.text(),

    price: t.integer().notNull(), // NPR price in paisa (e.g. NPR 500 = 50000)

    interval: t.text().$type<"monthly" | "yearly">(), // "monthly", "yearly"
    currency: t.text().default("NPR"),

    is_active: t.boolean().default(true),
  }),
  (table) => [
    index("plan_name_index").on(table.name),
  ]
);


export const subscriptionsTable = createTable(
  "subscriptions",
  (t) => ({
    subscription_id: t.uuid().$defaultFn(Bun.randomUUIDv7).primaryKey(),

    user_id: t
      .uuid()
      .notNull()
      .references(() => usersTable.user_id, { onDelete: "cascade" }),
    plan_id: t
      .uuid()
      .notNull()
      .references(() => subscriptionPlansTable.plan_id, { onDelete: "restrict" }),

    status: t.text().notNull().$type<
      "active" | "expired" | "canceled" | "pending" | "failed"
    >(),

    start_date: t.timestamp().defaultNow(),
    end_date: t.timestamp().notNull(),  // billing cycle end date
    cancel_at: t.timestamp(),           // future scheduled cancellation

    created_at: t.timestamp().defaultNow(),
    updated_at: t.timestamp().defaultNow().$onUpdateFn(() => new Date()),
  }),
  (table) => [
    index("subscription_user_index").on(table.user_id),
    index("subscription_status_index").on(table.status),
  ]
);
