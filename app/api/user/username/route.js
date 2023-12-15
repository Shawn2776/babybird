import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const username = requestUrl.searchParams.get("username");

  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.redirect("/login");
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "No user found" });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.error(new Error("No user found"));
  }
  
}
