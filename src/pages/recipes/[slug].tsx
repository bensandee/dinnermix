import { requireSessionUser } from "@/lib/auth";
import { dbConnect } from "@/lib/dbConnect";
import { RecipeModel, RecipeSchema } from "@/models/Recipe";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { InferGetServerSidePropsType } from "next";

export default function Recipe({
  recipe,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (recipe) {
    return (
      <div>
        <h1>{recipe.name}</h1>
        <p>{recipe.description}</p>
      </div>
    );
  }
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res, query }) {
    const user = await requireSessionUser(req, res);

    const { slug } = query;

    await dbConnect();
    const recipe = await RecipeModel.findOne({ slug, user: user.id });
    let returnRecipe;
    if (!recipe) {
      res.statusCode = 404;
      returnRecipe = null;
    } else {
      returnRecipe = RecipeSchema.parse(recipe);
    }

    return { props: { recipe: returnRecipe } };
  },
});
