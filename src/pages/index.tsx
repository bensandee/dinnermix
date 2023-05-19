export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>DinnerMix</h1>
      <div>
        <a href="/api/auth/login">Login</a>
      </div>
      <div>
        <a href="/api/auth/logout">Logout</a>
      </div>
    </main>
  );
}
