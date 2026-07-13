import imageCompression from "browser-image-compression";

export async function compressImage(file, quality = 0.8) {
  try {
    const options = {
      maxSizeMB: 5,
      maxWidthOrHeight: 4000,
      initialQuality: quality,
      useWebWorker: true,
      fileType: file.type,
    };

    const compressedFile = await imageCompression(
      file,
      options
    );

    return compressedFile;

  } catch (error) {

    console.error(
      "Compression Error:",
      error
    );

    return file;
  }
}