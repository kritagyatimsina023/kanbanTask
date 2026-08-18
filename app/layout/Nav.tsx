import Link from "next/link";
import { LayoutDashboard, KanbanSquare, LogOut } from "lucide-react";
import { logoutAction } from "../actions/auth.action";
import { getSession } from "@/lib/auth";

const Nav = async () => {
  const session = await getSession();
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/70 backdrop-blur-xl transition-all">
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
          <div className="flex items-center gap-3! sm:gap-4">
            {session.role === "ADMIN" && (
              <Link
                href="/admin"
                className="group relative flex h-9! items-center gap-2 overflow-hidden rounded-lg bg-gray-900 px-4! text-sm font-medium text-white shadow-sm transition-all hover:bg-gray-800 hover:shadow-md active:scale-95"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <LayoutDashboard
                  size={16}
                  className="text-gray-300 transition-colors group-hover:text-white"
                />
                <span>Admin Panel</span>
              </Link>
            )}

            <div className="mx-1 hidden h-6 w-[1px] bg-gray-200 sm:block" />

            <div className="flex items-center gap-3 rounded-full border border-gray-200/80 bg-white/60 p-1! pr-4! shadow-sm transition-all hover:bg-white hover:shadow-md">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-sm font-bold text-white shadow-inner">
                {session.email.charAt(0).toUpperCase()}
              </div>
              <div className="hidden flex-col justify-center sm:flex">
                <span className="max-w-[120px] truncate text-xs font-semibold text-gray-700">
                  {session.email.split("@")[0]}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                  {session.role}
                </span>
              </div>
            </div>

            <form action={logoutAction}>
              <button
                type="submit"
                className="group flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-500 transition-all hover:bg-red-50 hover:text-red-600 active:scale-95 sm:w-auto sm:px-3! sm:gap-2!"
                title="Logout"
              >
                <LogOut
                  size={16}
                  className="transition-transform group-hover:scale-110"
                />
                <span className="hidden text-sm font-medium sm:block">
                  Logout
                </span>
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
