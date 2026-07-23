import type { Metadata } from "next";
import "./globals.css";
import { getSession } from "@/lib/auth";
import { logoutAction } from "./actions/auth";
import { LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import Nav from "../layout/Nav";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Kanban Task Board",
  description: "Full-Stack Kanban Task Board",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="en">
      <body>
        <Nav />
        <Toaster />
        <main className="main-content">
          <div className="container">{children}</div>
        </main>
      </body>
    </html>
  );
}
