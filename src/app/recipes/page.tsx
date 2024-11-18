import { requireSessionUser } from "@/lib/auth";
import { getRecipeList } from "@/lib/db/recipes";
import {
  DeleteRecipeButton,
  RecipeLink,
  RecipeName,
} from "@/components/recipes";

export default async function Page() {
  const user = await requireSessionUser();
  const recipes = await getRecipeList({ userId: user.id });
  return (
    <table className="table table-pin-rows table-md">
      <thead>
        <tr className="text-xl">
          <th>Name</th>
          <th>Link</th>
          <th>Ops</th>
        </tr>
      </thead>
      <tbody>
        {recipes.map((recipe) => (
          <tr key={recipe.id}>
            <td>
              <RecipeName recipe={recipe} />
            </td>
            <td>
              <RecipeLink recipe={recipe} />
            </td>
            <td>
              <DeleteRecipeButton recipe={recipe} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
