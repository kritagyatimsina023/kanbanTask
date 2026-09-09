type ActivityConfig = {
  icon: React.ElementType;
  label: string;
  iconColor: string;
  iconBg: string;
  iconBorder: string;
  pingColor: string;
};
import {
  ArrowRight,
  CheckCircle2,
  CirclePlus,
  FilePenLine,
  MessageCircle,
  ShieldCheck,
  Trash2,
  Trophy,
  UserPlus,
  UserRoundMinus,
} from "lucide-react";

import { ActivityAction } from "@/generated/prisma/enums";
export const activityConfig: Record<ActivityAction, ActivityConfig> = {
  // ─────────────────────────────────────
  // TASK ACTIVITIES
  // ─────────────────────────────────────

  TASK_CREATED: {
    icon: CirclePlus,
    label: "created a new task",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    iconBorder: "border-emerald-100",
    pingColor: "bg-emerald-400",
  },

  TASK_UPDATED: {
    icon: FilePenLine,
    label: "updated a task",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    iconBorder: "border-blue-100",
    pingColor: "bg-blue-400",
  },

  TASK_DELETED: {
    icon: Trash2,
    label: "deleted a task",
    iconColor: "text-red-600",
    iconBg: "bg-red-50",
    iconBorder: "border-red-100",
    pingColor: "bg-red-400",
  },

  TASK_COMPLETED: {
    icon: CheckCircle2,
    label: "completed a task",
    iconColor: "text-green-600",
    iconBg: "bg-green-50",
    iconBorder: "border-green-100",
    pingColor: "bg-green-400",
  },

  TASK_REOPENED: {
    icon: ArrowRight,
    label: "reopened a task",
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50",
    iconBorder: "border-sky-100",
    pingColor: "bg-sky-400",
  },

  TASK_ASSIGNED: {
    icon: UserPlus,
    label: "assigned a task",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    iconBorder: "border-violet-100",
    pingColor: "bg-violet-400",
  },

  TASK_UNASSIGNED: {
    icon: UserRoundMinus,
    label: "unassigned a task",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
    iconBorder: "border-orange-100",
    pingColor: "bg-orange-400",
  },

  TASK_REASSIGNED: {
    icon: UserPlus,
    label: "reassigned a task",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
    iconBorder: "border-orange-100",
    pingColor: "bg-orange-400",
  },

  TASK_STATUS_CHANGED: {
    icon: ArrowRight,
    label: "changed task status",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    iconBorder: "border-amber-100",
    pingColor: "bg-amber-400",
  },

  TASK_COMMENTED: {
    icon: MessageCircle,
    label: "commented on a task",
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
    iconBorder: "border-purple-100",
    pingColor: "bg-purple-400",
  },

  // ─────────────────────────────────────
  // REWARD ACTIVITIES
  // ─────────────────────────────────────

  REWARD_GRANTED: {
    icon: Trophy,
    label: "granted a reward",
    iconColor: "text-yellow-600",
    iconBg: "bg-yellow-50",
    iconBorder: "border-yellow-100",
    pingColor: "bg-yellow-400",
  },

  // ─────────────────────────────────────
  // USER ACTIVITIES
  // ─────────────────────────────────────

  USER_BANNED: {
    icon: ShieldCheck,
    label: "banned a user",
    iconColor: "text-red-600",
    iconBg: "bg-red-50",
    iconBorder: "border-red-100",
    pingColor: "bg-red-400",
  },

  USER_UNBANNED: {
    icon: ShieldCheck,
    label: "unbanned a user",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    iconBorder: "border-emerald-100",
    pingColor: "bg-emerald-400",
  },

  USER_ROLE_CHANGED: {
    icon: ShieldCheck,
    label: "changed a user's role",
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50",
    iconBorder: "border-indigo-100",
    pingColor: "bg-indigo-400",
  },

  // ─────────────────────────────────────
  // CHAT ROOM ACTIVITIES
  // ─────────────────────────────────────

  CHAT_ROOM_CREATED: {
    icon: MessageCircle,
    label: "created a chat room",
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-50",
    iconBorder: "border-cyan-100",
    pingColor: "bg-cyan-400",
  },

  CHAT_ROOM_DELETED: {
    icon: Trash2,
    label: "deleted a chat room",
    iconColor: "text-red-600",
    iconBg: "bg-red-50",
    iconBorder: "border-red-100",
    pingColor: "bg-red-400",
  },

  CHAT_ROOM_MEMBER_ADDED: {
    icon: UserPlus,
    label: "added a member to a chat room",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    iconBorder: "border-emerald-100",
    pingColor: "bg-emerald-400",
  },

  CHAT_ROOM_MEMBER_REMOVED: {
    icon: UserRoundMinus,
    label: "removed a member from a chat room",
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50",
    iconBorder: "border-rose-100",
    pingColor: "bg-rose-400",
  },
};
