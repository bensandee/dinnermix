import { requireSessionUser } from "@/lib/auth";
import { recipeSchema } from "@/lib/db/schema";
import { slugify } from "@/lib/slugify";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { and, eq } from "drizzle-orm";
import { database } from "@/lib/db";
import { notFound } from "next/navigation";

async function Recipe({
  params,
}: {
  params?: Record<string, string | string[]>;
}) {
  const user = await requireSessionUser();
  const slug = slugify(params?.slug);
  if (slug === undefined) {
    notFound();
  }

  const where = and(
    eq(recipeSchema.slug, slug),
    eq(recipeSchema.userId, user.id),
  );

  const recipe = await database.select().from(recipeSchema).where(where);
  if (recipe.length === 0) {
    notFound();
  }
  return (
    <div className="p-4">
      <h1>{recipe[0].name}</h1>
      <p>{recipe[0].description}</p>
    </div>
  );
}

export default withPageAuthRequired(Recipe, { returnTo: "/" });
