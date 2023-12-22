import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

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
