import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const session = await getServerSession(options);

    console.log("session", session);

    if (!session?.user) {
      return NextResponse.json({ error: "Not Authorized" });
    }

    const requestUrl = new URL(request.url);

      const username = requestUrl.searchParams.get("username");

    console.log("username", username);
    console.log("username type", typeof username);

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
