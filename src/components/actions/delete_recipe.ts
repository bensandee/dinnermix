"use server";

import { requireSessionUser } from "@/lib/auth";
import { deleteRecipe } from "@/lib/db/recipes";
import { redirect } from "next/navigation";

export const deleteRecipeAction = async (formData: FormData) => {
  const user = await requireSessionUser();
  const recipeId = Number(formData.get("recipeId"));

  await deleteRecipe({ recipeId, ownerId: user.id });
  redirect("/recipes");
};
