"use server";

import { requireSessionUser } from "@/lib/auth";
import { importRecipesFromCsvBuffer } from "../recipes";
import { bulkInsertRecipes } from "@/lib/db/recipes";

// keep server action modules as simple as possible due to strange issues w/calling non-async functions
export const importRecipesAction = async (formData: FormData) => {
  const user = await requireSessionUser();

  const file = formData.get("file") as File;
  const fileBuffer = await file.arrayBuffer();
  console.log(`File name: ${file.name}, size: ${fileBuffer.byteLength}`);

  const recipes = await importRecipesFromCsvBuffer(Buffer.from(fileBuffer));
  console.log(`Recipes: ${JSON.stringify(recipes, null, 2)}`);

  const adaptedRecipes = recipes.map((r) => ({
    ...r,
    ownerId: user.id,
    slug: "",
  }));
  await bulkInsertRecipes(adaptedRecipes);
};
