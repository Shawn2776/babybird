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

async function uploadFileToS3(file, fileName) {
  console.log("5. in uploadtoS3");
  const fileBuffer = file;

  console.log("6. before convertFileName");
  const { newFileName, paramContentType } = convertFileName(fileName);
  console.log("9. after convertfilename", newFileName);

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${newFileName}`,
    Body: fileBuffer,
    ContentType: paramContentType,
  };

  console.log("10. before send to s3!!!>>>");
  const command = new PutObjectCommand(params);
  try {
    const res = await s3Client.send(command);

    if (res.ok) {
      const truck = res.json();
      console.log("truck>>", truck);
    }
  } catch (error) {
    console.log("error. res wasn't ok", error);
  }

  console.log("11. after send to s3!!!>>>");
  return newFileName;
}

export async function POST(request) {
  try {
    console.log("3. in s3upload");
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "File not uploaded." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("4. before uploadtoS3");
    const fileName = await uploadFileToS3(buffer, file.name);
    console.log("11. after uploadtoS3, right before return to Talk POST!!!>>>");

    return NextResponse.json(fileName);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
