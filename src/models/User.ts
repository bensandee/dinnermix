import { Schema } from "mongoose";
import { buildModel } from "./Helper";
import z from "zod";

const recipeHistorySchema = new Schema({
  recipe: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },
  date: { type: Date, required: true },
});

/** mongoose schema */
const mongooseSchema = new Schema({
  email: { type: String, required: true, unique: true },
  recipeHistory: [recipeHistorySchema],
});

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  recipeHistory: z
    .array(z.object({ recipeSlug: z.coerce.string(), date: z.date() }))
    .optional(),
});
type User = z.infer<typeof UserSchema>;

/** used to execute queriss against mongoose */
export const UserModel = buildModel<User>("User", mongooseSchema);
