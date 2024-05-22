import { insertRecipeSchema } from "@/lib/db/schema";
import { z } from "zod";

export const insertRecipeActionSchema = insertRecipeSchema
  .omit({
    ownerId: true,
    id: true,
  })
  .required();

export type InsertRecipeActionType = z.infer<typeof insertRecipeActionSchema>;
