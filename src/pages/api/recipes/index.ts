import type { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { getSessionUser } from "@/lib/auth";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import {
  selectRecipeSchema,
  recipeSchema,
  insertRecipeSchema,
} from "@/lib/db/schema";
import { database } from "@/lib/db";

export default withApiAuthRequired(handler);

// we don't expose id, only slugs
const GetSchema = selectRecipeSchema.omit({ id: true }).array();
type GetSchemaType = z.infer<typeof GetSchema>;

const PostSchema = insertRecipeSchema;

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetSchemaType>,
) {
  const user = await getSessionUser(req, res);
  if (user === undefined) {
    res.status(StatusCodes.UNAUTHORIZED);
    return;
  }

  switch (req.method) {
    case "GET": {
      const selectedRecipes = await database.select().from(recipeSchema);
      const parsed = GetSchema.parse(selectedRecipes);
      res.send(parsed);
      break;
    }
    case "POST": {
      const slug = req.body.slug ?? "auto-slug";
      const newRecipe = { ...req.body, userId: user.id, slug };
      console.log(JSON.stringify(newRecipe));
      const parsed = PostSchema.safeParse(newRecipe);
      if (parsed.success) {
        const response = await database
          .insert(recipeSchema)
          .values(parsed.data)
          .execute();
        res.status(StatusCodes.CREATED).end(JSON.stringify(response));
      } else {
        res.status(StatusCodes.BAD_REQUEST).end(parsed.error);
      }
      break;
    }
    default: {
      res.status(StatusCodes.METHOD_NOT_ALLOWED);
      break;
    }
  }
}
