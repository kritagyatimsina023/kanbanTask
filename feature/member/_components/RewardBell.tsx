"use client";

import Tooltip from "@/components/Tooltip";
import { formatNepalDate } from "@/lib/helper";
import { Award, X } from "lucide-react";
import { useState } from "react";

type Reward = {
  id: string;
  title: string;
  message: string | null;
  createdAt: Date;
};

type Props = {
  rewards: Reward[];
};

export default function RewardBell({ rewards }: Props) {
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const recentRewards = rewards.slice(0, 3);

  return (
    <>
      <div className="relative">
        <Tooltip text="Reward" side="bottom">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition hover:bg-yellow-50 hover:text-yellow-600"
            aria-label="Rewards"
          >
            <Award size={19} />

            {rewards.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-yellow-500 px-1 text-[9px] font-bold text-white ring-2 ring-white">
                {rewards.length > 9 ? "9+" : rewards.length}
              </span>
            )}
          </button>
        </Tooltip>

        {open && (
          <>
            {/* Backdrop */}
            <button
              type="button"
              aria-label="Close rewards"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 cursor-default"
            />

            {/* Dropdown */}
            <div className="absolute  right-0 top-11 z-50 w-[360px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 px-4! py-3!">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Your Rewards
                  </h3>

                  <p className="mt-0.5! text-xs text-gray-500">
                    {rewards.length === 0
                      ? "No rewards yet"
                      : `${rewards.length} reward${
                          rewards.length !== 1 ? "s" : ""
                        } received`}
                  </p>
                </div>

                {rewards.length > 0 && (
                  <span className="rounded-full bg-yellow-50 px-2! py-1! text-[10px] font-semibold text-yellow-600">
                    {rewards.length} earned
                  </span>
                )}
              </div>

              {/* Rewards */}
              <div className="max-h-[360px] overflow-y-auto">
                {recentRewards.length === 0 ? (
                  <div className="flex flex-col items-center justify-center px-6! py-10! text-center">
                    <div className="mb-3! flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      <Award size={20} className="text-gray-400" />
                    </div>

                    <p className="text-sm font-medium text-gray-700">
                      No rewards yet
                    </p>

                    <p className="mt-1! text-xs text-gray-400">
                      Complete tasks to earn rewards.
                    </p>
                  </div>
                ) : (
                  recentRewards.map((reward) => (
                    <div
                      key={reward.id}
                      className="border-b border-gray-100 px-4! py-3! transition hover:bg-yellow-50/40"
                    >
                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-50">
                          <Award size={16} className="text-yellow-600" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-semibold text-gray-900">
                            {reward.title}
                          </h4>

                          {reward.message && (
                            <p className="mt-1! text-xs leading-5 text-gray-600">
                              {reward.message}
                            </p>
                          )}

                          <p className="mt-2! text-[10px] text-gray-400">
                            {formatNepalDate(reward.createdAt)}
                            {/* {new Date(reward.createdAt).toLocaleString(
                              "en-NP",
                              {
                                timeZone: "Asia/Kathmandu",
                                dateStyle: "medium",
                                timeStyle: "short",
                              },
                            )} */}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* View all */}
              {rewards.length > 0 && (
                <div className="border-t border-gray-100 px-4! py-2.5! text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setShowAll(true);
                    }}
                    className="text-xs font-medium text-indigo-600 transition hover:text-indigo-700"
                  >
                    View all rewards
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {/* All rewards modal */}
      {showAll && (
        <div className="fixed inset-0 min-h-screen z-[100] flex items-center justify-center bg-black/40 p-4!">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5! py-4!">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-50">
                  <Award size={19} className="text-yellow-600" />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900">All Rewards</h2>
                  <p className="text-xs text-gray-500">
                    {rewards.length} reward
                    {rewards.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAll(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal content */}
            <div className="max-h-[70vh] overflow-y-auto p-5!">
              <div className="space-y-3!">
                {rewards.map((reward) => (
                  <div
                    key={reward.id}
                    className="rounded-xl border border-gray-200 bg-white p-4! transition hover:border-yellow-200 hover:bg-yellow-50/30"
                  >
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-50">
                        <Award size={18} className="text-yellow-600" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {reward.title}
                        </h3>

                        {reward.message && (
                          <p className="mt-1! text-sm text-gray-600">
                            {reward.message}
                          </p>
                        )}

                        <p className="mt-2! text-xs text-gray-400">
                          {formatNepalDate(reward.createdAt)}
                          {/* {new Date(reward.createdAt).toLocaleString("en-NP", {
                            timeZone: "Asia/Kathmandu",
                            dateStyle: "medium",
                            timeStyle: "short",
                          })} */}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
