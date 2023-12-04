import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const prisma = new PrismaClient();

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

// const { searchParams } = new URL(request.url);
// const obj = Object.fromEntries(searchParams.entries());
// return NextResponse.json(obj);

export async function GET() {
  const session = await getServerSession(options);

  if (!session?.user) {
    res.status(401).json({
      message: "Error. User not authemticated. Please log in and try again.",
    });
  }

  const talks = await prisma.talk.findMany({
    include: {
      owner: true, // Includes the owner details
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
    console.log("TALK.IMAGE>>", talk.image);
    if (talk.image) {
      const getObjectParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: talk.image,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
      talk.imageUrl = url;
    } else if (talk.video) {
      console.log("TALK.VIDEO>>", talk.video);
      const getObjectParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: talk.video,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
      talk.videoUrl = url;
    }
  }

  return NextResponse.json(talks);
}

// export async function HEAD(request) {}

export async function POST(request) {
  const session = await getServerSession(options);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const email = session?.user?.email;

  const data = await request.json();
  const { text, image, video } = data;

  let owner = await prisma.user.findUnique({
    where: { email: email },
  });

  const ownerId = owner.id;

  const dataToSend = await prisma.talk.create({
    data: {
      ownerId: ownerId,
      text: text === null ? "" : text,
      image: image === null ? "" : image,
      video: video === null ? "" : video,
    },
  });

  return NextResponse.json({ dataToSend });
}

//   const { email, text, image, video } = await request.json();
//   const user = await prisma.find;
// }

// export async function PUT(request) {}

// export async function DELETE(request) {}

// export async function PATCH(request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
// export async function OPTIONS(request) {}
