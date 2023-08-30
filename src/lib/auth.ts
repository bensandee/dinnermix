import { getSession } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingMessage, ServerResponse } from "http";
import { userSchema } from "./schema";
import { eq } from "drizzle-orm";
import { drizzleConnection } from "./drizzle";

/** return the email address of the session */
export const getSessionEmail = async (
  req: NextApiRequest | IncomingMessage,
  res: NextApiResponse | ServerResponse<IncomingMessage>,
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
  res: NextApiResponse | ServerResponse<IncomingMessage>,
) => {
  const email = await getSessionEmail(req, res);
  if (email == null) {
    return undefined;
  }
  const dbUser = await drizzleConnection
    .select()
    .from(userSchema)
    .where(eq(userSchema.email, email));
  if (dbUser.length === 0) {
    console.log(`missing user record for ${email}`);
    return undefined;
  }
  return dbUser[0];
};

export const requireSessionUser = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
) => {
  const user = await getSessionUser(req, res);
  if (!user) {
    res.statusCode = 401;
    res.end();
    throw new Error("Unauthorized");
  }
  return user;
};
