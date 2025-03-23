ALTER TABLE "project" ALTER COLUMN "isTemplate" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "isTemplate" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "isPro" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "isPro" SET NOT NULL;