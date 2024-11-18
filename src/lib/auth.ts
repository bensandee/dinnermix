import { auth0 } from "./auth0";
import { createUser, getUser, updateUserLastLogin } from "./db/users";

/** return the email address of the session */
export const getSessionEmail = async () => {
  const session = await auth0.getSession();
  if (session == null) {
    return undefined;
  }
  const { email } = session.user;
  return `${email}`;
};

export const getSessionName = async () => {
  const session = await auth0.getSession();
  if (session == null) {
    return undefined;
  }
  const { nickname } = session.user;
  return `${nickname}`;
};

/** return the user record of the session */
export const getSessionUser = async () => {
  const email = await getSessionEmail();
  if (email == null) {
    return undefined;
  }
  let user = await getUser({ email });
  if (!user) {
    console.log(`missing user record for ${email}, creating now`);
    const name = (await getSessionName()) ?? email;
    user = await createUser({ email, name });
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
