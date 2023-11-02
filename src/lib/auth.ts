import { getSession } from "@auth0/nextjs-auth0";
import { getUser, updateUserLastLogin } from "./db/users";

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
  const user = await getUser({ email });
  if (!user) {
    console.log(`missing user record for ${email}`);
    return undefined;
  } else {
    console.log("updating last login date");
    await updateUserLastLogin({ userId: user.id });
  }
  return user;
};

export const requireSessionUser = async () => {
  const user = await getSessionUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
};
