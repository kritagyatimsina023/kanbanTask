"use client";

import { X, Ban } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toggleBanUser } from "../user.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BanUserModalProps {
  user: {
    id: string;
    email: string;
  } | null;

  onClose: () => void;
}

const initialState = {
  success: false,
  error: null,
  message: "",
};

export default function BanUserModal({ user, onClose }: BanUserModalProps) {
  const router = useRouter();
  const [reason, setReason] = useState("");
  const [state, formAction, isPending] = useActionState(
    toggleBanUser,
    initialState,
  );
  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [state, onClose, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4!">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-gray-100 px-6! py-5!">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <Ban size={19} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Ban User
              </h2>

              <p className="mt-1! text-sm text-gray-500">
                This action will prevent the user from accessing the
                application.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5! text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        </div>
        <form action={formAction}>
          <input type="hidden" name="userId" value={user.id} />
          <input type="hidden" name="action" value={"unban"} />
          <div className="px-6! py-5!">
            <div className="mb-5! rounded-lg border border-gray-200 bg-gray-50 p-3!">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                User
              </p>

              <p className="mt-1! text-sm font-semibold text-gray-800">
                {user.email}
              </p>
            </div>

            <div>
              <label
                htmlFor="ban-reason"
                className="mb-2! block text-sm font-medium text-gray-700"
              >
                Reason for banning
              </label>
              <textarea
                id="ban-reason"
                name="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter the reason for banning this user..."
                rows={4}
                disabled={isPending}
                maxLength={500}
                className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3! py-2.5! text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-100 disabled:bg-gray-50"
              />
              <div className="mt-1.5! flex justify-between">
                <p className="text-xs text-gray-400">
                  This reason will be stored with the user&apos;s account.
                </p>
                <span className="text-xs text-gray-400">
                  {reason.length}/500
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50/50 px-6! py-4!">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="rounded-lg border border-gray-200 bg-white px-4! py-2! text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4! py-2! text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Ban size={15} />
              {isPending ? "Banning..." : "Ban User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
