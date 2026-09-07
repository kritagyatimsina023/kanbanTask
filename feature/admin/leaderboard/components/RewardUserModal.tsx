"use client";

import { X, Award } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { rewardState, rewardUser } from "../leaderboard.action";

type RewardUser = {
  id: string;
  email: string;
};
interface RewardUserModalProps {
  user: RewardUser | null;
  onClose: () => void;
}
const initialState: rewardState = {
  error: null,
  success: false,
};
export default function RewardUserModal({
  user,
  onClose,
}: RewardUserModalProps) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [state, fromAction, pending] = useActionState(rewardUser, initialState);
  useEffect(() => {
    if (state.success) {
      toast.success(state.message || "Reward granted to user");
      onClose();
    }
    if (state.error) {
      toast.error(state.error);
    }
  }, [state, onClose]);
  if (!user) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6! py-4!">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <Award size={18} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Reward User
              </h2>

              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>
        <form action={fromAction} className="space-y-4 px-6! py-5!">
          <input type="hidden" value={user.id} name="userId" />
          <div>
            <label
              htmlFor="reward-title"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Reward Title
            </label>
            <input
              id="reward-title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Outstanding Performance"
              disabled={pending}
              className="w-full rounded-lg border border-gray-200 px-3! py-2.5! text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div>
            <label
              htmlFor="reward-message"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Message
              <span className="ml-1 text-xs font-normal text-gray-400">
                (optional)
              </span>
            </label>
            <textarea
              id="reward-message"
              value={message}
              name="message"
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Great work completing so many tasks!"
              rows={4}
              disabled={pending}
              className="w-full resize-none rounded-lg border border-gray-200 px-3! py-2.5! text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="rounded-lg px-4! py-2! text-sm font-medium text-gray-600 transition hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4! py-2! text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Award size={15} />

              {pending ? "Awarding..." : "Give Reward"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
