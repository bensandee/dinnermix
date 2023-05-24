import { RecipeSchema } from "@/models/Recipe";
import type { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { dbConnect } from "@/lib/dbConnect";
import { RecipeModel } from "@/models/Recipe";
import { StatusCodes } from "http-status-codes";
import { getSessionUser } from "@/lib/auth";

const getSchema = RecipeSchema.omit({ id: true });
const putSchema = getSchema.omit({ user: true });

async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  const user = await getSessionUser(req, res);
  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED);
    return;
  }

  const { slug } = req.query;
  if (slug == null) {
    res.status(StatusCodes.BAD_REQUEST);
    return;
  }
  await dbConnect();
  switch (req.method) {
    case "GET": {
      const recipe = RecipeModel.find({ slug, id: user.id });
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
        const updateResult = await RecipeModel.updateOne(
          { slug, id: user.id },
          parsed.data
        );
        if (updateResult.modifiedCount === 0) {
          res.status(StatusCodes.NOT_FOUND);
        } else {
          res.status(StatusCodes.NO_CONTENT);
        }
      }
      break;
    }
    case "DELETE": {
      // fixme delete recipes from user record
      const deleteResult = await RecipeModel.deleteOne({ slug, id: user.id });
      if (deleteResult.deletedCount === 0) {
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

export default withApiAuthRequired(handler);
