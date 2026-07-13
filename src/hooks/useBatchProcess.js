import { useState } from "react";

import { resizeImage } from "../utils/resize";
import { compressImage } from "../utils/compress";
import { convertImage } from "../utils/convert";
import { addWatermark } from "../utils/watermark";

export default function useBatchProcess() {

  // ===========================
  // Batch Options
  // ===========================

  const [batchResize, setBatchResize] =
    useState(false);

  const [batchCompress, setBatchCompress] =
    useState(false);

  const [batchConvert, setBatchConvert] =
    useState(false);

  const [batchWatermark, setBatchWatermark] =
    useState(false);

  // ===========================
  // Results
  // ===========================

  const [batchResults, setBatchResults] =
    useState([]);

  // ===========================
  // Batch Processing
  // ===========================

  const handleBatchProcess = async (

    images,

    width,

    height,

    quality,

    format,

    watermarkText,

    setLoading,

    setProgress

  ) => {

    if (!images || images.length === 0) {

      alert("Please upload at least one image.");

      return;

    }

    if (

      !batchResize &&
      !batchCompress &&
      !batchConvert &&
      !batchWatermark

    ) {

      alert(
        "Please select at least one batch operation."
      );

      return;

    }

    try {

      setLoading(true);

      setProgress(0);

      const results = [];

      for (let i = 0; i < images.length; i++) {

        console.log("==================================");
console.log("Processing:", images[i].file.name);

let currentFile = images[i].file;
        // Resize

        if (batchResize) {
  console.log("➡ Starting Resize");

  currentFile = await resizeImage(
    currentFile,
    width,
    height
  );

  console.log("✅ Resize Completed");
}
        // Compress

       if (batchCompress) {
  console.log("➡ Starting Compression");

  currentFile = await compressImage(
    currentFile,
    quality / 100
  );

  console.log("✅ Compression Completed");
}

        // Convert

        if (batchConvert) {
  console.log("➡ Starting Convert");

  currentFile = await convertImage(
    currentFile,
    format
  );

  console.log("✅ Convert Completed");
}

        // Watermark

       if (
  batchWatermark &&
  watermarkText.trim()
) {
  console.log("➡ Starting Watermark");

  currentFile = await addWatermark(
    currentFile,
    watermarkText
  );

  console.log("✅ Watermark Completed");
}
console.log("🎉 Image Finished");
        results.push({

          original: images[i],

          processed: currentFile,

          originalSize:
            images[i].file.size,

          processedSize:
            currentFile.size,

          operations: {

            resize: batchResize,

            compress: batchCompress,

            convert: batchConvert,

            watermark: batchWatermark,

          },

        });

        setProgress(

          Math.round(

            ((i + 1) / images.length) * 100

          )

        );

      }

      setBatchResults(results);

    }

    catch (error) {

      console.error(

        "Batch Processing Error:",

        error

      );

      alert(

        "Batch processing failed."

      );

    }

    finally {

      setLoading(false);

      setProgress(0);

    }

  };

  return {

    batchResize,
    setBatchResize,

    batchCompress,
    setBatchCompress,

    batchConvert,
    setBatchConvert,

    batchWatermark,
    setBatchWatermark,

    batchResults,
    setBatchResults,

    handleBatchProcess,

  };

}