"use server";

import { redirect } from "next/navigation";
import { requireSessionUser } from "@/lib/auth";
import { importRecipesFromCsvBuffer } from "@/lib/recipes/recipes";
import { insertNewRecipe } from "@/lib/db/recipes";
import { getRecipeSlug } from "@/lib/recipes/slugs";

// keep server action modules as simple as possible due to strange issues w/calling non-async functions
export const importRecipesAction = async (formData: FormData) => {
  const user = await requireSessionUser();

  const file = formData.get("file") as File;
  const fileBuffer = await file.arrayBuffer();

  const recipes = await importRecipesFromCsvBuffer(Buffer.from(fileBuffer));

  const adaptedRecipes = recipes.map((r) => ({
    ...r,
    ownerId: user.id,
  }));

  for await (const r of adaptedRecipes) {
    const newSlug = await getRecipeSlug({ recipeName: r.name });
    await insertNewRecipe({ ...r, slug: newSlug });
  }
  redirect("/recipes");
};
