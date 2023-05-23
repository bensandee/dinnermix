import { getSession } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "./dbConnect";
import { UserModel } from "@/models/User";

/** return the email address of the session */
export const getSessionEmail = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession(req, res);
  if (session == null) {
    return undefined;
  }
  const { email } = session.user;
  return `${email}`;
};

/** return the user id of the session */
export const getSessionUid = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const email = await getSessionEmail(req, res);
  if (email == null) {
    return undefined;
  }
  await dbConnect();
  const user = await UserModel.findOne({ email });
  if (user == null) {
    return undefined;
  }
  return `${user.id}`;
};
