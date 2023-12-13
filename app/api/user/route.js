import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(options);

    const email = session?.user?.email;

    if (!session?.user) {
      return NextResponse.redirect("/Login");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("error fetching user", error);
    return NextResponse.json(error);
  }
}
