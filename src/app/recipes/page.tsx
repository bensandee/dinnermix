import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { requireSessionUser } from "@/lib/auth";
import { getRecipeList } from "@/lib/db/recipes";
import { DeleteRecipeButton, RecipeName } from "@/components/recipes";

async function Page() {
  const user = await requireSessionUser();
  const recipes = await getRecipeList({ userId: user.id });
  return (
    <table className="table-auto">
      <thead>
        <tr className="text-2xl">
          <th>Name</th>
          <th>Ops</th>
        </tr>
      </thead>
      <tbody>
        {recipes.map((recipe) => (
          <tr key={recipe.id}>
            <td className="text-xl">
              <RecipeName recipe={recipe} />
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

export default withPageAuthRequired(Page, { returnTo: "/" });
