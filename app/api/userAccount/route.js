import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.redirect("/Login");
  }

  const email = session.user.email;
  console.log("email", email);

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
