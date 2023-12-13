import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  const requestUrl = new URL(request.url);

  const username = requestUrl.searchParams.get("username");
  console.log("username", username);

  try {
    const session = await getServerSession(options);

    if (!session?.user) {
      return NextResponse.redirect("/Login");
    }

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("error fetching user", error);
    return NextResponse.json(error);
  }
}
