import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(options);

  if (!session || session.user === "unathenticated") {
    return redirect("/");
  }

  const email = session.user.email;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({
        status: 500,
        message: "Error! User not found.",
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error! User not found!",
    });
  }
}

export async function PUT(request) {
  const requestUrl = new URL(request.url);

  const newUsername = requestUrl.searchParams.get("username");

  const session = await getServerSession(options);

  if (!session || session.user === "unathenticated") {
    return redirect("/");
  }

  const email = session.user.email;
  console.log("email", email);

  try {
    const res = await prisma.user.update({
      where: {
        email,
      },
      data: {
        username: newUsername,
      },
    });

    console.log("res", res);
  } catch (error) {
    console.log("error", error);
  }

  return NextResponse.json({ message: "success" });
}
