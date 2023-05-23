import { Schema } from "mongoose";
import { buildModel } from "./Helper";
import z from "zod";

/** mongoose schema */
const mongooseSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  url: String,
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

/** the normal representation of the recipe outside of mongoose */
export const RecipeSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  user: z.coerce.string(),
  url: z.string().url().optional(),
});
type Recipe = z.infer<typeof RecipeSchema>;

/** used to execute queries against mongoose */
export const RecipeModel = buildModel<Recipe>("Recipe", mongooseSchema);
