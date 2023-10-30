import { requireSessionUser } from "@/lib/auth";
import { recipeSchema } from "@/lib/db/schema";
import { slugFromQuery } from "@/lib/slugify";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { and, eq } from "drizzle-orm";
import { InferGetServerSidePropsType } from "next";
import { database } from "@/lib/db";

export default function Recipe({
  recipe,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (recipe) {
    return (
      <div className="p-4">
        <h1>{recipe.name}</h1>
        <p>{recipe.description}</p>
      </div>
    );
  }
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res, query }) {
    const user = await requireSessionUser(req, res);

    const slug = slugFromQuery(query);
    if (slug === undefined) {
      res.statusCode = 404;
      return { props: { recipe: null } };
    }

    const where = and(
      eq(recipeSchema.slug, slug),
      eq(recipeSchema.id, user.id),
    );

    const recipe = await database.select().from(recipeSchema).where(where);
    let returnRecipe;
    if (recipe.length === 0) {
      res.statusCode = 404;
      returnRecipe = null;
    } else {
      returnRecipe = recipe[0];
    }

    return { props: { recipe: returnRecipe } };
  },
});
