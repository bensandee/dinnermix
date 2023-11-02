"use server";

import { requireSessionUser } from "@/lib/auth";
import { recipeSchema, insertRecipeSchema } from "@/lib/db/schema";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/slugify";
import { database } from "@/lib/db";
import { eq, sql } from "drizzle-orm";
import { InsertRecipeActionType } from "./types";

export const insertRecipeAction = async (
  recipeData: InsertRecipeActionType,
) => {
  console.log(`insertRecipe ${JSON.stringify(recipeData)}`);
  const user = await requireSessionUser();

  const newRecipe = { ...recipeData, userId: user.id };
  const parsed = insertRecipeSchema.safeParse(newRecipe);
  if (!parsed.success) {
    return parsed.error;
  }

  let { slug, ...rest } = parsed.data;
  if (slug === undefined) {
    slug = slugify(rest.name);
    var iteration = 0;
    while (
      (
        await database
          .select({ count: sql<number>`count(*)` })
          .from(recipeSchema)
          .where(eq(recipeSchema.slug, slug))
          .execute()
      )[0].count > 0
    ) {
      slug = slugify(rest.name, iteration);
    }
  }
  const modifiedObject = { ...rest, slug };
  await database.insert(recipeSchema).values(modifiedObject).execute();
  redirect(`/recipes/${slug}`);
};
