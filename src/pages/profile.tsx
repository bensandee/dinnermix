import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { InferGetServerSidePropsType } from "next";
import { requireSessionUser } from "@/lib/auth";
import { selectUserSchema } from "@/lib/db/schema";
import { z } from "zod";

// convert lastLogin in user profile to a string
const adaptedLastLogin = z.object({ lastLogin: z.coerce.string() });
const adaptedUser = selectUserSchema.merge(adaptedLastLogin);

/** demonstrate display of SSR-side profile data */
export default function Profile({
  profile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { name, ...rest } = profile;
  return (
    <div>
      Hello {name} and {JSON.stringify(rest, null, 2)}
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const profile = await requireSessionUser(req, res);
    return { props: { profile: adaptedUser.parse(profile) } };
  },
});
