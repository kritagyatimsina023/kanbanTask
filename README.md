# Full-Stack Kanban Task Board

This is a Full-Stack Kanban Task Board built with Next.js (App Router), React, and Prisma with PostgreSQL.

## Features

- **Next.js App Router**: Uses Server Components for data fetching and Server Actions for mutations.
- **Relational Database**: PostgreSQL managed via Prisma ORM.
- **Authentication**: Custom JWT based session management using `jose` and HttpOnly cookies.
- **Role-Based Access Control (RBAC)**:
  - **Admin**: Full CRUD access. Can create, edit, reassign, update status, and delete any task.
  - **Member**: Can view the board and update the status of tasks assigned to them.
- **Tailwind CSS**: Responsive UI built with Tailwind CSS and custom CSS variables for consistent theming.

## Setup Instructions

### 1. Prerequisites

- Node.js (v20+)
- `pnpm` package manager
- Docker (optional, for running local PostgreSQL)

## Environment Variables

Create a `.env` file in the project root and configure the following variables:

```env
DATABASE_URL="postgres://username:password@db.prisma.io:5432/postgres?sslmode=verify-full"
JWT_SECRET="your_long_random_jwt_secret"
```

### Why `sslmode=verify-full`?

This project uses PostgreSQL over an encrypted SSL/TLS connection.

The `sslmode=verify-full` option:

- Encrypts all communication between the application and the database.
- Verifies the database server's SSL certificate.
- Confirms that the server hostname matches the certificate, helping prevent man-in-the-middle attacks.
- Matches the recommended SSL configuration for newer versions of the PostgreSQL Node.js driver (`pg`).

If `sslmode` is omitted or set to `require`, `prefer`, or `verify-ca`, newer versions of the PostgreSQL driver may display a security warning similar to:

```text
SECURITY WARNING: The SSL modes 'prefer', 'require', and 'verify-ca'
are treated as aliases for 'verify-full'.
```

Using `sslmode=verify-full` removes this warning and ensures the application uses the strongest SSL verification mode recommended by the PostgreSQL driver.

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Database Setup & Seeding

Create the database schema and populate it with sample data for testing.

```bash
npx prisma db push
npx tsx prisma/seed.ts
```

The seed script creates:

- 1 Admin user
- 2 Member users
- Sample Kanban tasks across **To Do**, **In Progress**, and **Done**
- Passwords hashed using `bcryptjs`

### 5. Run the Application

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Test Credentials

Use the following credentials to log in and test the RBAC implementation:

**Admin Role:**

- Email: `admin@example.com`
- Password: `admin123`

**Member Role:**

- Email: `member1@example.com`
- Password: `member123`
- Email: `member2@example.com`
- Password: `member123`
