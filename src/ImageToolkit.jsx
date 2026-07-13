// =======================
// React
// =======================
import { useState, useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Components/Navbar";
// =======================
// Layout Components
// =======================
import Hero from "./Components/Hero";
import DashboardStats from "./Components/DashboardStats";
import "./styles/resultCards.css";
import Footer from "./Components/Footer";
// =======================
// Main Components
// =======================
import DropZone from "./Components/DropZone";
import ImagePreview from "./Components/ImagePreview";
import ImageCropper from "./Components/ImageCropper";
import ToolkitControls from "./Components/ToolkitControls";

// =======================
// Result Components
// =======================
import CompressionResults from "./Components/results/CompressionResults";
import ResizeResults from "./Components/results/ResizeResults";
import ConvertResults from "./Components/results/ConvertResults";
import RotateResults from "./Components/results/RotateResults";
import FlipResults from "./Components/results/FlipResults";
import FilterResults from "./Components/results/FilterResults";
import WatermarkResults from "./Components/results/WatermarkResults";
import BatchResults from "./Components/results/BatchResults";
import ImageComparison from "./Components/ImageComparison";

// =======================
// Hooks
// =======================
import useCompression from "./hooks/useCompression";
import useResize from "./hooks/useResize";
import useConvert from "./hooks/useConvert";
import useRotate from "./hooks/useRotate";
import useFlip from "./hooks/useFlip";
import useCrop from "./hooks/useCrop";
import useWatermark from "./hooks/useWatermark";
import useFilters from "./hooks/useFilters";
import useBatchProcess from "./hooks/useBatchProcess";
import useDownloads from "./helpers/useDownloads";

function App({ defaultTool = "compress" }) {

  // =======================
  // Uploaded Images
  // =======================
  const [images, setImages] = useState([]);
  

  // =======================
  // UI States
  // =======================
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // =======================
  // Compression
  // =======================
  const {
    processedImages,
    handleCompress,
    setProcessedImages,
  } = useCompression();

  const [quality, setQuality] = useState(80);

  // =======================
  // Resize
  // =======================
  const {
    resizedImages,
    handleResize,
    setResizedImages,
  } = useResize();

  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);

  // =======================
  // Convert
  // =======================
  const {
    convertedImages,
    handleConvert,
    setConvertedImages,
  } = useConvert();

  const [format, setFormat] = useState("webp");

  // =======================
  // Rotate
  // =======================
  const {
    rotatedImages,
    handleRotate,
    setRotatedImages,
  } = useRotate();

  // =======================
  // Flip
  // =======================
  const {
    flippedImages,
    handleFlip,
    setFlippedImages,
  } = useFlip();

  // =======================
  // Crop
  // =======================
  const {
    selectedImage,
    setSelectedImage,
    crop,
    setCrop,
    zoom,
    setZoom,
    croppedImage,
    setCroppedImage,
    onCropComplete,
    handleCrop,
  } = useCrop();

  const [croppedImagePreview, setCroppedImagePreview] = useState(null);

  useEffect(() => {
    if (!croppedImage) {
      setCroppedImagePreview(null);
      return;
    }

    const url = URL.createObjectURL(croppedImage);
    setCroppedImagePreview(url);

    return () => URL.revokeObjectURL(url);
  }, [croppedImage]);

  // =======================
  // Watermark
  // =======================
  const {
    watermarkText,
    setWatermarkText,
    watermarkedImages,
    setWatermarkedImages,
    handleWatermark,
  } = useWatermark();

  // =======================
  // Filters
  // =======================
  const {
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
  } = useFilters();

  // =======================
  // Batch Processing
  // =======================
  const {
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
  } = useBatchProcess();

  // =======================
  // Downloads
  // =======================
  const {
    downloadCompressedZip,
    downloadResizedZip,
    downloadConvertedZip,
  } = useDownloads();

  // =======================
  // Helper Functions
  // =======================

  const clearResults = () => {
    setProcessedImages([]);
    setResizedImages([]);
    setConvertedImages([]);
    setRotatedImages([]);
    setFlippedImages([]);
    setFilteredImages([]);
    setWatermarkedImages([]);
    setBatchResults([]);
  };

  const resetFilters = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setBlur(0);
    setGrayscale(0);
    setSepia(0);
  };

  const resetCrop = () => {
    setZoom(1);
    setCrop({
      x: 0,
      y: 0,
    });
    setSelectedImage(null);
    setCroppedImage(null);
  };

  // =======================
  // Remove All Images
  // =======================
  const removeAllImages = () => {

    images.forEach((image) =>
      URL.revokeObjectURL(image.preview)
    );

    setImages([]);

    clearResults();

    resetCrop();
  };

  // =======================
  // Reset Toolkit
  // =======================
  const resetTool = () => {

    removeAllImages();

    setLoading(false);
    setProgress(0);

    setQuality(80);

    setWidth(800);
    setHeight(600);

    setFormat("webp");

    resetFilters();

    setWatermarkText("");
  };
