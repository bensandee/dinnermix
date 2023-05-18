import { dbConnect } from "@/lib/dbConnect";
import { RecipeType, recipeSchema, recipeModel } from "@/models/Recipe";
import { GetServerSideProps } from "next";

type RecipeListProps = {
  recipes: RecipeType[];
};

export default function RecipeIndex({ recipes }: RecipeListProps) {
  return <div>{JSON.stringify(recipes)}</div>;
}

export const getServerSideProps: GetServerSideProps<
  RecipeListProps
> = async () => {
  await dbConnect();

  const recipes = await recipeModel.find({});
  return { props: { recipes: recipeSchema.array().parse(recipes) } };
};
