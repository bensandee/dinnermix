import { ReactNode } from "react";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DinnerMix",
  description: "A recipe sharing app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="flex justify-center w-full">{children}</body>
    </html>
  );
}
