import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function createUniqueUsername(email) {
  // Generate a base username using the part of the email before the @ symbol
  let usernameBase = email.split("@")[0];
  let uniqueUsername = usernameBase;

  // Keep trying to append random numbers to the username until it's unique
  let userExists = true;
  while (userExists) {
    const randomNumbers = Math.floor(Math.random() * 10000); // Random 4 digit number
    uniqueUsername = `${usernameBase}${randomNumbers}`;

    // Check if the username already exists in the database
    userExists = await prisma.user.findUnique({
      where: { username: uniqueUsername },
    });

    // If not, break out of the loop
    if (!userExists) {
      break;
    }
  }

  return uniqueUsername;
}

export default createUniqueUsername;
