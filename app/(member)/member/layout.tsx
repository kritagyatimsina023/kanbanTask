import { NextRequest, NextResponse } from "next/server";
import Nav from "../../layout/Nav";
import { jwtVerify } from "jose";
import { Role } from "@/generated/prisma/enums";
import MemberSidebar from "@/components/MemberSidebar";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        <MemberSidebar />
        <main className="flex-1 pl-64!">
          <div className="container mx-auto p-8!">{children}</div>
        </main>
      </div>
    </>
  );
}
