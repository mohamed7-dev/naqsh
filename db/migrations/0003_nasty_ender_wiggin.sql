ALTER TABLE "project" RENAME COLUMN "userId" TO "creator";--> statement-breakpoint
ALTER TABLE "project" DROP CONSTRAINT "project_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_creator_user_id_fk" FOREIGN KEY ("creator") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;