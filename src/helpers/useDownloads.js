import { downloadZip } from "../utils/downloadZip";

export default function useDownloads() {

  const downloadCompressedZip = async (
    processedImages
  ) => {

    const files = processedImages.map(
      (item) => item.compressed
    );

    await downloadZip(
      files,
      "compressed-images"
    );
  };

  const downloadResizedZip = async (
    resizedImages
  ) => {

    const files = resizedImages.map(
      (item) => item.resized
    );

    await downloadZip(
      files,
      "resized-images"
    );
  };

  const downloadConvertedZip = async (
    convertedImages
  ) => {

    const files = convertedImages.map(
      (item) => item.converted
    );

    await downloadZip(
      files,
      "converted-images"
    );
  };

  return {

    downloadCompressedZip,

    downloadResizedZip,

    downloadConvertedZip,

  };

}