import { and, eq } from "drizzle-orm";
import { database } from ".";
import { recipeAttachmentSchema, recipeSchema, userSchema } from "./schema";
import "server-only";

type CheckAttachmentAccessProps = {
  userId: number;
  attachmentId: number;
};

export const checkAttachmentAccess = async ({
  userId,
  attachmentId,
}: CheckAttachmentAccessProps) => {
  const result = await database
    .select()
    .from(recipeAttachmentSchema)
    .innerJoin(
      recipeSchema,
      eq(recipeAttachmentSchema.recipeId, recipeSchema.id),
    )
    .innerJoin(userSchema, eq(recipeSchema.ownerId, userSchema.id))
    .where(
      and(
        eq(userSchema.id, userId),
        eq(recipeAttachmentSchema.id, attachmentId),
      ),
    );
  return result.length > 0;
};

type CheckRecipeOwnershipProps = {
  userId: number;
  recipeId: number;
};

export const checkRecipeOwnership = async ({
  userId,
  recipeId,
}: CheckRecipeOwnershipProps) => {
  const result = await database
    .select()
    .from(recipeSchema)
    .where(
      and(eq(recipeSchema.ownerId, userId), eq(recipeSchema.id, recipeId)),
    );
  return result.length > 0;
};
