export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

export async function GET(request) {
  // const session = await getServerSession(options);

  // if (!session || session.user === "unauthenticated") {
  //   return redirect("/");
  // }

  // const { searchParams } = new URL(request.NextResponse);
  // const username = searchParams.get("username");

  let url = request.url;
  let parts = url.split("?");
  let username = parts.length > 1 ? parts[1] : "";

  if (process.env.NODE_ENV === "production") {
    let newStr = username.replace(/=/g, "");
    username = newStr;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        talks: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Unable to fetch user." });
    }

    for (const talk of user.talks) {
      if (talk.image) {
        const getObjectParams = {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: talk.image,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        talk.imageUrl = url;
      } else if (talk.video) {
        const getObjectParams = {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: talk.video,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        talk.videoUrl = url;
      }
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Unable to fetch user." });
  }
}
