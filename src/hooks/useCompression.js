import { useState } from "react";
import { compressImage } from "../utils/compress";

export default function useCompression() {

  const [processedImages, setProcessedImages] =
    useState([]);

  const handleCompress = async (
    images,
    quality,
    setLoading,
    setProgress
  ) => {

    // No Images
    if (!images || images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    try {

      setLoading(true);
      setProgress(0);

      const results = [];

      for (let i = 0; i < images.length; i++) {

        const currentImage = images[i];

        const compressedImage =
          await compressImage(
            currentImage.file,
            quality / 100
          );

        results.push({

          original: currentImage,

          compressed: compressedImage,

          originalSize:
            currentImage.file.size,

          compressedSize:
            compressedImage.size,

          saved:
            currentImage.file.size -
            compressedImage.size,

          percentage: Number(
            (
              ((currentImage.file.size -
                compressedImage.size) /
                currentImage.file.size) *
              100
            ).toFixed(1)
          ),

        });

        setProgress(
          Math.round(
            ((i + 1) / images.length) * 100
          )
        );

      }

      setProcessedImages(results);

    }

    catch (error) {

      console.error(error);

      alert(
        "Compression failed. Please try another image."
      );

    }

    finally {

      setLoading(false);

      setProgress(0);

    }

  };

  return {

    processedImages,

    setProcessedImages,

    handleCompress,

  };

}