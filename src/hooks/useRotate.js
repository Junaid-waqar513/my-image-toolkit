import { useState } from "react";
import { rotateImage } from "../utils/rotateImage";

export default function useRotate() {

  const [rotatedImages, setRotatedImages] =
    useState([]);

  const handleRotate = async (

    images,

    angle,

    setLoading,

    setProgress

  ) => {

    // ===========================
    // Validation
    // ===========================

    if (!images || images.length === 0) {

      alert("Please upload at least one image.");

      return;

    }

    try {

      setLoading(true);

      setProgress(0);

      const results = [];

      // ===========================
      // Rotate Images
      // ===========================

      for (let i = 0; i < images.length; i++) {

        const currentImage = images[i];

        const rotatedImage =
          await rotateImage(

            currentImage.file,

            angle

          );

        results.push({

          original: currentImage,

          rotated: rotatedImage,

          angle,

          originalSize:
            currentImage.file.size,

          rotatedSize:
            rotatedImage.size,

        });

        setProgress(

          Math.round(

            ((i + 1) / images.length) * 100

          )

        );

      }

      // ===========================
      // Save Results
      // ===========================

      setRotatedImages(results);

    }

    catch (error) {

      console.error(

        "Rotate Error:",

        error

      );

      alert(

        "Image rotation failed."

      );

    }

    finally {

      setLoading(false);

      setProgress(0);

    }

  };

  return {

    rotatedImages,

    setRotatedImages,

    handleRotate,

  };

}