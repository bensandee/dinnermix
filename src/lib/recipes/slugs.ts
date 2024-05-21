import { getRecipeCountBySlug } from "@/lib/db/recipes";
import { slugify } from "@/lib/slugify";

export const getRecipeSlug = async ({
  slug,
  recipeName,
}: {
  slug?: string;
  recipeName: string;
}) => {
  // auto-generate slug if not provided
  if (slug === undefined) {
    slug = slugify(recipeName);
  }

  // ensure slug is unique
  let iteration = 0;
  while ((await getRecipeCountBySlug({ slug })) > 0) {
    iteration++;
    slug = slugify(recipeName, iteration);
  }
  return slug;
};
