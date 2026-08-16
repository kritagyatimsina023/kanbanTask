import "dotenv/config";
import { PrismaClient, Role, Status } from "../generated/prisma/client";
import bcrypt from "bcryptjs";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  const adminPassword = await bcrypt.hash("admin123", 10);
  const memberPassword = await bcrypt.hash("member123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      passwordHash: adminPassword,
      role: Role.ADMIN,
    },
  });

  const member1 = await prisma.user.upsert({
    where: { email: "member1@example.com" },
    update: {},
    create: {
      email: "member1@example.com",
      passwordHash: memberPassword,
      role: Role.MEMBER,
    },
  });

  const member2 = await prisma.user.upsert({
    where: { email: "member2@example.com" },
    update: {},
    create: {
      email: "member2@example.com",
      passwordHash: memberPassword,
      role: Role.MEMBER,
    },
  });
  const member3 = await prisma.user.upsert({
    where: { email: "member3@example.com" },
    update: {},
    create: {
      email: "member3@example.com",
      passwordHash: memberPassword,
      role: Role.MEMBER,
    },
  });
  const member4 = await prisma.user.upsert({
    where: { email: "member4@example.com" },
    update: {},
    create: {
      email: "member4@example.com",
      passwordHash: memberPassword,
      role: Role.MEMBER,
    },
  });
  const member5 = await prisma.user.upsert({
    where: { email: "member5@example.com" },
    update: {},
    create: {
      email: "member5@example.com",
      passwordHash: memberPassword,
      role: Role.MEMBER,
    },
  });

  await prisma.task.createMany({
    data: [
      {
        title: "Setup Database",
        description: "Initialize PostgreSQL and Prisma schema",
        status: Status.DONE,
        assigneeId: admin.id,
      },
      {
        title: "Build Authentication",
        description: "Implement JWT based authentication",
        status: Status.IN_PROGRESS,
        assigneeId: member1.id,
      },
      {
        title: "Kanban UI",
        description: "Create responsive drag and drop board",
        status: Status.TODO,
        assigneeId: member2.id,
      },
      {
        title: "RBAC Enforcement",
        description: "Ensure members can only edit their own tasks",
        status: Status.TODO,
        assigneeId: member1.id,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
