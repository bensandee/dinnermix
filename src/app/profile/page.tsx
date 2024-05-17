import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { requireSessionUser } from "@/lib/auth";
import { selectUserSchema } from "@/lib/db/schema";
import { z } from "zod";

// convert lastLogin in user profile to a string
const adaptedLastLogin = z.object({ lastLogin: z.coerce.string() });
const adaptedUser = selectUserSchema.merge(adaptedLastLogin);

/** demonstrate display of SSR-side profile data */
async function Page() {
  const sessionUser = await requireSessionUser();
  const { name, ...rest } = adaptedUser.parse(sessionUser);
  return (
    <div>
      Hello {name} and {JSON.stringify(rest, null, 2)}
    </div>
  );
}

export default withPageAuthRequired(Page, { returnTo: "/" });
