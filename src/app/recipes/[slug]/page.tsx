import { requireSessionUser } from "@/lib/auth";
import { getRecipe } from "@/lib/db/recipes";
import { Recipe } from "@/lib/db/schema";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { notFound } from "next/navigation";

const RenderRecipe = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div className="p-4">
      <h1>{recipe.name}</h1>
      <p>{recipe.description}</p>
      <p>
        {recipe.url != null && recipe.url.length > 0 ? (
          <a href={recipe.url}>Link</a>
        ) : null}
      </p>
    </div>
  );
};

async function OuterRecipe({
  params,
}: {
  params?: Record<string, string | string[]>;
}) {
  const user = await requireSessionUser();
  const slug = params?.slug;
  if (slug === undefined || Array.isArray(slug)) {
    console.log(`could not parse slug from ${slug}`);
    notFound();
  }

  const recipe = await getRecipe({ userId: user.id, slug });
  if (recipe.length === 0) {
    console.log(`recipe not found with slug ${slug}`);
    notFound();
  }
  return <RenderRecipe recipe={recipe[0]} />;
}

export default withPageAuthRequired(OuterRecipe, { returnTo: "/" });
