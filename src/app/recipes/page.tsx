import { dbConnect } from "@/lib/dbConnect";
import Recipe from "@/models/Recipe";

export default async function RecipeIndex() {
  await dbConnect();
  const recipes = await Recipe.find({});
  const recipeList = recipes.map((recipe) => {
    return recipe.name;
  });
  return <div>{recipeList}</div>;
}
