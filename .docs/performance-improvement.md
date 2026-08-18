# Performance Improvement: Kanban Board (Member Side)

## Overview
This document outlines the performance optimizations made to the member-side public page (`app/(public)/page.tsx`) to improve initial load times and overall user experience.

## The Problem
The previous implementation suffered from several performance bottlenecks:
1. **Sequential Data Fetching (Waterfalls):** The page waited for `requireAuth()`, then sequentially awaited `prisma.task.findMany()`, `prisma.user.findMany()`, and `getUserLeaderboardData()`. This caused a significant delay before the UI could start rendering.
2. **Monolithic Component:** The entire `KanbanBoard` component waited for all data to load before rendering anything, leaving the user with a blank screen.
3. **Large Initial Bundle:** Components like `CreateTaskModal` were included in the initial JavaScript bundle, increasing load time.

## The Solution
To address these issues, the page was refactored to leverage React's concurrent features and Next.js App Router streaming capabilities.

### 1. Eliminating Request Waterfalls
Instead of awaiting multiple database queries sequentially, independent data is now fetched concurrently using `Promise.all` inside Server Components. The only sequential requirement is `requireAuth()`, which must complete before any other data fetching can begin.

### 2. Component-Level Code Splitting & Server Components
The monolithic `KanbanBoard` component was removed and split into focused Server and Client Components:
- **`TaskBoardContainer` (Server Component):** Responsible for fetching tasks and members concurrently.
- **`TaskBoardContent` (Client Component):** Renders the interactive Kanban columns and tasks.
- **`MemberPerformanceContainer` (Server Component):** Conditionally fetches leaderboard data for members.
- **`MemberPerformanceContent` (Client Component):** Renders the member's rank, completed tasks, and rewards.

### 3. React Streaming & Suspense Boundaries
By breaking the page down, we can now stream data independently:
- The main `page.tsx` renders the "page shell" (Header and New Task button) almost instantly.
- The `MemberPerformanceContainer` and `TaskBoardContainer` are wrapped in `<Suspense>` boundaries with lightweight, Tailwind-styled skeleton fallbacks (`MemberPerformanceSkeleton` and `TaskBoardSkeleton`).
- The user sees the page shell and skeleton loaders immediately, while the data resolves in the background.

### 4. Lazy Loading Heavy Components
The `CreateTaskModal` is now dynamically imported using `next/dynamic` (`ssr: false`) within `TaskBoardContent`. This removes the heavy modal code from the initial payload, only loading it when the user needs it (e.g., clicking "New Task").

## Impact
- **Perceived Performance:** Users no longer stare at a blank screen. The page shell and skeletons render immediately.
- **Actual Performance:** Concurrent data fetching reduces the total time required to retrieve all necessary data.
- **Bundle Size:** Lazy loading interactive components reduces the initial JavaScript bundle.
- **Maintainability:** The separation of concerns between Server Components (data fetching) and Client Components (interactivity) creates a cleaner and more maintainable architecture.
