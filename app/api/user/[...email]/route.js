import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const requestUrl = new URL(request.url);

  const email = requestUrl.searchParams.get("email");

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.error(new Error("User not found"));
    } else {
      console.log("user", user);
      return NextResponse.json(user);
    }
  } catch (error) {
    console.log("error retrieveing user from db", error);
  }
}
