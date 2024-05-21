"use server";

import { redirect } from "next/navigation";
import { requireSessionUser } from "@/lib/auth";
import { InsertRecipe, insertRecipeSchema } from "@/lib/db/schema";
import { InsertRecipeActionType } from "./types";
import { insertNewRecipe } from "@/lib/db/recipes";
import { getRecipeSlug } from "../slugs";

export const insertRecipeAction = async (
  recipeData: InsertRecipeActionType,
): Promise<string | undefined> => {
  console.log(`insertRecipe ${JSON.stringify(recipeData)}`);
  const user = await requireSessionUser();

  const newRecipe: InsertRecipe = { ...recipeData, ownerId: user.id };
  const parsed = insertRecipeSchema.safeParse(newRecipe);
  if (!parsed.success) {
    return parsed.error.message;
  }

  const { slug: initialSlug, ...rest } = parsed.data;
  const actualSlug = await getRecipeSlug(initialSlug, rest.name);

  const modifiedObject = { ...rest, slug: actualSlug };
  await insertNewRecipe(modifiedObject);
  redirect(`/recipes/${actualSlug}`);
};
