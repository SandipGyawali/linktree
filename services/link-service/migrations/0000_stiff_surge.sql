CREATE TABLE "linktree_clicks" (
	"click_id" uuid PRIMARY KEY NOT NULL,
	"link_id" uuid NOT NULL,
	"ip" text,
	"country" text,
	"city" text,
	"device" text,
	"os" text,
	"browser" text,
	"referrer" text,
	"user_agent" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "linktree_links" (
	"link_id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"slug" text NOT NULL,
	"original_url" text NOT NULL,
	"title" text,
	"description" text,
	"image" text,
	"is_preview_enabled" boolean DEFAULT true,
	"is_active" boolean DEFAULT true,
	"expires_at" timestamp,
	"click_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "linktree_links_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "linktree_link_stats" (
	"stat_id" uuid PRIMARY KEY NOT NULL,
	"link_id" uuid NOT NULL,
	"date" date NOT NULL,
	"clicks" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "linktree_clicks" ADD CONSTRAINT "linktree_clicks_link_id_linktree_links_link_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."linktree_links"("link_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "linktree_link_stats" ADD CONSTRAINT "linktree_link_stats_link_id_linktree_links_link_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."linktree_links"("link_id") ON DELETE cascade ON UPDATE no action;