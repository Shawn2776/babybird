import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
<<<<<<< HEAD

=======
>>>>>>> @{-1}
import createUniqueUsername from "@/utils/createUniqueUsername";
import defaultProfilePic from "@/public/defaultProfilePic.jpg";
import { compare, hash } from "bcrypt";
<<<<<<< HEAD
import prisma from "@/lib/prisma";
=======
import prisma from "@/app/lib/prisma";
>>>>>>> @{-1}

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
        }
      },

      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email address",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          const newUsername = await createUniqueUsername();
          const newPassword = await hash(credentials.password, 10);
          const newRoleId = 2;
          const newUser = await prisma.user.create({
            data: {
              email: credentials.email,
              name: newUsername,
              hPassword: newPassword,
              roleId: newRoleId,
              username: newUsername,
              emailVerified: false,
            },
          });
          return {
            id: newUser.id + "",
            email: user.email,
            name: user.name,
          };
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.hPassword
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id + "",
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
      return token;
    },

    secret: process.env.NEXTAUTH_SECRET,
  },
<<<<<<< HEAD
};

// callbacks: {
//   async signIn({ user, account, profile }) {
//     const adminEmail = process.env.ADMIN_EMAIL;

//     let roleName = user.email === adminEmail ? "admin" : "user";

//     const email = user.email;
//     const profilePic =
//       user.picture === user.picture ? user.picture : defaultProfilePic;
//     const emailVerified = profile.email_verified;

//     // Check if role exists in db
//     const userRole = user.googleRoleName;
//     let roleInDb = await prisma.role.findUnique({
//       where: {
//         name: userRole,
//       },
//     });

//     // create role if it doesn't exist
//     if (!roleInDb) {
//       roleInDb = await prisma.role.create({
//         data: {
//           name: userRole,
//         },
//       });
//     }

//     // Check if user exists in your database
//     let userInDb = await prisma.user.findUnique({
//       where: { email },
//     });

//     // If user doesn't exist, create a new user record
//     if (!userInDb) {
//       const username = await createUniqueUsername();
//       const roleId = roleInDb.id;
//       const usersActualName = user.name;
//       userInDb = await prisma.user.create({
//         data: {
//           name: usersActualName,
//           email,
//           profilePic,
//           roleId: roleId, // Assuming 'name' is the unique field in your `Role` model
//           emailVerified,
//           username,
//           // Add other fields as necessary
//         },
//         // select: { id: true, role: true },
//       });
//       // } else {
//       //   // Optionally, you can update the user's role if it's different
//       //   // and you want to ensure the admin always has the admin role.
//       //   if (userInDb.role !== role) {
//       //     userInDb = prisma.user.update({
//       //       where: { email: process.env.ADMIN_EMAIL },
//       //       data: {
//       //         role: {
//       //           connect: { name: "admin" },
//       //         },
//       //       },
//       //     });
//       //   }
//     }

//     return true;
//   },
//   async jwt({ token, user }) {
//     if (user) token.role = user.role;
//     return token;
//   },
//   // client side
//   async session({ session, token }) {
//     if (session.user) session.user.role = token.role;
//     return session;
//   },
// },
=======
};
>>>>>>> @{-1}
