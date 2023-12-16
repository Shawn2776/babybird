import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.redirect("/Login");
  }

  const email = session.user.email;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return NextResponse.error(new Error("No user found"));
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.log("error fetching user", error);
    return NextResponse.json(error);
  }
}
