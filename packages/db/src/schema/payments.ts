import { index } from "drizzle-orm/pg-core";
import { createTable } from "../helpers/create-table";
import { subscriptionsTable } from "./subscription";
import { usersTable } from "./users";
import { randomUUID } from "node:crypto";

export const esewaPaymentsTable = createTable(
  "esewa_payments",
  (t) => ({
    payment_id: t.uuid().$defaultFn(() => randomUUID()).primaryKey(),

    user_id: t
      .uuid()
      .notNull()
      .references(() => usersTable.user_id, { onDelete: "cascade" }),

    subscription_id: t
      .uuid()
      .references(() => subscriptionsTable.subscription_id, {
        onDelete: "set null",
      }),

    amount: t.integer().notNull(), // paisa amount sent to eSewa
    currency: t.text().default("NPR"),

    product_id: t.text().notNull(), // merchant-defined product/ref ID
    ref_id: t.text(),               // returned by eSewa after payment

    type: t.text().$type<"subscription" | "renewal">().default("subscription"),

    status: t.text().$type<
      "pending" | "verified" | "failed"
    >().default("pending"),

    raw_response: t.jsonb(), // save full payload from eSewa verify endpoint

    created_at: t.timestamp().defaultNow(),
    verified_at: t.timestamp(),
  }),
  (table) => [
    index("payment_user_index").on(table.user_id),
    index("payment_subscription_index").on(table.subscription_id),
    index("payment_ref_id_index").on(table.ref_id),
  ]
);
