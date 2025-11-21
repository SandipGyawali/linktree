import { usersTable } from '@linktree/db';
import { InferSelectModel } from 'drizzle-orm';

export type User = Omit<InferSelectModel<typeof usersTable>, "created_at" | "updated_at">;