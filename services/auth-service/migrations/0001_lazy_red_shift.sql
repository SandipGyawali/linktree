ALTER TABLE "linktree_users" RENAME COLUMN "username" TO "full_name";--> statement-breakpoint
ALTER TABLE "linktree_users" DROP CONSTRAINT "linktree_users_username_unique";