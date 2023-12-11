import { getServerSession } from "next-auth";
import { options } from "./auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(options);
  console.log("GET API", session);
  return NextResponse.json({ authenticated: !!session });
}
