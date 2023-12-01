export default function convertFileName(fileNameIn) {
  console.log("filenamein>", fileNameIn);
  const fileExtension = fileNameIn.substring(fileNameIn.lastIndexOf("."));
  console.log("fileExtension>", fileExtension);
  const fileExtensionCompare = fileNameIn.substring(
    fileNameIn.lastIndexOf(".") + 1
  );
  console.log("fileExtensionCompare>", fileExtensionCompare);

  let fileName = fileNameIn.substring(0, fileNameIn.lastIndexOf("."));
  console.log("fileName>", fileName);

  fileName = fileName + Date.now();
  console.log("fileName>", fileName);

  const newFileName = fileName.replace(/ /g, "_") + fileExtension;
  console.log("NEWFILENAME:", newFileName);

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
