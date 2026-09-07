"use client";

import React, { useActionState, useEffect, useState } from "react";
import { Users, X, UserPlus, Check, Loader2 } from "lucide-react";
import { Member } from "@/app/types/member.types";
import { createChatRoomAction } from "../chatRoom.action";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

type CreateRoomProps = {
  members: Member[];
  onClose: () => void;
  onCreate?: (roomName: string, memberIds: string[]) => void;
};
const initialState = {
  success: false,
  message: "",
  fieldErrors: {},
};

const CreateRoom = ({ members, onClose }: CreateRoomProps) => {
  const [roomName, setRoomName] = useState("");
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [state, formAction, isPending] = useActionState(
    createChatRoomAction,
    initialState,
  );
  const toggleMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((memberId) => memberId !== id)
        : [...prev, id],
    );
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      toast.success(state.message);
      router.refresh();
      onClose();
    } else {
      if (state.fieldErrors?.general?.length) {
        toast.error(state.fieldErrors.general[0]);
      } else {
        toast.error(state.message);
      }
    }
  }, [state, onClose, router]);

  const filteredMembers = members.filter((member) =>
    member.email.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div
      className="fixed inset-0  z-50 flex items-center justify-center bg-black/40 px-4! py-6! backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <form
        action={formAction}
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6! py-5!">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Users size={21} />
            </div>

            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Create Chat Room
              </h1>

              <p className="mt-0.5! text-xs text-gray-500">
                Create a room and invite members to chat together.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="border-b border-gray-100 px-6! py-5!">
            <h2 className="mb-3! text-sm font-semibold text-gray-900">
              Room details
            </h2>
            <label className="mb-1.5! block text-xs font-medium text-gray-700">
              Room name
            </label>
            <input
              type="text"
              name="name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="e.g. Let's Chat Room"
              maxLength={50}
              autoFocus
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4! py-3! text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />

            <div className="mt-1.5! flex justify-end">
              <span className="text-[10px] text-gray-400">
                {roomName.length}/50
              </span>
            </div>
          </div>
          <div className="px-6! py-5!">
            <div className="mb-4! flex items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Add members
                </h2>

                <p className="mt-0.5! text-xs text-gray-500">
                  Select the people you want in this room.
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-indigo-50 px-3! py-1! text-[11px] font-semibold text-indigo-600">
                {selectedMembers.length} selected
              </span>
            </div>

            {selectedMembers.length > 0 && (
              <div className="mb-4! flex flex-wrap gap-2">
                {selectedMembers.map((id) => {
                  const member = members.find((item) => item.id === id);
                  if (!member) return null;
                  return (
                    <div
                      key={member.id}
                      className="flex max-w-full items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 py-1! pl-1! pr-2! text-xs text-indigo-700"
                    >
                      {/* Avatar */}
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-semibold uppercase text-white">
                        {member.email.charAt(0)}
                      </div>

                      {/* Email */}
                      <span className="max-w-[220px] truncate">
                        {member.email}
                      </span>
                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => toggleMember(member.id)}
                        className="ml-0.5! shrink-0 text-indigo-400 transition hover:text-indigo-700"
                        aria-label={`Remove ${member.email}`}
                      >
                        <X size={13} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="overflow-y-auto rounded-xl border border-gray-200">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => {
                  const selected = selectedMembers.includes(member.id);
                  return (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => toggleMember(member.id)}
                      className={`flex w-full items-center gap-3 border-b border-gray-100 px-4! py-3! text-left transition last:border-b-0 ${
                        selected
                          ? "bg-indigo-50/70"
                          : "bg-white hover:bg-gray-50"
                      }`}
                    >
                      {selectedMembers.map((memberId) => (
                        <input
                          key={memberId}
                          type="hidden"
                          name="membersIds"
                          value={memberId}
                        />
                      ))}

                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold uppercase ${
                          selected
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {member.email.charAt(0)}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {member.email}
                        </p>

                        <p className="mt-0.5! text-[11px] text-gray-400">
                          Member
                        </p>
                      </div>
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                          selected
                            ? "border-indigo-600 bg-indigo-600 text-white"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {selected && <Check size={13} strokeWidth={3} />}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="px-6! py-10! text-center">
                  <UserPlus size={26} className="mx-auto mb-2 text-gray-300" />

                  <p className="text-sm font-medium text-gray-700">
                    No members found
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Try searching with a different email.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between gap-4 border-t border-gray-100 bg-gray-50/70 px-6! py-4!">
          <div className="hidden sm:block">
            <p className="text-xs text-gray-500">
              {selectedMembers.length === 0
                ? "Select members to continue"
                : `${selectedMembers.length} member${
                    selectedMembers.length > 1 ? "s" : ""
                  } selected`}
            </p>
          </div>
          <div className="ml-auto! flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4! py-2.5! text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                !roomName.trim() || selectedMembers.length === 0 || isPending
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5! py-2.5! text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {isPending && <Loader2 size={16} className="animate-spin" />}

              {isPending ? "Creating..." : "Create Room"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateRoom;
