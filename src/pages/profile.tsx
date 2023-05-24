import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { InferGetServerSidePropsType } from "next";
import { requireSessionUser } from "@/lib/auth";

/** demonstrate display of SSR-side profile data */
export default function Profile({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { name, ...rest } = user;
  return (
    <div>
      Hello {name} and {JSON.stringify(rest)}
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const user = await requireSessionUser(req, res);
    return { props: { user } };
  },
});
