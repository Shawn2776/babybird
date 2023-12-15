"use server";

import prisma from "@/lib/prisma";

// get all the talks
export async function getAllTalks() {
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

    const serializedTalks = talks.map((talk) => {
      // Assuming 'talk' is a class instance with complex types
      return serializeClassInstance(talk);
    });

    return serializedTalks;
  } catch (error) {
    return error;
  }
}

// get all talks by a user

// get a single talk

// get all talks in a category
