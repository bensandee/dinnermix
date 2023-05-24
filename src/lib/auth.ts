import { getSession } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "./dbConnect";
import { UserModel } from "@/models/User";
import { UserSchema } from "@/models/User";
import { IncomingMessage, ServerResponse } from "http";

/** return the email address of the session */
export const getSessionEmail = async (
  req: NextApiRequest | IncomingMessage,
  res: NextApiResponse | ServerResponse<IncomingMessage>
) => {
  const session = await getSession(req, res);
  if (session == null) {
    return undefined;
  }
  const { email } = session.user;
  return `${email}`;
};

/** return the user record of the session */
export const getSessionUser = async (
  req: NextApiRequest | IncomingMessage,
  res: NextApiResponse | ServerResponse<IncomingMessage>
) => {
  const email = await getSessionEmail(req, res);
  if (email == null) {
    return undefined;
  }
  await dbConnect();
  const dbUser = await UserModel.findOne({ email });
  if (dbUser == null) {
    return undefined;
  }
  return UserSchema.parse(dbUser);
};

export const requireSessionUser = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const user = await getSessionUser(req, res);
  if (!user) {
    res.statusCode = 401;
    res.end();
    throw new Error("Unauthorized");
  }
  return user;
};
