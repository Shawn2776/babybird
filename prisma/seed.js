import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

const load = async () => {
  const password = hash("test", 12);
  const user = await prisma.user.upsert({
    where: { email: "test@test.com" },
    name: "test user",
    username: "testUser",
    hPassword: password,
  });
  try {
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};
load();
