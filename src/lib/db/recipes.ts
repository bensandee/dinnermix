import "server-only";

import { InsertRecipe, recipeSchema } from "@/lib/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { database } from "@/lib/db";

export const getRecipe = async ({
  slug,
  userId,
}: {
  slug: string;
  userId: number;
}) => {
  const where = and(
    eq(recipeSchema.slug, slug),
    eq(recipeSchema.ownerId, userId),
  );

  return await database.select().from(recipeSchema).where(where);
};

export const getRecipeList = async ({ userId }: { userId: number }) => {
  return await database
    .select()
    .from(recipeSchema)
    .where(eq(recipeSchema.ownerId, userId));
};

export const deleteRecipe = async ({
  recipeId,
  ownerId,
}: {
  recipeId: number;
  ownerId: number;
}) => {
  return await database
    .delete(recipeSchema)
    .where(
      and(eq(recipeSchema.id, recipeId), eq(recipeSchema.ownerId, ownerId)),
    );
};

export const getRecipeCountBySlug = async ({ slug }: { slug: string }) => {
  return (
    await database
      .select({ count: sql<number>`count(*)` })
      .from(recipeSchema)
      .where(eq(recipeSchema.slug, slug))
      .execute()
  )[0].count;
};

export const insertNewRecipe = async (data: InsertRecipe) => {
  await database.insert(recipeSchema).values(data);
};

export const bulkInsertRecipes = async (data: InsertRecipe[]) => {
  await database.insert(recipeSchema).values(data);
};
