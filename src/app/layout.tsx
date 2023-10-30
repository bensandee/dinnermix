import { ReactNode } from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DinnerMix",
  description: "A recipe sharing app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <UserProvider>
        <body>{children}</body>
      </UserProvider>
    </html>
  );
}
