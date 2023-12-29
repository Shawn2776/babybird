import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from "bcrypt";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import createUniqueUsername from "@/utils/createUniqueUsername";

export const options = {
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
      profile(profile) {
        const randomNumber = Math.floor(Math.random() * 1000000) + 1;
        const newStringNumber = randomNumber.toString();
        const newusername = "talker" + newStringNumber;
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          profilePic: profile.picture,
          role: "user",
          emailVerified: profile.email_verified,
          username: newusername,
        };
      },
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
        if (!credentials || !credentials.email || !credentials.password) {
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
              role: "user",
              username: newUsername,
              emailVerified: false,
              profilePic: "https://placehold.co/600x400/png",
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
  secret: process.env.NEXTAUTH_SECRET,
};

async function getRoleForUser(email) {
  return roleName === process.env.ADMIN_EMAIL ? "admin" : "user";
}

async function ensureRoleExists(roleName) {
  let role = await prisma.role.findUnique({ where: { name: roleName } });

  if (!role) {
    role = await prisma.role.create({ data: { name: roleName } });
  }

  return role.id;
}

async function handleUserInDb(user, roleId, profilePic) {
  try {
    let userInDb = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!userInDb) {
      const username = await createUniqueUsername();
      userInDb = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          profilePic,
          roleId,
          emailVerified: user.email_verified,
          username,
          // ... other necessary fields ...
        },
      });
    }

    return Boolean(userInDb);
  } catch (error) {
    console.log("error creating user in auth", error);
    return false;
  }
}

// session: ({ session, token }) => {
//   return {
//     ...session,
//     user: {
//       ...session.user,
//       id: token.id,
//     },
//   };
// },
// jwt: ({ token, user }) => {
//   if (user) {
//     return {
//       ...token,
//       id: user.id,
//       email: user.email,
//       name: user.name,
//     };
//   }
//   return token;
// },

// secret: process.env.NEXTAUTH_SECRET,
// },
// debug: process.env.NODE_ENV === "development",