// Debug (Remove before deployment)
// console.log(selectedImage);
const [comparisonAfterImage, setComparisonAfterImage] = useState(null);

useEffect(() => {
  if (!processedImages || processedImages.length === 0) {
    setComparisonAfterImage(null);
    return;
  }

  const url = URL.createObjectURL(processedImages[0].compressed);
  setComparisonAfterImage(url);

  return () => URL.revokeObjectURL(url);
}, [processedImages]);
  return (
  <>
    <div className="container-xl py-5">
    {/* =======================
        Hero
    ======================== */}
    

    {/* =======================
        Upload Section
    ======================== */}
    <section className="toolkit-section mb-5">

      <DropZone
        images={images}
        setImages={setImages}
      />

    </section>

    {/* =======================
        Dashboard
    ======================== */}
    <section className="mb-5">

      <DashboardStats
        images={images}
        processedImages={processedImages}
        resizedImages={resizedImages}
        convertedImages={convertedImages}
        rotatedImages={rotatedImages}
        flippedImages={flippedImages}
        filteredImages={filteredImages}
        watermarkedImages={watermarkedImages}
        batchResults={batchResults}
      />

    </section>

    {/* =======================
        Toolkit Controls
    ======================== */}
    <section className="toolkit-section mb-5">

      <ToolkitControls
    defaultTab={defaultTool}
        quality={quality}
        setQuality={setQuality}

        width={width}
        setWidth={setWidth}

        height={height}
        setHeight={setHeight}

        format={format}
        setFormat={setFormat}

        brightness={brightness}
        setBrightness={setBrightness}

        contrast={contrast}
        setContrast={setContrast}

        saturation={saturation}
        setSaturation={setSaturation}

        blur={blur}
        setBlur={setBlur}

        grayscale={grayscale}
        setGrayscale={setGrayscale}

        sepia={sepia}
        setSepia={setSepia}

        watermarkText={watermarkText}
        setWatermarkText={setWatermarkText}

        batchResize={batchResize}
        setBatchResize={setBatchResize}

        batchCompress={batchCompress}
        setBatchCompress={setBatchCompress}

        batchConvert={batchConvert}
        setBatchConvert={setBatchConvert}

        batchWatermark={batchWatermark}
        setBatchWatermark={setBatchWatermark}

        onCompress={() =>
          handleCompress(
            images,
            quality,
            setLoading,
            setProgress
          )
        }

        onResize={() =>
          handleResize(
            images,
            width,
            height,
            setLoading,
            setProgress
          )
        }

        onConvert={() =>
          handleConvert(
            images,
            format,
            setLoading,
            setProgress
          )
        }

        onRotate={(angle) =>
          handleRotate(
            images,
            angle,
            setLoading,
            setProgress
          )
        }

        onFlip={(direction) =>
          handleFlip(
            images,
            direction,
            setLoading,
            setProgress
          )
        }

        onApply={() =>
          handleFilters(
            images,
            setLoading,
            setProgress
          )
        }

        onWatermark={() =>
          handleWatermark(
            images,
            setLoading,
            setProgress
          )
        }

        onBatchProcess={() =>
          handleBatchProcess(
            images,
            width,
            height,
            quality,
            format,
            watermarkText,
            setLoading,
            setProgress
          )
        }

        loading={loading}

      />

    </section>

    {/* =======================
        Uploaded Images
    ======================== */}
    {images.length > 0 && (

      <section className="toolkit-section mb-5">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h3 className="fw-bold mb-0">
            📷 Uploaded Images
          </h3>

          <span className="badge bg-primary fs-6">
            {images.length} Images
          </span>

        </div>

        <ImagePreview
          images={images}
          setImages={setImages}
          setSelectedImage={setSelectedImage}
        />

      </section>

    )}

    {/* =======================
        Crop Section
    ======================== */}
    {selectedImage && (

      <section className="toolkit-section mb-5">

        <h3 className="fw-bold mb-4">
          ✂️ Crop Image
        </h3>

        <ImageCropper
          image={selectedImage}
          crop={crop}
          setCrop={setCrop}
          zoom={zoom}
          setZoom={setZoom}
          onCropComplete={onCropComplete}
        />

        <button
          className="btn btn-success btn-lg mt-4"
          onClick={handleCrop}
        >
          ✂️ Crop Image
        </button>

        {croppedImage && (

          <div className="mt-5">

            <h4 className="fw-bold mb-3">
              Cropped Result
            </h4>

            <img
              src={croppedImagePreview}
              alt="Cropped"
              className="img-fluid rounded shadow"
              loading="lazy"
              decoding="async"
            />

            <div className="mt-3">

              <a
                href={croppedImagePreview}
                download="cropped-image.jpg"
                className="btn btn-primary"
              >
                ⬇ Download Cropped Image
              </a>

            </div>

          </div>

        )}

      </section>

    )}

         {/* =======================
        Action Buttons
    ======================== */}
    {images.length > 0 && (

      <section className="toolkit-section mb-5">

        <div className="d-flex flex-wrap gap-3 justify-content-center">

          <button
            className="btn btn-danger btn-lg px-4"
            onClick={removeAllImages}
          >
            🗑 Remove All Images
          </button>

          <button
            className="btn btn-outline-secondary btn-lg px-4"
            onClick={resetTool}
          >
            🔄 Reset Toolkit
          </button>

        </div>

      </section>

    )}

    {/* =======================
        Loading
    ======================== */}
    {loading && (

      <section className="toolkit-section mb-5">

        <div className="text-center">

          <div
            className="spinner-border text-primary mb-3"
            style={{
              width: "3rem",
              height: "3rem",
            }}
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <h5 className="fw-bold">
            Processing Images...
          </h5>

          <p className="text-muted">
            Please wait while your images are being processed.
          </p>

        </div>

        <div className="progress mt-4">

          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            style={{
              width: `${progress}%`,
            }}
          >
            {progress}%
          </div>

        </div>

      </section>

    )}

    {/* =======================
        Results
    ======================== */}

    <CompressionResults
      processedImages={processedImages}
      downloadCompressedZip={() =>
        downloadCompressedZip(processedImages)
      }
    />
    <ImageComparison
  title="Compression Comparison"
  before={
    processedImages.length
      ? processedImages[0].original.preview
      : null
  }
  after={comparisonAfterImage}
/>


    <ResizeResults
      resizedImages={resizedImages}
      downloadResizedZip={() =>
        downloadResizedZip(resizedImages)
      }
    />

    <ConvertResults
      convertedImages={convertedImages}
      downloadConvertedZip={() =>
        downloadConvertedZip(convertedImages)
      }
    />

    <RotateResults
      rotatedImages={rotatedImages}
    />

    <FlipResults
      flippedImages={flippedImages}
    />

    <FilterResults
      filteredImages={filteredImages}
    />

    <WatermarkResults
      watermarkedImages={watermarkedImages}
    />

    <BatchResults
      batchResults={batchResults}
    />

    {/* =======================
        Footer
    ======================== */}

    

  </div>
  <ToastContainer
  position="top-right"
  autoClose={2500}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  draggable
  theme="colored"
/>
  </>
);

}

export default App;