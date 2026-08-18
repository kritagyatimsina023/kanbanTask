"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  KanbanSquare,
  Crown,
} from "lucide-react";
import { logoutAction } from "@/app/actions/auth.action";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "LeaderBoards",
    href: "/admin/leaderboards",
    icon: Crown,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white pt-5! pb-4!">
      <div className="flex flex-shrink-0 items-center px-6!">
        <Link
          href="/"
          className="group flex items-center gap-2 text-lg font-bold text-gray-900"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200 transition-all group-hover:shadow-lg group-hover:shadow-indigo-300">
            <KanbanSquare size={20} strokeWidth={2.5} />
          </div>

          <span>Admin</span>
        </Link>
      </div>

      <div className="mt-8! flex flex-1 flex-col overflow-y-auto px-4!">
        <nav className="flex-1 space-y-4!">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-lg px-3! py-2! text-sm font-medium transition-all ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon
                  size={18}
                  className={
                    isActive
                      ? "text-indigo-600"
                      : "text-gray-500 group-hover:text-gray-900"
                  }
                />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-gray-200 p-4!">
        <form action={logoutAction}>
          <button
            type="submit"
            className="group flex w-full items-center gap-3 rounded-lg px-3! py-2! text-sm font-medium text-red-600 transition hover:bg-red-50 hover:text-red-700"
          >
            <LogOut
              size={18}
              className="text-red-500 group-hover:text-red-600"
            />
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
