import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { InferGetServerSidePropsType } from "next";
import { dbConnect } from "@/lib/dbConnect";
import { RecipeSchema, RecipeModel } from "@/models/Recipe";

export default function RecipeIndex({
  recipes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <div>{JSON.stringify(recipes)}</div>;
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps() {
    await dbConnect();

    const recipes = await RecipeModel.find({});
    return { props: { recipes: RecipeSchema.array().parse(recipes) } };
  },
});
