import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
const prisma = new PrismaClient();

export async function GET(request) {
  const session = await getServerSession(options);

  const email = session?.user?.email;

  if (!session?.user) {
    res.status(401).json({
      message: "Error. User not authenticated. Please log in and try again.",
    });
  }

  const { searchParams } = new URL(request.url);
  const talkId = searchParams.get("id");

  if (isNaN(talkId) || talkId === null) {
    // Handle invalid talkId
    return NextResponse.error(new Error("Invalid talk ID"));
  }
  try {
    const talk = await prisma.talk.findUnique({
      where: {
        id: talkId,
      },
    });

    const { id: ownerId } = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (talk.likes.find((like) => like.ownerId === user.id)) {
      const updatedTalk = await prisma.talk.update({
        where: {
          id: ownerId,
        },
        data: {
          likes: {
            disconnect: {
              ownerId: user.id,
            },
          },
        },
      });
    } else {
      const updatedTalk = await prisma.talk.update({
        where: {
          id: parseInt(searchParams.get("id")),
        },
        data: {
          likes: {
            connect: {
              ownerId: session.user.id,
            },
          },
        },
      });
    }
  } catch (error) {
    console.log("Error in api/talks/[...id]/route.js", error);
    return NextResponse.error(error);
  }

  return NextResponse.redirect("/");
}
