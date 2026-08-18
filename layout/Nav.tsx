import { getSession } from "@/lib/auth";
import { LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";

import { logoutAction } from "../app/actions/auth.action";

const Nav = async () => {
  const session = await getSession();

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-gray-900"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-white">
            <LayoutDashboard size={19} />
          </div>
          <span>Kanban Board</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-200"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
          {session && (
            <>
              <div className="hidden items-center border-l border-gray-200 pl-4 sm:flex">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {session.email}
                  </p>

                  <p className="text-xs font-medium text-gray-500">
                    {session.role}
                  </p>
                </div>
              </div>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={16} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
