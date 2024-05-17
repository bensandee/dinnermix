import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { requireSessionUser } from "@/lib/auth";
import { getRecipeList } from "@/lib/db/recipes";

async function Page() {
  const user = await requireSessionUser();
  const recipes = await getRecipeList({ userId: user.id });
  return (
    <div>
      <pre>{JSON.stringify(recipes, undefined, 2)}</pre>
    </div>
  );
}

export default withPageAuthRequired(Page, { returnTo: "/" });
