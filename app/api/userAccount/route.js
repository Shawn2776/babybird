import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.redirect("/Login");
  }

  const email = session.user.email;

  const user = await prisma.user.findUnique({
    where: { email },
    include: { talks: true },
  });

  return NextResponse.json(user);
}
