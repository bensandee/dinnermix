"use server";

import { requireSessionUser } from "@/lib/auth";
import { insertRecipeSchema } from "@/lib/db/schema";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/slugify";
import { InsertRecipeActionType } from "./types";
import { getRecipeCountBySlug, insertNewRecipe } from "@/lib/db/recipes";

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
    while ((await getRecipeCountBySlug({ slug })) > 0) {
      slug = slugify(rest.name, iteration);
    }
  }
  const modifiedObject = { ...rest, slug };
  await insertNewRecipe(modifiedObject);
  redirect(`/recipes/${slug}`);
};
