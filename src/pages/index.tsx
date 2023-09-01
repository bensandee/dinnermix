import { Button } from "@/components";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;

  const goAddRecipe = async () => {
    await router.push("/recipes/add");
  };

  let body;
  if (user) {
    body = (
      <>
        <div className="p-8">
          <Link className="p-8 hover:text-blue-500" href="/profile">
            Profile
          </Link>
          <Link className="p-8 hover:text-blue-500" href="/api/auth/logout">
            Logout
          </Link>
          <Link className="p-8 hover:text-blue-500" href="/recipes">
            Recipes
          </Link>
        </div>
        <div>
          <Button onClick={goAddRecipe}>Add Recipe</Button>
        </div>
      </>
    );
  } else {
    body = (
      <>
        <div className="p-24">
          <Link href="/api/auth/login">Login</Link>
        </div>
      </>
    );
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl text-green-800">DinnerMix</h1>
      {body}
    </main>
  );
}
