import { getSession } from "@auth0/nextjs-auth0";
import { database } from "./db";
import { userSchema } from "./db/schema";
import { eq } from "drizzle-orm";

/** return the email address of the session */
export const getSessionEmail = async () => {
  const session = await getSession();
  if (session == null) {
    return undefined;
  }
  const { email } = session.user;
  return `${email}`;
};

/** return the user record of the session */
export const getSessionUser = async () => {
  const email = await getSessionEmail();
  if (email == null) {
    return undefined;
  }
  const dbUser = await database
    .select()
    .from(userSchema)
    .where(eq(userSchema.email, email));
  if (dbUser.length === 0) {
    console.log(`missing user record for ${email}`);
    return undefined;
  } else {
    console.log("updating last login date");
    await database
      .update(userSchema)
      .set({ lastLogin: new Date() })
      .where(eq(userSchema.id, dbUser[0].id));
  }
  return dbUser[0];
};

export const requireSessionUser = async () => {
  const user = await getSessionUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
};
