"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/actions/auth.action";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="group w-full flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-500 transition-all hover:bg-red-50 hover:text-red-600 active:scale-95 sm:w-auto sm:px-3! sm:gap-2!"
      title="Logout"
    >
      <LogOut
        size={16}
        className="transition-transform group-hover:scale-110"
      />

      <span className="hidden text-sm font-medium sm:block">Logout</span>
    </button>
  );
}
