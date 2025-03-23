ALTER TABLE "project" RENAME COLUMN "thumbnailUrl" TO "thumbnail_file_id";--> statement-breakpoint
ALTER TABLE "project" DROP COLUMN "height";--> statement-breakpoint
ALTER TABLE "project" DROP COLUMN "width";