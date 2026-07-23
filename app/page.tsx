import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import KanbanBoard from "../components/KanbanBoard";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const tasks = await prisma.task.findMany({
    include: {
      assignee: {
        select: { id: true, email: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  const members = await prisma.user.findMany({
    select: { id: true, email: true, role: true },
    orderBy: { email: "asc" },
  });
  return (
    <div>
      <KanbanBoard initialTasks={tasks} members={members} session={session} />
    </div>
  );
}
