import GoogleProvider from "next-auth/providers/google";

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
          roleId: roleName,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
    }),
  ],
  session: {
    startegy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const adminEmail = process.env.ADMIN_EMAIL;

      let roleName = user.email === adminEmail ? "admin" : "user";

      //   // Generate a base username using the part of the email before the @ symbol
      //   let usernameBase = user.email.split("@")[0];
      //   let uniqueUsername = usernameBase;

      //   // Keep trying to append random numbers to the username until it's unique
      //   let userExists = true;
      //   while (userExists) {
      //     const randomNumbers = Math.floor(Math.random() * 10000); // Random 4 digit number
      //     uniqueUsername = `${usernameBase}${randomNumbers}`;

      //     // Check if the username already exists in the database
      //     userExists = await prisma.user.findUnique({
      //       where: { username: uniqueUsername },
      //     });

      //     // If not, break out of the loop
      //     if (!userExists) {
      //       break;
      //     }
      //   }

      const email = user.email;
      const profilePic = profile.picture
        ? profile.picture
        : "https://utalkto.s3.us-west-2.amazonaws.com/defaultProfilePic.png";
      const emailVerified = profile.email_verified;

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
