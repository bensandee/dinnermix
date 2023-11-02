import { insertRecipeSchema } from "@/lib/db/schema";
import { z } from "zod";

export const insertRecipeActionSchema = insertRecipeSchema
  .omit({
    userId: true,
    id: true,
    prepCount: true,
  })
  .required();

export type InsertRecipeActionType = z.infer<typeof insertRecipeActionSchema>;
