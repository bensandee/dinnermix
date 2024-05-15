"use client";

import { Button } from "@/components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  let body;
  if (user) {
    body = <Body />;
  } else {
    body = <UnauthenticatedBody />;
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl text-green-800">DinnerMix</h1>
      {body}
    </main>
  );
}

const Body = () => {
  const router = useRouter();

  const goAddRecipe = () => {
    router.push("/recipes/add");
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <a className="btn btn-ghost text-xl" href="/profile">
          Profile
        </a>
        <a className="btn btn-ghost text-xl" href="/api/auth/logout">
          Logout
        </a>
        <a className="btn btn-ghost text-xl" href="/recipes">
          Recipes
        </a>
      </div>
      <div>
        <Button className="btn btn-primary p-4" onClick={goAddRecipe}>
          Add Recipe
        </Button>
      </div>
    </>
  );
};

const UnauthenticatedBody = () => {
  const router = useRouter();

  const goLogin = () => {
    router.push("/api/auth/login");
  };
  return (
    <div className="p-24">
      <Button className="btn-primary p-4" onClick={goLogin}>
        Login
      </Button>
    </div>
  );
};
