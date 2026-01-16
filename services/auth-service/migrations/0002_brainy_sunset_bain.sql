ALTER TABLE "linktree_users" ADD COLUMN "username" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "linktree_users" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "linktree_users" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "linktree_users" ADD COLUMN "is_email_verified" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "linktree_users" ADD CONSTRAINT "linktree_users_username_unique" UNIQUE("username");