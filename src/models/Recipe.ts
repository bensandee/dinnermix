import mongoose, { Model, Schema } from "mongoose";
import z from "zod";

export const recipeSchema = z.object({
  id: z.coerce.string(),
  name: z.string(),
});
export type RecipeType = z.infer<typeof recipeSchema>;

const RecipeMongooseSchema = new Schema<RecipeType>({ name: String });

const model = (): Model<RecipeType> => {
  return (
    mongoose.models.Recipe ??
    mongoose.model<RecipeType>("Recipe", RecipeMongooseSchema)
  );
};

export const recipeModel = model();
