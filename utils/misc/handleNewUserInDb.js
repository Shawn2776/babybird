import prisma from "@/lib/prisma";
import React from "react";
import createUniqueUsername from "../createUniqueUsername";

const handleNewUserInDb = async (user, email) => {
  try {
    const userInDb = await prisma.user.findUnique({
      where: { email },
    });

    if (userInDb) {
      return "Error! User already exists!";
    }

    if (!userInDb) {
      const username = createUniqueUsername();
      const newUser = await prisma.user.create({
        data: {
          email,
          name: user.name,
          username,
          emailVerified: user.emailVerified,
          profilePic: user.profilePic,
        },
      });

      if (!newUser) {
        return false;
      }

      return true;
    }
  } catch (error) {
    console.log("error creating user in auth", error);
  }
};

export default handleNewUserInDb;
