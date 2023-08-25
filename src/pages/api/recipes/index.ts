import { RecipeModel, RecipeSchema } from "@/models/Recipe";
import type { NextApiRequest, NextApiResponse } from "next";

import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { dbConnect } from "@/lib/dbConnect";
import { getSessionUser } from "@/lib/auth";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export default withApiAuthRequired(handler);

// we don't expose id, only slugs
const GetSchema = RecipeSchema.omit({ id: true }).array();
type GetSchemaType = z.infer<typeof GetSchema>;

// omit id, make slug optional because we can generate it
const PostSchema = RecipeSchema.omit({ id: true }).merge(
  z.object({ slug: z.string().optional() })
);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetSchemaType>
) {
  const user = await getSessionUser(req, res);
  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED);
    return;
  }

  await dbConnect();
  switch (req.method) {
    case "GET": {
      const recipes = await RecipeModel.find({});
      const parsed = GetSchema.parse(recipes);
      res.send(parsed);
      break;
    }
    case "POST": {
      const parsed = PostSchema.safeParse(req.body);
      if (parsed.success) {
        await RecipeModel.create(parsed.data);
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
