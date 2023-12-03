import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import convertFileName from "@/utils/s3Helpers/convertFileName";

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
  // const isImage = formData.get("isImage");

  if (!file) {
    return NextResponse.json({ error: "File not uploaded." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileBuffer = buffer;
  let fileName = file.name;

  const { newFileName, paramContentType } = convertFileName(fileName);

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${newFileName}`,
    Body: fileBuffer,
    ContentType: paramContentType,
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return NextResponse.json(newFileName);
}