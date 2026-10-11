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

// Compresses to a specific target file size (in KB) rather than a quality
// percentage. browser-image-compression iterates quality internally until
// the output is at or under maxSizeMB, which is exactly what a "compress to
// exactly 50KB" style tool needs — no manual binary search required.
export async function compressToTargetSize(file, targetKB) {
  try {
    const options = {
      maxSizeMB: targetKB / 1024,
      maxWidthOrHeight: 4000,
      useWebWorker: true,
      fileType: file.type,
      // Give the internal search more attempts than the library default so
      // it can get closer to the target on images that compress unevenly.
      maxIteration: 15,
    };

    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("Target-size compression error:", error);
    return file;
  }
}