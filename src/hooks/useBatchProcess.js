import { useState } from "react";

import { resizeImage } from "../utils/resize";
import { compressImage } from "../utils/compress";
import { convertImage } from "../utils/convert";
import { addWatermark } from "../utils/watermark";

const MAX_BATCH_IMAGES = 5;

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
  // Batch Limit Modal
  // ===========================

  const [isLimitModalOpen, setIsLimitModalOpen] =
    useState(false);

  const [pendingCount, setPendingCount] =
    useState(0);

  const [pendingParams, setPendingParams] =
    useState(null);

  // ===========================
  // Core Processing Loop
  // (runs on whatever image array it's given)
  // ===========================

  const runBatch = async (

    imagesToProcess,

    width,

    height,

    quality,

    format,

    watermarkText,

    setLoading,

    setProgress

  ) => {

    try {

      setLoading(true);

      setProgress(0);

      const results = [];

      for (let i = 0; i < imagesToProcess.length; i++) {

        console.log("==================================");
        console.log("Processing:", imagesToProcess[i].file.name);

        let currentFile = imagesToProcess[i].file;

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

          original: imagesToProcess[i],

          processed: currentFile,

          originalSize:
            imagesToProcess[i].file.size,

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

            ((i + 1) / imagesToProcess.length) * 100

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

  // ===========================
  // Entry Point (checks the limit first)
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

    if (images.length > MAX_BATCH_IMAGES) {

      setPendingCount(images.length);

      setPendingParams({
        images,
        width,
        height,
        quality,
        format,
        watermarkText,
        setLoading,
        setProgress,
      });

      setIsLimitModalOpen(true);

      return;

    }

    await runBatch(
      images,
      width,
      height,
      quality,
      format,
      watermarkText,
      setLoading,
      setProgress
    );

  };

  // ===========================
  // Called when the user accepts the
  // "process first 5 for free" option
  // ===========================

  const confirmLimitedBatch = async () => {

    setIsLimitModalOpen(false);

    if (!pendingParams) return;

    const {
      images,
      width,
      height,
      quality,
      format,
      watermarkText,
      setLoading,
      setProgress,
    } = pendingParams;

    await runBatch(
      images.slice(0, MAX_BATCH_IMAGES),
      width,
      height,
      quality,
      format,
      watermarkText,
      setLoading,
      setProgress
    );

    setPendingParams(null);

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

    // Limit modal

    isLimitModalOpen,
    pendingCount,
    confirmLimitedBatch,

  };

}