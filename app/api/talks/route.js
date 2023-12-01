import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const obj = Object.fromEntries(searchParams.entries());
  return NextResponse.json(obj);
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
