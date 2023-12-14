import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    console.log(" 3 - in api/user/username route");
    const session = await getServerSession(options);

    if (!session?.user) {
      return NextResponse.redirect("/Login");
    }
    console.log("4 - session in api/user/username route", session);
    const email = session?.user?.email;
    console.log(
      "5 - email in api/user/username route // before prisma query",
      email
    );
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    console.log("6 - user in api/user/username route", user);

    return NextResponse.json(user);
  } catch (error) {
    console.log("error fetching user", error);
    return NextResponse.json(error);
  }
}
