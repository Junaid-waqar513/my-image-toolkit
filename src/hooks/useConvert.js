import { useState } from "react";
import { convertImage } from "../utils/convert";

export default function useConvert() {

  const [convertedImages, setConvertedImages] =
    useState([]);

  const handleConvert = async (

    images,

    format,

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
      // Convert Images
      // ===========================

      for (let i = 0; i < images.length; i++) {

        const currentImage = images[i];

        const convertedImage =
          await convertImage(

            currentImage.file,

            format

          );

        results.push({

          original: currentImage,

          converted: convertedImage,

          format,

          originalSize:
            currentImage.file.size,

          convertedSize:
            convertedImage.size,

          originalType:
            currentImage.file.type,

          convertedType:
            convertedImage.type,

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

      setConvertedImages(results);

    }

    catch (error) {

      console.error(

        "Convert Error:",

        error

      );

      alert(

        "Image conversion failed."

      );

    }

    finally {

      setLoading(false);

      setProgress(0);

    }

  };

  return {

    convertedImages,

    setConvertedImages,

    handleConvert,

  };

}