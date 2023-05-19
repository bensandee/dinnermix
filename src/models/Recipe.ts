import { Schema } from "mongoose";
import z from "zod";
import { buildModel } from "./Helper";

/** mongoose schema */
const recipeSchema = new Schema({
  name: { type: String, required: true },
  url: String,
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

/** the normal representation of the recipe outside of mongoose */
export const schema = z.object({
  id: z.string(),
  name: z.string(),
  user: z.coerce.string(),
  url: z.string().url().optional(),
});
export type RecipeType = z.infer<typeof schema>;

/** used to execute queriss against mongoose */
export const recipeModel = buildModel<RecipeType>("Recipe", recipeSchema);
