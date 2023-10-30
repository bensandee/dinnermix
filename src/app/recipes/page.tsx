import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { recipeSchema } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { database } from "@/lib/db";
import { requireSessionUser } from "@/lib/auth";

async function RecipeIndex() {
  const user = await requireSessionUser();
  const recipes = await database
    .select()
    .from(recipeSchema)
    .where(eq(recipeSchema.userId, user.id));
  return (
    <div>
      <pre>{JSON.stringify(recipes, undefined, 2)}</pre>
    </div>
  );
}

export default withPageAuthRequired(RecipeIndex, { returnTo: "/" });
