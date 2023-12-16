import { insertRecipeSchema, recipeSchema } from "@/lib/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { database } from "@/lib/db";
import { z } from "zod";

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

export const getRecipeCountBySlug = async ({ slug }: { slug: string }) => {
  return (
    await database
      .select({ count: sql<number>`count(*)` })
      .from(recipeSchema)
      .where(eq(recipeSchema.slug, slug))
      .execute()
  )[0].count;
};

export const insertNewRecipe = async (
  data: z.infer<typeof insertRecipeSchema>,
) => {
  const insertValue = await database.insert(recipeSchema).values(data);
};
