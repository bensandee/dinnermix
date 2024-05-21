import { userSchema } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { database } from "@/lib/db";
import "server-only";

/** lookup user by email */
export const getUser = async ({ email }: { email: string }) => {
  const users = await database
    .select()
    .from(userSchema)
    .where(eq(userSchema.email, email));
  if (users.length === 0) {
    return undefined;
  }
  if (users.length > 1) {
    throw new Error(`multiple users found for email ${email}`);
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
    .returning();
  if (user.length !== 1) {
    throw new Error(`failed to create user ${email}`);
  }
  return user[0];
};

/** bump the last login timestamp */
export const updateUserLastLogin = async ({ userId }: { userId: number }) => {
  await database
    .update(userSchema)
    .set({ lastLogin: new Date() })
    .where(eq(userSchema.id, userId));
};
