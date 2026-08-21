import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Nav from "./layout/Nav";

export const metadata: Metadata = {
  title: "Kanban Task Board",
  description: "Full-Stack Kanban Task Board",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
