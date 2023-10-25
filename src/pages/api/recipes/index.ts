import type { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { requireSessionUser } from "@/lib/auth";
import { StatusCodes } from "http-status-codes";
import {
  selectRecipeSchema,
  recipeSchema,
  insertRecipeSchema,
} from "@/lib/db/schema";
import { database } from "@/lib/db";
import { z } from "zod";
import { slugify } from "@/lib/slugify";
import { eq, sql } from "drizzle-orm";

export default withApiAuthRequired(handler);

// we don't expose id, only slugs
const GetSchema = selectRecipeSchema.omit({ id: true }).array();
type GetSchemaType = z.infer<typeof GetSchema>;

const PostSchema = insertRecipeSchema.merge(
  insertRecipeSchema.pick({ slug: true }).partial(),
);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetSchemaType | string>,
) {
  const user = await requireSessionUser(req, res);
  switch (req.method) {
    case "GET": {
      const selectedRecipes = await database.select().from(recipeSchema);
      const parsed = GetSchema.parse(selectedRecipes);
      res.send(parsed);
      break;
    }
    case "POST": {
      const newRecipe = { ...req.body, userId: user.id };
      const parsed = PostSchema.safeParse(newRecipe);
      if (parsed.success) {
        let { slug, ...rest } = parsed.data;
        if (slug === undefined) {
          slug = slugify(rest.name);
          var iteration = 0;
          while (
            (
              await database
                .select({ count: sql<number>`count(*)` })
                .from(recipeSchema)
                .where(eq(recipeSchema.slug, slug))
                .execute()
            )[0].count > 0
          ) {
            slug = slugify(rest.name, iteration);
          }
        }
        const modifiedObject = { ...rest, slug };
        await database.insert(recipeSchema).values(modifiedObject).execute();
        res.status(StatusCodes.CREATED).send("created");
      } else {
        res.status(StatusCodes.BAD_REQUEST).send("error");
      }
      break;
    }
    default: {
      res.status(StatusCodes.METHOD_NOT_ALLOWED).send("error");
      break;
    }
  }
}
