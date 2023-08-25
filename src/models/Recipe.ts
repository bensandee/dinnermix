import { Schema } from "mongoose";
import { buildModel } from "./Helper";
import z from "zod";

/** mongoose schema */
const mongooseSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  url: String,
  prepCount: { type: Number, default: 0 },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

/** the normal representation of the recipe outside of mongoose */
export const RecipeSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string().default(""),
  url: z.string().url().default(""),
  prepCount: z.number().default(0),
  user: z.coerce.string(),
});
type Recipe = z.infer<typeof RecipeSchema>;

/** used to execute queries against mongoose */
export const RecipeModel = buildModel<Recipe>("Recipe", mongooseSchema);
