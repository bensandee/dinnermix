import { Schema } from "mongoose";
import z from "zod";
import { buildModel } from "./Helper";

const recipeHistorySchema = new Schema({
  recipe: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },
  date: { type: Date, required: true },
});

/** mongoose schema */
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  recipeHistory: [recipeHistorySchema],
});

export const schema = z.object({
  email: z.string(),
  recipeHistory: z
    .array(z.object({ recipe: z.coerce.string(), date: z.date() }))
    .optional(),
});
export type UserType = z.infer<typeof schema>;

/** used to execute queriss against mongoose */
export const userModel = buildModel<UserType>("User", userSchema);
