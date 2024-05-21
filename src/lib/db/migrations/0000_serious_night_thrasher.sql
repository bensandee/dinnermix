CREATE TABLE IF NOT EXISTS "dm_recipe_attachment" (
	"id" serial PRIMARY KEY NOT NULL,
	"recipeId" serial NOT NULL,
	"uuid" varchar(36) NOT NULL,
	"contentType" varchar(30) NOT NULL,
	"filename" varchar(120)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dm_recipe_history" (
	"recipeId" serial NOT NULL,
	"userId" serial NOT NULL,
	"preparedOn" timestamp NOT NULL,
	CONSTRAINT "dm_recipe_history_recipeId_userId_pk" PRIMARY KEY("recipeId","userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dm_recipe" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(120) NOT NULL,
	"slug" varchar(120) NOT NULL,
	"description" text,
	"url" varchar(400),
	"ownerId" serial NOT NULL,
	CONSTRAINT "dm_recipe_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dm_user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(80) NOT NULL,
	"email" varchar(120) NOT NULL,
	"lastLogin" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dm_recipe_attachment" ADD CONSTRAINT "dm_recipe_attachment_recipeId_dm_recipe_id_fk" FOREIGN KEY ("recipeId") REFERENCES "public"."dm_recipe"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dm_recipe_history" ADD CONSTRAINT "dm_recipe_history_recipeId_dm_recipe_id_fk" FOREIGN KEY ("recipeId") REFERENCES "public"."dm_recipe"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dm_recipe_history" ADD CONSTRAINT "dm_recipe_history_userId_dm_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."dm_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dm_recipe" ADD CONSTRAINT "dm_recipe_ownerId_dm_user_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."dm_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
