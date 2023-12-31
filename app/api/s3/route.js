import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { generateUploadURL } from "@/utils/s3Helpers/generateUploadURL";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const { fileName, fileType } = Object.fromEntries(searchParams.entries());

  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ message: "Error. User not authenticated." });
  }

  const uploadURL = await generateUploadURL(fileName);

  if (!uploadURL) {
    return NextResponse.json({ message: "Error. User not authenticated." });
  }

  return NextResponse.json({ message: "success", uploadURL: uploadURL });
}
