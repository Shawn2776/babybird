import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(options);

    if (!session) {
      return NextResponse.json({ message: "Error. User not authenticated." });
    }

    const email = session.user.email;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Error. User not found." });
    }

    console.log("user", user);

    return NextResponse.json({ user });
  } catch (error) {
    console.log("error fetching user", error);
    return NextResponse.json(error);
  }
}
