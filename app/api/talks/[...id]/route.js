import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const session = await getServerSession(options);

  
  if (!session) {
    // res.status(401).json({
    //   message: "Error. User not authenticated. Please log in and try again.",
    // });
    console.log("Error. User not authenticated. Please log in and try again.");
  }
  const email = session?.user?.email;

  const searchParams = request.nextUrl.searchParams;
  const talkId = searchParams.get("query");
  // query is "hello" for /api/search?query=hello

  const talk = await prisma.talk.findUnique({
    where: { id: talkId },
    include: { likes: true },
  });

  const alreadyLiked = talk.likes.some((like) => like.ownerId === ownerId);

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

    if (alreadyLiked) {
      await prisma.talk.update({
        where: { id: talkId },
        data: {
          likes: {
            disconnect: { ownerId: ownerId },
          },
        },
      });
    } else {
      await prisma.talk.update({
        where: { id: talkId },
        data: {
          likes: {
            connect: { id: ownerId }, // Assumes Like model has 'id' as owner ID
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
