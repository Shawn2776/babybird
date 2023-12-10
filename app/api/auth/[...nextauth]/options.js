import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../lib/prisma";
import createUniqueUsername from "@/utils/createUniqueUsername";
import defaultProfilePic from "../../../../public/defaultProfilePic.jpg";

export const options = {
  providers: [
    GoogleProvider({
      profile(profile) {
        let roleName;
        if (profile.email === process.env.ADMIN_EMAIL) {
          roleName = "admin";
        } else {
          roleName = "user";
        }
        return {
          ...profile,
          id: profile.sub,
          googleRoleName: roleName,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const adminEmail = process.env.ADMIN_EMAIL;

      let roleName = user.email === adminEmail ? "admin" : "user";

      const email = user.email;
      const profilePic =
        user.picture === user.picture ? user.picture : defaultProfilePic;
      const emailVerified = profile.email_verified;

      // Check if role exists in db
      const userRole = user.googleRoleName;
      let roleInDb = await prisma.role.findUnique({
        where: {
          name: userRole,
        },
      });

      // create role if it doesn't exist
      if (!roleInDb) {
        roleInDb = await prisma.role.create({
          data: {
            name: userRole,
          },
        });
      }

      // Check if user exists in your database
      let userInDb = await prisma.user.findUnique({
        where: { email },
      });

      // If user doesn't exist, create a new user record
      if (!userInDb) {
        const username = await createUniqueUsername();
        const roleId = roleInDb.id;
        const usersActualName = user.name;
        userInDb = await prisma.user.create({
          data: {
            name: usersActualName,
            email,
            profilePic,
            roleId: roleId, // Assuming 'name' is the unique field in your `Role` model
            emailVerified,
            username,
            // Add other fields as necessary
          },
          // select: { id: true, role: true },
        });
        // } else {
        //   // Optionally, you can update the user's role if it's different
        //   // and you want to ensure the admin always has the admin role.
        //   if (userInDb.role !== role) {
        //     userInDb = prisma.user.update({
        //       where: { email: process.env.ADMIN_EMAIL },
        //       data: {
        //         role: {
        //           connect: { name: "admin" },
        //         },
        //       },
        //     });
        //   }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    // client side
    async session({ session, token }) {
      if (session.user) session.user.role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
