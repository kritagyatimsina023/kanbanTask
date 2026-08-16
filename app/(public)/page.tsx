import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import KanbanBoard from "@/components/KanbanBoard";
import { getUserLeaderboardData } from "@/lib/leaderboard";

export default async function DashboardPage() {
  const session = await requireAuth();

  if (!session) return null;

  const tasks = await prisma.task.findMany({
    include: {
      assignee: {
        select: {
          id: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const members = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
    },
    orderBy: {
      email: "asc",
    },
  });

  const leaderboardData =
    session.role === "MEMBER" ? await getUserLeaderboardData(session.id) : null;

  return (
    <div>
      <KanbanBoard
        initialTasks={tasks}
        members={members}
        currentUser={{
          id: session.id,
          role: session.role,
        }}
        leaderboardData={leaderboardData}
      />
    </div>
  );
}
