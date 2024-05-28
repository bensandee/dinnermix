import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { requireSessionUser } from "@/lib/auth";
import { selectUserSchema } from "@/lib/db/schema";
import { z } from "zod";
import Link from "next/link";

// convert lastLogin in user profile to a string
const adaptedLastLogin = z.object({ lastLogin: z.coerce.string() });
const adaptedUser = selectUserSchema.merge(adaptedLastLogin);

/** demonstrate display of SSR-side profile data */
async function Page() {
  const sessionUser = await requireSessionUser();
  const { name, ...rest } = adaptedUser.parse(sessionUser);
  return (
    <>
      <div>
        Hello {name}. <br />
        Your profile data is: {JSON.stringify(rest)}
      </div>
      <Link className="btn btn-secondary text-xl" href="/api/auth/logout">
        Logout
      </Link>
    </>
  );
}

export default withPageAuthRequired(Page, { returnTo: "/" });
