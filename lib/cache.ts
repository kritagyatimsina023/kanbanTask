import { updateTag } from "next/cache";

export const CACHE_TAGS = {
  admin: "admin-dashboard",
  leaderboard: "leaderboard",
  adminUser: "admin-users",
};

export const invalidate = {
  admin() {
    updateTag(CACHE_TAGS.admin);
  },

  leaderboard() {
    updateTag(CACHE_TAGS.leaderboard);
  },

  adminUser() {
    updateTag(CACHE_TAGS.adminUser);
  },
  taskCreated() {
    updateTag(CACHE_TAGS.admin);
    updateTag(CACHE_TAGS.adminUser);
    // updateTag(CACHE_TAGS.adminTask);
  },

  taskStatusChanged() {
    updateTag(CACHE_TAGS.admin);
    updateTag(CACHE_TAGS.leaderboard);
    updateTag(CACHE_TAGS.adminUser);
    // updateTag(CACHE_TAGS.adminTask);
  },
  taskUpdated() {
    updateTag(CACHE_TAGS.admin);
    updateTag(CACHE_TAGS.adminUser);
    // updateTag(CACHE_TAGS.adminTask);
  },

  taskReassigned() {
    updateTag(CACHE_TAGS.admin);
    updateTag(CACHE_TAGS.adminUser);
    // updateTag(CACHE_TAGS.adminTask);
  },

  taskDeleted() {
    updateTag(CACHE_TAGS.admin);
    updateTag(CACHE_TAGS.adminUser);
    // updateTag(CACHE_TAGS.adminTask);
  },

  rewardGranted() {
    updateTag(CACHE_TAGS.leaderboard);
    updateTag(CACHE_TAGS.admin);
  },

  userBanToggled() {
    updateTag(CACHE_TAGS.admin);
    updateTag(CACHE_TAGS.leaderboard);
    updateTag(CACHE_TAGS.adminUser);
  },
};
