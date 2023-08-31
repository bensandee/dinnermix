import type { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { StatusCodes } from "http-status-codes";
import { getSessionUser } from "@/lib/auth";
import { recipeSchema, selectRecipeSchema } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { slugFromRequest } from "@/lib/slugify";
import { database } from "@/lib/db";

const getSchema = selectRecipeSchema.omit({ id: true });
const putSchema = getSchema.omit({ userId: true });

export default withApiAuthRequired(handler);

async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  const user = await getSessionUser(req, res);
  if (user === undefined) {
    res.status(StatusCodes.UNAUTHORIZED);
    return;
  }

  const slug = slugFromRequest(req);
  if (slug === undefined) {
    res.status(StatusCodes.BAD_REQUEST);
    return;
  }
  const where = and(eq(recipeSchema.slug, slug), eq(recipeSchema.id, user.id));
  switch (req.method) {
    case "GET": {
      const recipe = database.select().from(recipeSchema).where(where);
      if (recipe === null) {
        res.status(StatusCodes.NOT_FOUND);
        return;
      }
      break;
    }
    case "PUT": {
      const parsed = putSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(StatusCodes.BAD_REQUEST).end(parsed.error);
      } else {
        // FIXME look for slug duplicates
        const updateResult = await database
          .update(recipeSchema)
          .set(parsed.data)
          .where(where);
        if (updateResult.length === 0) {
          res.status(StatusCodes.NOT_FOUND);
        } else {
          res.status(StatusCodes.NO_CONTENT);
        }
      }
      break;
    }
    case "DELETE": {
      // FIXME delete recipes from user record?
      const deleteResult = await database.delete(recipeSchema).where(where);
      if (deleteResult.length === 0) {
        res.status(StatusCodes.NOT_FOUND);
      } else {
        res.status(StatusCodes.NO_CONTENT);
      }
      break;
    }
    default: {
      res.status(StatusCodes.METHOD_NOT_ALLOWED);
    }
  }
}
