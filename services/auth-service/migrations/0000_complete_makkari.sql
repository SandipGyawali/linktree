CREATE TABLE "linktree_admins" (
	"admin_id" uuid PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"hash" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_blocked" boolean DEFAULT false NOT NULL,
	"last_login_at" timestamp,
	"last_login_ip" text,
	"created_by_admin_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "linktree_admins_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "linktree_users" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" varchar(255) NOT NULL,
	"hash" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"last_login_at" timestamp,
	"last_login_ip" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "linktree_users_username_unique" UNIQUE("username"),
	CONSTRAINT "linktree_users_email_unique" UNIQUE("email")
);
