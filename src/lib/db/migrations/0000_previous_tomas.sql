CREATE TABLE IF NOT EXISTS "dm_recipe_owner" (
	"recipeId" serial NOT NULL,
	"userId" serial NOT NULL,
	"datePrepared" timestamp NOT NULL,
	CONSTRAINT dm_recipe_owner_recipeId_userId PRIMARY KEY("recipeId","userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dm_recipe" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(120) NOT NULL,
	"slug" varchar(120) NOT NULL,
	"description" text,
	"url" varchar(400),
	"prepCount" integer DEFAULT 0 NOT NULL,
	"userId" integer NOT NULL,
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
 ALTER TABLE "dm_recipe_owner" ADD CONSTRAINT "dm_recipe_owner_recipeId_dm_recipe_id_fk" FOREIGN KEY ("recipeId") REFERENCES "dm_recipe"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dm_recipe_owner" ADD CONSTRAINT "dm_recipe_owner_userId_dm_user_id_fk" FOREIGN KEY ("userId") REFERENCES "dm_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dm_recipe" ADD CONSTRAINT "dm_recipe_userId_dm_user_id_fk" FOREIGN KEY ("userId") REFERENCES "dm_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
