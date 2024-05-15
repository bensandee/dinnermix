import { userSchema } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { database } from "@/lib/db";

/** lookup user by email */
export const getUser = async ({ email }: { email: string }) => {
  const users = await database
    .select()
    .from(userSchema)
    .where(eq(userSchema.email, email));
  if (users.length === 0) {
    return undefined;
  }
  return users[0];
};

/** create a new user with the supplied email and name */
export const createUser = async ({
  email,
  name,
}: {
  email: string;
  name: string;
}) => {
  const user = await database
    .insert(userSchema)
    .values({ email, name, lastLogin: new Date() })
    .execute();
  return user;
};

/** bump the last login timestamp */
export const updateUserLastLogin = async ({ userId }: { userId: number }) => {
  await database
    .update(userSchema)
    .set({ lastLogin: new Date() })
    .where(eq(userSchema.id, userId));
};
