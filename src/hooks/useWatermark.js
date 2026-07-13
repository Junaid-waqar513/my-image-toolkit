import { useState } from "react";
import { addWatermark } from "../utils/watermark";

export default function useWatermark() {

  // ===========================
  // Watermark Text
  // ===========================

  const [watermarkText, setWatermarkText] =
    useState("");

  // ===========================
  // Results
  // ===========================

  const [
    watermarkedImages,
    setWatermarkedImages,
  ] = useState([]);

  // ===========================
  // Apply Watermark
  // ===========================

  const handleWatermark = async (

    images,

    setLoading,

    setProgress

  ) => {

    // Validation

    if (!images || images.length === 0) {

      alert("Please upload at least one image.");

      return;

    }

    if (!watermarkText.trim()) {

      alert("Please enter watermark text.");

      return;

    }

    try {

      setLoading(true);

      setProgress(0);

      const results = [];

      for (let i = 0; i < images.length; i++) {

        const currentImage = images[i];

        const watermarkedImage =
          await addWatermark(

            currentImage.file,

            watermarkText

          );

        results.push({

          original: currentImage,

          watermarked: watermarkedImage,

          watermarkText,

          originalSize:
            currentImage.file.size,

          watermarkedSize:
            watermarkedImage.size,

        });

        setProgress(

          Math.round(

            ((i + 1) / images.length) * 100

          )

        );

      }

      setWatermarkedImages(results);

    }

    catch (error) {

      console.error(

        "Watermark Error:",

        error

      );

      alert(

        "Failed to apply watermark."

      );

    }

    finally {

      setLoading(false);

      setProgress(0);

    }

  };

  return {

    watermarkText,
    setWatermarkText,

    watermarkedImages,
    setWatermarkedImages,

    handleWatermark,

  };

}