import { useState } from "react";
import { flipImage } from "../utils/flipImage";

export default function useFlip() {

  const [flippedImages, setFlippedImages] =
    useState([]);

  const handleFlip = async (

    images,

    direction,

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
      // Flip Images
      // ===========================

      for (let i = 0; i < images.length; i++) {

        const currentImage = images[i];

        const flippedImage =
          await flipImage(

            currentImage.file,

            direction

          );

        results.push({

          original: currentImage,

          flipped: flippedImage,

          direction,

          originalSize:
            currentImage.file.size,

          flippedSize:
            flippedImage.size,

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

      setFlippedImages(results);

    }

    catch (error) {

      console.error(

        "Flip Error:",

        error

      );

      alert(

        "Image flip failed."

      );

    }

    finally {

      setLoading(false);

      setProgress(0);

    }

  };

  return {

    flippedImages,

    setFlippedImages,

    handleFlip,

  };

}