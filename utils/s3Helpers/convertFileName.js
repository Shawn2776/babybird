import crypto from "crypto";

export default function convertFileName(fileNameIn) {
  const fileExtension = fileNameIn.substring(fileNameIn.lastIndexOf("."));
  const fileExtensionCompare = fileNameIn.substring(
    fileNameIn.lastIndexOf(".") + 1
  );

  let fileName = fileNameIn.substring(0, fileNameIn.lastIndexOf("."));

  const randomFileName = crypto.randomBytes(32).toString("hex");

  fileName = randomFileName + Date.now();

  const newFileName = fileName.replace(/ /g, "_") + fileExtension;

  let fileType;
  switch (fileExtensionCompare.toLowerCase()) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "webp":
      fileType = "image";
      break;
    // case "pdf":
    //   fileType = "pdf";
    //   break;
    case "mp4":
    case "avi":
    case "mov":
      fileType = "video";
      break;
    default:
      fileType = "unknown";
  }
  if (fileType === "unknown") {
    return NextResponse.json(
      { error: "Unkown file extension." },
      { status: 400 }
    );
  }

  let paramContentType;

  switch (fileType) {
    case "image":
      paramContentType = "image/" + fileExtensionCompare;
      break;
    default:
      paramContentType = "video/" + fileExtensionCompare;
    //   break;
    // default:
    //   paramContentType = "text/pdf";
  }

  return { newFileName: newFileName, paramContentType: paramContentType };
}
