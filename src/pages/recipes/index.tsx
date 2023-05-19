import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { InferGetServerSidePropsType } from "next";
import { dbConnect } from "@/lib/dbConnect";
import { schema, recipeModel } from "@/models/Recipe";

export default function RecipeIndex({
  recipes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <div>{JSON.stringify(recipes)}</div>;
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps() {
    await dbConnect();

    const recipes = await recipeModel.find({});
    return { props: { recipes: schema.array().parse(recipes) } };
  },
});
