import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import convertFileName from "@/utils/s3Helpers/convertFileName";
const sharp = require('sharp');

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const isImage = formData.get("isImage");

  if (!file) {
    return NextResponse.json({ error: "File not uploaded." }, { status: 400 });
  }

  let fileName = file.name;
  let resizedBuffer;

  console.log(isImage);

  if (isImage === true) {
    console.log("in isimage?");
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    resizedBuffer = await sharp(fileBuffer)
      .resize({ height: 1920, width: 1080, fit: "contain" })
      .toBuffer();
  } else {
    const buffer = Buffer.from(await file.arrayBuffer());
    resizedBuffer = buffer;
  }

  const { newFileName, paramContentType } = convertFileName(fileName);

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${newFileName}`,
    Body: resizedBuffer,
    ContentType: paramContentType,
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return NextResponse.json(newFileName);
}
