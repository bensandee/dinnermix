import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { InferGetServerSidePropsType } from "next";
import { dbConnect } from "@/lib/dbConnect";
import { RecipeSchema, RecipeModel } from "@/models/Recipe";
import { requireSessionUser } from "@/lib/auth";

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

    await dbConnect();
    const recipes = await RecipeModel.find({ user: user.id });
    return { props: { recipes: RecipeSchema.array().parse(recipes) } };
  },
});
