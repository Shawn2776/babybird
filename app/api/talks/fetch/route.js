import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
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

  if (!session) {
    res.status(401).json({
      message: "Error. User not authenticated. Please log in and try again.",
    });
  }

  try {
    const talks = await prisma.talk.findMany({
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
  } catch (error) {
    console.log("fetch talks error", error);
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

  return NextResponse.json({ message: "Talk Successfully created." });
}

//   const { email, text, image, video } = await request.json();
//   const user = await prisma.find;
// }

export async function PUT(request) {
  const requestUrl = new URL(request.url);

  const talkId = parseInt(requestUrl.searchParams.get("id"));
  const userLikes = requestUrl.searchParams.get("dislike");
  const userDislikes = requestUrl.searchParams.get("like");

  const session = await getServerSession(options);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const email = session?.user?.email;

  // find the uer by email in the db
  const user = await prisma.user.findUnique({
    where: { email },
  });

  const userId = user.id;

  // find the talk by talk id
  const talk = await prisma.talk.findUnique({
    where: { id: talkId },
    select: {
      likes: true,
      dislikes: true,
    },
  });

  // check if the talk exists
  if (!talk) {
    return NextResponse.error({
      status: 404,
      message: "Talk not found",
    });
  }

  if (!userLikes) {
    // check if the talk has been liked by the user
    const likesArray = talk.likes;

    const userLikes = likesArray.find((like) => like.ownerId === userId);

    try {
      if (userLikes) {
        // remove the like
        await prisma.like.delete({
          where: {
            id: userLikes.id, // use the id of the like to delete it
          },
        });

        return NextResponse.json({ message: "Talk Successfully un-liked." });
      } else {
        // create and add the like
        const newLike = await prisma.like.create({
          data: {
            ownerId: userId,
            talkId: talkId,
          },
        });
      }

      return NextResponse.json({ message: "Talk Successfully liked." });
    } catch (error) {
      console.log("error ib api/talks/fetch route", error);
    }
  } else {
    // check if the talk has been disliked by the user
    const dislikesArray = talk.dislikes;

    const userDislikes = dislikesArray.find(
      (dislike) => dislike.ownerId === userId
    );

    try {
      if (userDislikes) {
        // remove the dislike
        await prisma.dislike.delete({
          where: {
            id: userDislikes.id, // use the id of the like to delete it
          },
        });

        return NextResponse.json({ message: "Talk Successfully un-disliked." });
      } else {
        // create and add the like
        const newDislike = await prisma.dislike.create({
          data: {
            ownerId: userId,
            talkId: talkId,
          },
        });
      }

      return NextResponse.json({ message: "Talk Successfully disliked." });
    } catch (error) {
      console.log("error in api/talks/fetch", error);
    }
  }

  return NextResponse.json({ message: "Talk Successfully created." });
}

// export async function DELETE(request) {}

// export async function PATCH(request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
// export async function OPTIONS(request) {}
