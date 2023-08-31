import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { InferGetServerSidePropsType } from "next";
import { requireSessionUser } from "@/lib/auth";
import { selectUserSchema } from "@/lib/db/schema";
import { z } from "zod";

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
    const parsed = adaptedUser.parse(profile);
    return { props: { profile: parsed } };
  },
});
