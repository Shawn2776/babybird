import imageCompression from "browser-image-compression";

async function handleImageUpload(image) {
  const imageFile = image;

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);

    if (compressedFile.size > imageFile.size) {
      console.log("Compressed file is larger than original, aborting");
      return;
    }

    if (!compressedFile) {
      console.log("Compression failed, aborting");
      return;
    }

    return compressedFile;
  } catch (error) {
    console.log(error);
  }
}

export default handleImageUpload;
