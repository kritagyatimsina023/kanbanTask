# Full-Stack Kanban Task Board

This is a Full-Stack Kanban Task Board built with Next.js (App Router), React, and Prisma with PostgreSQL.

**Live Demo:** https://kanbankritagya.vercel.app/

## Features

### 1. Authentication & Authorization

- Custom JWT-based authentication using `jose` and HttpOnly cookies.
- Secure session management.
- Role-Based Access Control (RBAC).
- Separate Admin and Member experiences.
- Protected routes using `proxy.ts`.

### 2. Admin Dashboard

- Dashboard summary with:
  - Total Users
  - Total Tasks
  - Active Tasks
  - In Progress Tasks
  - Completed Tasks
  - Total Rewards
  - Rewards issued this month
- Task distribution and workspace overview.
- Top performer summary.

### 3. User Management

- Admin can view all registered users.
- View user task statistics.
- Ban members with a specified reason.
- Unban previously banned members.
- Admin accounts cannot be banned through the member management interface.
- Banned users are prevented from accessing protected application functionality.

### 4. Kanban Task Management

- Create, update, assign, reassign, and delete tasks.
- Task statuses:
  - **To Do**
  - **In Progress**
  - **Done**
- Admins can manage all tasks.
- Members can update the status of tasks assigned to them.
- Task assignment and reassignment.

### 5. Leaderboard & Ranking

- Members are ranked based on completed tasks.
- Higher completed-task counts result in higher rankings.
- Leaderboard displays:
  - Rank
  - Member
  - Completed Tasks
- Email is used as a secondary sorting criterion when members have the same number of completed tasks.

### 6. Reward System

- Admins can reward members based on their performance.
- Rewards can include a title and optional message.
- Members can view their received rewards.
- Dashboard displays reward statistics and top performers.

### 7. Responsive UI

- Responsive interface built with Tailwind CSS.
- Dashboard, Kanban board, user management, leaderboard, and reward interfaces.
- Loading skeletons for improved user experience during server-side data fetching.

## Test Credentials

You can use the following credentials to test the application with different roles and permissions.

### Admin Account

The Admin account has full access to the application, including task management, user management, leaderboard management, rewards, and dashboard statistics.

- **Email:** `admin@example.com`
- **Password:** `admin123`
- **Role:** `ADMIN`

### Member Accounts

The following accounts can be used to test the Member experience.

All member accounts use the same password:

- **Password:** `member123`
- **Role:** `MEMBER`

Available member accounts:

- `member1@example.com`
- `member2@example.com`
- `member6@example.com`
- `member7@example.com`
- `member8@example.com`
- `member9@example.com`

> **Note:** Log in with the Admin account to access administrative features. Log in with any of the Member accounts to test the member-specific task board, leaderboard, ranking, and reward features.
