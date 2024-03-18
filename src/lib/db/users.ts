import { userSchema } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { database } from "@/lib/db";

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

export const updateUserLastLogin = async ({ userId }: { userId: number }) => {
  await database
    .update(userSchema)
    .set({ lastLogin: new Date() })
    .where(eq(userSchema.id, userId));
};
