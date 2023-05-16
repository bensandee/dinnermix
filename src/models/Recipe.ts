import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({ name: String });

export default mongoose.models.Recipe ?? mongoose.model("Recipe", RecipeSchema);
