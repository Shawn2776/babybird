import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

export async function GET() {
  const session = await getServerSession(options);

  if (!session || session.user === "unauthenticated") {
    return redirect("/");
  }

  const email = session.user.email;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        talks: true,
      },
    });

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

  if (!session || session.user === "unauthenticated") {
    return redirect("/");
  }

  const email = session.user.email;

  try {
    const res = await prisma.user.update({
      where: {
        email,
      },
      data: {
        username: newUsername,
      },
    });
  } catch (error) {
    console.log("error", error);
  }

  return NextResponse.json({ message: "success" });
}
