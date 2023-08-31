import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { InferGetServerSidePropsType } from "next";
import { requireSessionUser } from "@/lib/auth";
import { recipeSchema, selectRecipeSchema } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { database } from "@/lib/db";

export default function RecipeIndex({
  recipes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <pre>{JSON.stringify(recipes, undefined, 2)}</pre>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const user = await requireSessionUser(req, res);

    const recipes = await database
      .select()
      .from(recipeSchema)
      .where(eq(recipeSchema.userId, user.id));
    return { props: { recipes: selectRecipeSchema.array().parse(recipes) } };
  },
});
