import { index } from "drizzle-orm/pg-core";
import { createTable } from "../helpers/create-table";
import { subscriptionsTable } from "./subscription";
import { usersTable } from "./users";
import { randomUUID } from "node:crypto"

export const billingEventsTable = createTable(
  "billing_events",
  (t) => ({
    event_id: t.uuid().$defaultFn(() => randomUUID()).primaryKey(),

    user_id: t
      .uuid()
      .references(() => usersTable.user_id, { onDelete: "cascade" }),

    subscription_id: t
      .uuid()
      .references(() => subscriptionsTable.subscription_id, {
        onDelete: "cascade",
      }),

    event_type: t.text().notNull().$type<
      | "subscription_created"
      | "payment_initiated"
      | "payment_verified"
      | "payment_failed"
      | "subscription_renewed"
      | "subscription_canceled"
      | "subscription_expired"
    >(),

    message: t.text(),
    metadata: t.jsonb(),

    created_at: t.timestamp().defaultNow(),
  }),
  (table) => [
    index("billing_event_subscription_index").on(table.subscription_id),
  ]
);
