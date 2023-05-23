import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>DinnerMix</h1>
      <div>
        <Link href="/api/auth/login">Login</Link>
      </div>
      <div>
        <Link href="/api/auth/logout">Logout</Link>
      </div>
    </main>
  );
}
