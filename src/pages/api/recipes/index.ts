import type { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { getSessionUser } from "@/lib/auth";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import {
  selectRecipeSchema,
  recipeSchema,
  insertRecipeSchema,
} from "@/lib/schema";
import { drizzleConnection } from "@/lib/drizzle";

export default withApiAuthRequired(handler);

// we don't expose id, only slugs
const GetSchema = selectRecipeSchema.omit({ id: true }).array();
type GetSchemaType = z.infer<typeof GetSchema>;

// omit id, make slug optional because we can generate it
const PostSchema = insertRecipeSchema;
// .merge(
//   z.object({ slug: z.string().optional() }),
// );

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
      const selectedRecipes = await drizzleConnection
        .select()
        .from(recipeSchema);
      const parsed = GetSchema.parse(selectedRecipes);
      res.send(parsed);
      break;
    }
    case "POST": {
      if (req.body.slug === undefined) {
        req.body.slug = ""; // TODO Generate
      }
      const parsed = PostSchema.safeParse(req.body);
      if (parsed.success) {
        await drizzleConnection
          .insert(recipeSchema)
          .values(parsed.data)
          .execute();
        return res.status(StatusCodes.CREATED);
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
