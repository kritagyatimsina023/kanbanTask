import "dotenv/config";
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const passwordHash = await bcrypt.hash("member123", 10);

  const members = [
    "member6@example.com",
    "member7@example.com",
    "member8@example.com",
    "member9@example.com",
  ];

  for (const email of members) {
    const user = await prisma.user.upsert({
      where: {
        email,
      },
      update: {},
      create: {
        email,
        passwordHash,
        role: Role.MEMBER,
      },
    });

    console.log("User created:", user.email);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
