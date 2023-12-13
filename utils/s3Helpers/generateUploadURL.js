import convertFileName from "@/utils/s3Helpers/convertFileName";
import aws from "aws-sdk";

const s3 = new aws.S3({
  region: process.env.AWS_S3_REGION,
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
});

export async function generateUploadURL(filename) {
  const { newFileName, paramContentType } = convertFileName(filename);

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: newFileName,
    Expires: 60 * 10,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);

  return uploadURL;
}
