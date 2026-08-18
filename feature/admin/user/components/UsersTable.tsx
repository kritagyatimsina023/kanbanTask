"use client";

import { Ban, CheckCircle2, Shield, UserRound } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import BanUserModal from "./BanUserModal";
import { toggleBanUser } from "../user.action";

type User = {
  id: string;
  email: string;
  role: string;
  status: string;
  createdAt: Date;
  totalTasks: number;
  todo: number;
  inProgress: number;
  completed: number;
};

interface UsersTableProps {
  users: User[];
}

export default function UsersTable({ users }: UsersTableProps) {
  const router = useRouter();

  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    email: string;
  } | null>(null);

  const [isPending, startTransition] = useTransition();

  const handleUserAction = (user: User) => {
    if (user.status === "ACTIVE") {
      setSelectedUser({
        id: user.id,
        email: user.email,
      });

      return;
    }
    startTransition(async () => {
      try {
        await toggleBanUser(user.id);
        router.refresh();
      } catch (error) {
        console.error("Failed to unban user:", error);
      }
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-6! py-4!">
        <div>
          <h2 className="text-base font-semibold text-gray-900">All Users</h2>

          <p className="mt-1! text-sm text-gray-500">
            {users.length} registered users
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <UserRound size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6! py-3! text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                User
              </th>

              <th className="px-4! py-3! text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Role
              </th>

              <th className="px-4! py-3! text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                To Do
              </th>

              <th className="px-4! py-3! text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                In Progress
              </th>

              <th className="px-4! py-3! text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                Completed
              </th>

              <th className="px-4! py-3! text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
              </th>

              <th className="px-6! py-3! text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y! divide-gray-100">
            {users.map((user) => (
              <tr
                key={user.id}
                className="transition-colors hover:bg-gray-50/70"
              >
                <td className="px-6! py-4!">
                  <div className="flex items-center gap-3!">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
                      {user.email.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user.email}
                      </p>

                      <p className="mt-0.5! text-xs text-gray-400">
                        {user.totalTasks} total tasks
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4! py-4!">
                  {user.role === "ADMIN" ? (
                    <span className="inline-flex items-center gap-1.5! rounded-full bg-indigo-50 px-2.5! py-1! text-xs font-semibold text-indigo-600">
                      <Shield size={12} />
                      Admin
                    </span>
                  ) : (
                    <span className="rounded-full bg-gray-100 px-2.5! py-1! text-xs font-semibold text-gray-600">
                      Member
                    </span>
                  )}
                </td>

                <td className="px-4! py-4! text-center">
                  <span className="font-semibold text-gray-700">
                    {user.todo}
                  </span>
                </td>

                <td className="px-4! py-4! text-center">
                  <span className="font-semibold text-yellow-600">
                    {user.inProgress}
                  </span>
                </td>

                <td className="px-4! py-4! text-center">
                  <span className="font-semibold text-green-600">
                    {user.completed}
                  </span>
                </td>

                <td className="px-4! py-4! text-center">
                  {user.status === "ACTIVE" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5! py-1! text-xs font-semibold text-green-600">
                      <CheckCircle2 size={12} />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5! py-1! text-xs font-semibold text-red-600">
                      <Ban size={12} />
                      Banned
                    </span>
                  )}
                </td>

                <td className="px-6! py-4! text-right">
                  {user.role !== "ADMIN" && (
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleUserAction(user)}
                      className={`inline-flex items-center gap-2 rounded-lg px-3! py-2! text-sm font-medium transition ${
                        user.status === "ACTIVE"
                          ? "text-red-600 hover:bg-red-50"
                          : "text-green-600 hover:bg-green-50"
                      } disabled:cursor-not-allowed disabled:opacity-50`}
                    >
                      {user.status === "ACTIVE" ? (
                        <>
                          <Ban size={15} />
                          Ban
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={15} />

                          {isPending ? "Unbanning..." : "Unban"}
                        </>
                      )}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BanUserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
}
