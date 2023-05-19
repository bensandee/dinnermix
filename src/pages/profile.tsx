import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { InferGetServerSidePropsType } from "next";
import { dbConnect } from "@/lib/dbConnect";
import { userModel, schema as userSchema } from "@/models/User";

/** demonstrate display of SSR-side profile data */
export default function Profile({
  user,
  extraUserData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      Hello {user.name} and {JSON.stringify(extraUserData)}
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    // extra session from auth0
    const session = await getSession(req, res);
    const email = session?.user?.email;

    // get related profile data from mongodb
    await dbConnect();
    const extraUserData = await userModel.findOne({ email }).lean().exec();

    return { props: { extraUserData: userSchema.parse(extraUserData) } };
  },
});
