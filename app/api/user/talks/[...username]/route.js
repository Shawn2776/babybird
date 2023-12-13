import { options } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const username = requestUrl.searchParams.get("username");

  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.redirect("/login");
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) {
      return NextResponse.error(new Error("No user found"));
    }

    const ownerId = user.id;

    const talks = await prisma.talk.findMany({
      where: { ownerId },
      include: {
        owner: true, // Includes the owner details
        likes: true, // Includes the likes details
        dislikes: true, // Includes the dislikes details
        _count: {
          select: {
            likes: true,
            dislikes: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    for (const talk of talks) {
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

    if (!talks) {
      return NextResponse.error(new Error("No talks found"));
    }

    return NextResponse.json({ talks });
  } catch (error) {
    console.log("error fetching talks", error);
    return NextResponse.json(error);
  }
}
