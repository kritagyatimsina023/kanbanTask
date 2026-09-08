import Link from "next/link";
import { KanbanSquare } from "lucide-react";
import { getSession } from "@/lib/auth";
import { Notification } from "../types/notification";
import { notificationService } from "@/feature/notification/notification.service";
import NotificationBell from "@/feature/notification/components/NotificationBell";
import { leaderBoardService } from "@/feature/admin/leaderboard/leaderboard.service";
import RewardBell from "@/feature/member/_components/RewardBell";
import { RewardSummary } from "../types/Reward";
import LogoutButton from "@/components/LogoutButton";
import { Role } from "@/generated/prisma/enums";
import NavigationProfile from "./NavigationProfile";
import ScrollNav from "./ScrollNav";

const Nav = async () => {
  const session = await getSession();
  let notifications: Notification[] = [];
  let rewards: RewardSummary[] = [];
  if (session) {
    notifications = await notificationService.getUserNotifications(session.id);
    const leaderboardData = await leaderBoardService.getUserLeaderboardData(
      session.id,
    );
    rewards = leaderboardData?.rewards ?? [];
  }
  const roleLink = session?.role === Role.ADMIN ? "/admin" : "/member";
  return (
    <ScrollNav>
      <nav className="sticky top-0 z-40 border-b border-gray-200/60 bg-white/70 backdrop-blur-xl transition-all">
        <div className=" flex h-16 items-center max-w-7xl! mx-auto!  justify-between px-4! sm:px-6! lg:px-8!">
          <Link
            href="/"
            className="group flex items-center gap-3! transition-transform active:scale-95"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200 transition-all group-hover:shadow-lg group-hover:shadow-indigo-300">
              <KanbanSquare size={20} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[16px] font-bold tracking-tight text-gray-900">
                Kanban
              </span>
              <span className="text-[11px] font-semibold text-indigo-500 uppercase tracking-wider">
                Workspace
              </span>
            </div>
          </Link>
          {session && (
            <>
              <div className="flex items-center gap-3! sm:gap-4">
                <div className="mx-1! hidden h-6 w-[1px] bg-gray-200 sm:block" />
                <div className="flex items-center gap-3 rounded-full border border-gray-200/80 bg-white/60 p-1! pr-4! shadow-sm transition-all hover:bg-white hover:shadow-md">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-sm font-bold text-white shadow-inner">
                    {session.email.charAt(0).toUpperCase()}
                  </div>
                  <NavigationProfile
                    roleLink={roleLink}
                    email={session.email}
                    role={session.role}
                  />
                  <NotificationBell
                    userId={session.id}
                    notifications={notifications}
                    role={session.role}
                  />
                  {session.role === Role.MEMBER && (
                    <RewardBell rewards={rewards} />
                  )}
                </div>
                <LogoutButton />
              </div>
            </>
          )}
        </div>
      </nav>
    </ScrollNav>
  );
};

export default Nav;
