import { useState } from "react";
import { resizeImage } from "../utils/resize";

export default function useResize() {

  const [resizedImages, setResizedImages] =
    useState([]);

  const handleResize = async (

    images,

    width,

    height,

    setLoading,

    setProgress

  ) => {

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

        const resizedImage =
          await resizeImage(

            currentImage.file,

            width,

            height

          );

        results.push({

          original: currentImage,

          resized: resizedImage,

          width,

          height,

          originalSize:
            currentImage.file.size,

          resizedSize:
            resizedImage.size,

        });

        setProgress(

          Math.round(

            ((i + 1) / images.length) * 100

          )

        );

      }

      setResizedImages(results);

    }

    catch (error) {

      console.error(error);

      alert("Image resize failed.");

    }

    finally {

      setLoading(false);

      setProgress(0);

    }

  };

  return {

    resizedImages,

    setResizedImages,

    handleResize,

  };

}