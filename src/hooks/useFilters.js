import { useState } from "react";
import { applyFilters } from "../utils/applyFilters";

export default function useFilters() {

  // ===========================
  // Filter Values
  // ===========================

  const [brightness, setBrightness] =
    useState(100);

  const [contrast, setContrast] =
    useState(100);

  const [saturation, setSaturation] =
    useState(100);

  const [blur, setBlur] =
    useState(0);

  const [grayscale, setGrayscale] =
    useState(0);

  const [sepia, setSepia] =
    useState(0);

  // ===========================
  // Results
  // ===========================

  const [filteredImages, setFilteredImages] =
    useState([]);

  // ===========================
  // Apply Filters
  // ===========================

  const handleFilters = async (

    images,

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

        const filteredImage =
          await applyFilters(

            currentImage.file,

            {

              brightness,

              contrast,

              saturation,

              blur,

              grayscale,

              sepia,

            }

          );

        results.push({

          original: currentImage,

          filtered: filteredImage,

          originalSize:
            currentImage.file.size,

          filteredSize:
            filteredImage.size,

          filters: {

            brightness,

            contrast,

            saturation,

            blur,

            grayscale,

            sepia,

          },

        });

        setProgress(

          Math.round(

            ((i + 1) / images.length) * 100

          )

        );

      }

      setFilteredImages(results);

    }

    catch (error) {

      console.error(

        "Filter Error:",

        error

      );

      alert(

        "Failed to apply filters."

      );

    }

    finally {

      setLoading(false);

      setProgress(0);

    }

  };

  return {

    brightness,
    setBrightness,

    contrast,
    setContrast,

    saturation,
    setSaturation,

    blur,
    setBlur,

    grayscale,
    setGrayscale,

    sepia,
    setSepia,

    filteredImages,
    setFilteredImages,

    handleFilters,

  };

}