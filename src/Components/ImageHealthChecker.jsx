import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function ImageHealthChecker() {
  // =====================================================
  // STATE
  // =====================================================

  const [results, setResults] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);

  const [optimizingId, setOptimizingId] = useState(null);
  const [optimizingAll, setOptimizingAll] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [copiedFilename, setCopiedFilename] = useState(null);

  // =====================================================
  // IMAGE ANALYSIS
  // =====================================================

  const analyzeImages = useCallback((files) => {
    if (!files || files.length === 0) return;

    setAnalyzing(true);

    const imageFiles = files.filter((file) =>
      file.type.startsWith("image/")
    );

    const promises = imageFiles.map(
      (file) =>
        new Promise((resolve) => {
          const image = new Image();
          const preview = URL.createObjectURL(file);

          image.onload = () => {
            const width = image.naturalWidth;
            const height = image.naturalHeight;

            const sizeKB = file.size / 1024;
            const sizeMB = sizeKB / 1024;

            let score = 100;
            const recommendations = [];

            // =================================================
            // FILE SIZE
            // =================================================

            if (sizeMB > 5) {
              score -= 40;

              recommendations.push(
                "Compress this image because the file size is very large."
              );
            } else if (sizeMB > 2) {
              score -= 25;

              recommendations.push(
                "Consider compressing this image to improve loading speed."
              );
            } else if (sizeKB > 500) {
              score -= 10;

              recommendations.push(
                "Compression could make this image lighter for web use."
              );
            }

            // =================================================
            // FORMAT
            // =================================================

            const format = file.type
              .replace("image/", "")
              .toUpperCase();

            if (
              format === "PNG" ||
              format === "JPEG" ||
              format === "JPG"
            ) {
              recommendations.push(
                "WebP may provide a smaller file size while maintaining good quality."
              );
            }

            if (format === "BMP" || format === "TIFF") {
              score -= 20;

              recommendations.push(
                "Convert this image to WebP or JPEG for better web compatibility."
              );
            }

            // =================================================
            // DIMENSIONS
            // =================================================

            if (width > 3000 || height > 3000) {
              score -= 15;

              recommendations.push(
                "The dimensions are large. Resize the image if these dimensions are not required."
              );
            }

            if (width < 300 || height < 300) {
              score -= 5;

              recommendations.push(
                "The image has relatively small dimensions and may appear blurry when displayed large."
              );
            }

            // =================================================
            // SEO FILENAME
            // =================================================

            const fileName = file.name
              .split(".")[0]
              .toLowerCase();

            const genericNames = [
              "image",
              "photo",
              "img",
              "picture",
              "screenshot",
              "download",
              "file",
              "untitled",
            ];

            const hasGenericName = genericNames.some(
              (name) =>
                fileName === name ||
                fileName.startsWith(`${name}-`) ||
                fileName.startsWith(`${name}_`)
            );

            if (hasGenericName) {
              score -= 5;

              recommendations.push(
                "Use a descriptive filename containing relevant keywords for better image SEO."
              );
            }

            // =================================================
            // FINAL SCORE
            // =================================================

            score = Math.max(0, Math.min(100, score));

            let status = "Excellent";

            if (score < 85) {
              status = "Good";
            }

            if (score < 70) {
              status = "Could be optimized";
            }

            if (score < 50) {
              status = "Needs optimization";
            }

            if (recommendations.length === 0) {
              recommendations.push(
                "This image looks well optimized for typical web use."
              );
            }

            resolve({
              id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,

              name: file.name,

              size: file.size,

              sizeKB,

              sizeMB,

              width,

              height,

              format,

              score,

              status,

              recommendations,

              preview,

              file,

              optimizedBlob: null,

              optimizedPreview: null,

              optimizedSize: null,

              optimizedFormat: null,

              optimizedWidth: null,

              optimizedHeight: null,

              savings: null,
            });
          };

          image.onerror = () => {
            URL.revokeObjectURL(preview);
            resolve(null);
          };

          image.src = preview;
        })
    );

    Promise.all(promises).then((data) => {
      setResults(data.filter(Boolean));
      setAnalyzing(false);
    });
  }, []);

  // =====================================================
  // DROPZONE
  // =====================================================

  const onDrop = useCallback(
    (acceptedFiles) => {
      analyzeImages(acceptedFiles);
    },
    [analyzeImages]
  );

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,

      accept: {
        "image/*": [
          ".jpg",
          ".jpeg",
          ".png",
          ".webp",
          ".gif",
          ".bmp",
          ".tiff",
        ],
      },

      multiple: true,
    });

  // =====================================================
  // FORMAT SIZE
  // =====================================================

  const formatSize = (bytes) => {
    if (!bytes) return "0 B";

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // =====================================================
  // HEALTH SCORE CLASS
  // =====================================================

  const getScoreClass = (score) => {
    if (score >= 85) return "bg-success";
    if (score >= 70) return "bg-primary";
    if (score >= 50) return "bg-warning";

    return "bg-danger";
  };

  // =====================================================
  // SCORE COLOR
  // =====================================================

  const getScoreColor = (score) => {
    if (score >= 85) return "text-success";
    if (score >= 70) return "text-primary";
    if (score >= 50) return "text-warning";

    return "text-danger";
  };

  // =====================================================
  // SCORE BADGE
  // =====================================================

  const getScoreBadge = (score) => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Needs Improvement";

    return "Poor";
  };
  // =====================================================
// PART 5A - DETAILED HEALTH BREAKDOWN
// =====================================================

const calculateHealthBreakdown = (image) => {
  if (!image) {
    return {
      fileSize: 0,
      dimensions: 0,
      webFormat: 0,
      performance: 0,
      seo: 0,
      overall: 0,
    };
  }

  const fileSizeScore = (() => {
    const sizeMB = image.size / (1024 * 1024);

    if (sizeMB <= 0.5) return 100;
    if (sizeMB <= 1) return 95;
    if (sizeMB <= 2) return 85;
    if (sizeMB <= 3) return 70;
    if (sizeMB <= 5) return 50;

    return 25;
  })();

  const dimensionsScore = (() => {
    const maxDimension = Math.max(
      image.width,
      image.height
    );

    if (maxDimension <= 1200) return 100;
    if (maxDimension <= 2000) return 95;
    if (maxDimension <= 3000) return 85;
    if (maxDimension <= 4000) return 70;
    if (maxDimension <= 5000) return 50;

    return 30;
  })();

  const webFormatScore = (() => {
    if (image.format === "WEBP") {
      return 100;
    }

    if (image.format === "AVIF") {
      return 100;
    }

    if (
      image.format === "JPG" ||
      image.format === "JPEG"
    ) {
      return 80;
    }

    if (image.format === "PNG") {
      return 75;
    }

    if (image.format === "GIF") {
      return 60;
    }

    return 40;
  })();

  const performanceScore =
    calculatePerformanceScore(image);

  const seoScore =
    calculateSEOScore(image);

  const overall = Math.round(
    (
      fileSizeScore +
      dimensionsScore +
      webFormatScore +
      performanceScore +
      seoScore
    ) / 5
  );

  return {
    fileSize: fileSizeScore,
    dimensions: dimensionsScore,
    webFormat: webFormatScore,
    performance: performanceScore,
    seo: seoScore,
    overall,
  };
};
// =====================================================
// PART 5A - HEALTH LABEL
// =====================================================

const getHealthLabel = (score) => {
  if (score >= 90) {
    return "Excellent";
  }

  if (score >= 75) {
    return "Good";
  }

  if (score >= 60) {
    return "Needs Improvement";
  }

  return "Poor";
};

  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (status) => {
    if (status === "Excellent") {
      return "text-success";
    }

    if (status === "Good") {
      return "text-primary";
    }

    if (status === "Could be optimized") {
      return "text-warning";
    }

    return "text-danger";
  };

  // =====================================================
  // PERFORMANCE SCORE
  // =====================================================

  const calculatePerformanceScore = (image) => {
    let score = 100;

    const sizeMB = image.size / (1024 * 1024);

    if (sizeMB > 5) {
      score -= 45;
    } else if (sizeMB > 3) {
      score -= 30;
    } else if (sizeMB > 2) {
      score -= 20;
    } else if (sizeMB > 1) {
      score -= 10;
    }

    if (
      image.width > 4000 ||
      image.height > 4000
    ) {
      score -= 20;
    } else if (
      image.width > 3000 ||
      image.height > 3000
    ) {
      score -= 15;
    } else if (
      image.width > 2000 ||
      image.height > 2000
    ) {
      score -= 5;
    }

    return Math.max(0, Math.min(100, score));
  };

  // =====================================================
  // SEO SCORE
  // =====================================================

  const calculateSEOScore = (image) => {
    let score = 100;

    const fileName = image.name
      .split(".")[0]
      .toLowerCase();

    const genericNames = [
      "image",
      "img",
      "photo",
      "picture",
      "screenshot",
      "download",
      "file",
      "untitled",
    ];

    const hasGenericName = genericNames.some(
      (name) =>
        fileName === name ||
        fileName.startsWith(`${name}-`) ||
        fileName.startsWith(`${name}_`)
    );

    if (hasGenericName) {
      score -= 30;
    }

    if (
      /^dsc/i.test(fileName) ||
      /^img\d+/i.test(fileName) ||
      /^image\d+/i.test(fileName)
    ) {
      score -= 25;
    }

    if (fileName.length < 5) {
      score -= 15;
    }

    if (
      image.format !== "WEBP" &&
      image.format !== "AVIF"
    ) {
      score -= 20;
    }

    return Math.max(0, Math.min(100, score));
  };

  // =====================================================
  // WEB SCORE
  // =====================================================

  const calculateWebScore = (image) => {
    let score = 100;

    if (
      image.format !== "WEBP" &&
      image.format !== "AVIF"
    ) {
      score -= 25;
    }

    if (
      image.width > 3000 ||
      image.height > 3000
    ) {
      score -= 20;
    }

    if (image.sizeMB > 2) {
      score -= 25;
    } else if (image.sizeMB > 1) {
      score -= 10;
    }

    if (
      image.width < 300 ||
      image.height < 300
    ) {
      score -= 5;
    }

    return Math.max(0, Math.min(100, score));
  };

  // =====================================================
  // PART 5B - SMART OPTIMIZATION HELPERS
  // =====================================================

  const getOptimizationChanges = (image) => {
    if (!image || !image.optimizedBlob) return [];

    const changes = [];

    if (image.optimizedSize < image.size) {
      changes.push(`Reduced file size by ${image.savings}%`);
    } else {
      changes.push("Converted the image to a web-friendly format");
    }

    if (image.optimizedWidth && image.optimizedHeight &&
        (image.optimizedWidth !== image.width || image.optimizedHeight !== image.height)) {
      changes.push(`Resized to ${image.optimizedWidth} × ${image.optimizedHeight}px`);
    }

    if (image.format !== "WEBP") {
      changes.push("Converted to WebP for modern web delivery");
    }

    if (image.size > 1024 * 1024) {
      changes.push("Reduced the amount of data required for page loading");
    }

    return changes.length ? changes : ["Image was already close to web-ready"];
  };

  const getSuggestedFilename = (image) => {
    if (!image) return "optimized-image.webp";

    const baseName = image.name
      .replace(/\.[^/.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const safeName = baseName || "optimized-image";

    return `${safeName}-web-ready.webp`;
  };

  const getReadinessMessage = (score) => {
    if (score >= 90) return "Excellent — this image is ready for most websites.";
    if (score >= 75) return "Good — only minor improvements may be needed.";
    if (score >= 60) return "Fair — optimization is recommended before publishing.";
    return "Needs work — optimize this image before using it on a website.";
  };

  const copySuggestedFilename = async (image) => {
    const filename = getSuggestedFilename(image);

    try {
      await navigator.clipboard.writeText(filename);
      setCopiedFilename(image.id);
      setTimeout(() => setCopiedFilename(null), 1800);
    } catch (error) {
      console.error("Could not copy filename:", error);
    }
  };

  // =====================================================
  // OPTIMIZE SINGLE IMAGE
  // =====================================================

  const optimizeImage = async (imageData) => {
    if (!imageData || !imageData.file) return;

    setOptimizingId(imageData.id);

    try {
      const originalFile = imageData.file;

      const image = new Image();

      const sourceUrl =
        URL.createObjectURL(originalFile);

      image.src = sourceUrl;

      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
      });

      // =================================================
      // MAX DIMENSION
      // =================================================

      const MAX_DIMENSION = 2000;

      let newWidth = image.naturalWidth;
      let newHeight = image.naturalHeight;

      if (
        newWidth > MAX_DIMENSION ||
        newHeight > MAX_DIMENSION
      ) {
        const ratio = Math.min(
          MAX_DIMENSION / newWidth,
          MAX_DIMENSION / newHeight
        );

        newWidth = Math.round(
          newWidth * ratio
        );

        newHeight = Math.round(
          newHeight * ratio
        );
      }

      // =================================================
      // CANVAS
      // =================================================

      const canvas =
        document.createElement("canvas");

      canvas.width = newWidth;
      canvas.height = newHeight;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error(
          "Your browser does not support image processing."
        );
      }

      context.drawImage(
        image,
        0,
        0,
        newWidth,
        newHeight
      );

      // =================================================
      // WEBP OUTPUT
      // =================================================

      const quality = 0.82;

      const optimizedBlob =
        await new Promise((resolve) => {
          canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            "image/webp",
            quality
          );
        });

      if (!optimizedBlob) {
        throw new Error(
          "Your browser could not create the optimized image."
        );
      }

      // =================================================
      // PREVIEW
      // =================================================

      const optimizedPreview =
        URL.createObjectURL(
          optimizedBlob
        );

      // =================================================
      // SAVINGS
      // =================================================

      const originalSize =
        originalFile.size;

      const optimizedSize =
        optimizedBlob.size;

      const savings = Math.max(
        0,
        Math.round(
          ((originalSize - optimizedSize) /
            originalSize) *
            100
        )
      );

      // =================================================
      // UPDATE RESULT
      // =================================================

      setResults((currentResults) =>
        currentResults.map((item) => {
          if (item.id !== imageData.id) {
            return item;
          }

          if (item.optimizedPreview) {
            URL.revokeObjectURL(
              item.optimizedPreview
            );
          }

          return {
            ...item,

            optimizedBlob,

            optimizedPreview,

            optimizedSize,

            optimizedFormat: "WEBP",

            optimizedWidth: newWidth,

            optimizedHeight: newHeight,

            savings,
          };
        })
      );

      URL.revokeObjectURL(sourceUrl);
    } catch (error) {
      console.error(
        "Image optimization failed:",
        error
      );

      alert(
        "Sorry, this image could not be optimized. Please try another image."
      );
    } finally {
      setOptimizingId(null);
    }
  };

  // =====================================================
  // OPTIMIZE ALL IMAGES
  // =====================================================

  const optimizeAllImages = async () => {
    if (!results || results.length === 0) {
      return;
    }

    setOptimizingAll(true);
    setOptimizationProgress(0);

    try {
      for (let i = 0; i < results.length; i++) {
        const image = results[i];

        if (!image.optimizedBlob) {
          await optimizeImage(image);
        }

        const progressValue = Math.round(
          ((i + 1) / results.length) * 100
        );

        setOptimizationProgress(
          progressValue
        );
      }
    } catch (error) {
      console.error(
        "Batch optimization failed:",
        error
      );
    } finally {
      setOptimizingAll(false);
    }
  };

  // =====================================================
  // DOWNLOAD OPTIMIZED IMAGE
  // =====================================================

  const downloadOptimizedImage = (
    imageData
  ) => {
    if (!imageData.optimizedBlob) {
      return;
    }

    const url = URL.createObjectURL(
      imageData.optimizedBlob
    );

    const link =
      document.createElement("a");

    link.href = url;

    link.download = getSuggestedFilename(imageData);

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };

  // =====================================================
  // CLEAR RESULTS
  // =====================================================

  const clearResults = () => {
    results.forEach((image) => {
      if (image.preview) {
        URL.revokeObjectURL(
          image.preview
        );
      }

      if (image.optimizedPreview) {
        URL.revokeObjectURL(
          image.optimizedPreview
        );
      }
    });

    setResults([]);

    setOptimizationProgress(0);
  };

  // =====================================================
  // SUMMARY
  // =====================================================

  const totalSize = results.reduce(
    (total, image) =>
      total + image.size,
    0
  );

  const optimizedImages =
    results.filter(
      (image) =>
        image.optimizedBlob
    );

  const optimizedTotalSize =
    optimizedImages.reduce(
      (total, image) =>
        total + image.optimizedSize,
      0
    );

  const originalOptimizedSize =
    optimizedImages.reduce(
      (total, image) =>
        total + image.size,
      0
    );

  const totalSavings =
    optimizedImages.length > 0 &&
    originalOptimizedSize > 0
      ? Math.max(
          0,
          Math.round(
            ((originalOptimizedSize -
              optimizedTotalSize) /
              originalOptimizedSize) *
              100
          )
        )
      : 0;

  const averageScore =
    results.length > 0
      ? Math.round(
          results.reduce(
            (total, image) =>
              total + image.score,
            0
          ) / results.length
        )
      : 0;

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section className="container py-5">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="text-center mb-5">

        <span className="badge bg-primary px-3 py-2 mb-3">
          ⚡ Website Performance Tool
        </span>

        <h1 className="display-5 fw-bold">
          Image Health Checker
        </h1>

        <p
          className="lead text-muted mx-auto"
          style={{
            maxWidth: 760,
          }}
        >
          Check image size, dimensions, format,
          performance and basic SEO factors.
          Then optimize your image instantly.
        </p>

      </div>

      {/* =================================================
          UPLOAD
      ================================================= */}

      <div
        {...getRootProps()}
        className={`border border-2 rounded-4 p-5 text-center ${
          isDragActive
            ? "border-success bg-success bg-opacity-10"
            : "border-primary bg-light"
        }`}
        style={{
          cursor: "pointer",
          minHeight: 240,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          transition: "all .2s ease",
        }}
      >

        <input {...getInputProps()} />

        <div style={{ fontSize: 55 }}>
          {isDragActive ? "📥" : "🩺"}
        </div>

        <h3 className="fw-bold mt-3">
          {isDragActive
            ? "Drop your images here"
            : "Check Your Image Health"}
        </h3>

        <p className="text-muted mb-3">
          Drag & drop images here or click to browse
        </p>

        <button
          type="button"
          className="btn btn-primary rounded-pill px-4"
        >
          📁 Select Images
        </button>

        <small className="text-muted mt-3">
          JPG, PNG, WebP, GIF, BMP and TIFF
        </small>

      </div>

      {/* =================================================
          ANALYZING
      ================================================= */}

      {analyzing && (
        <div className="text-center mt-5">

          <div
            className="spinner-border text-primary"
            role="status"
          />

          <p className="fw-semibold mt-3">
            Analyzing your images...
          </p>

        </div>
      )}

      {/* =================================================
          RESULTS
      ================================================= */}

      {results.length > 0 &&
        !analyzing && (
          <>

            {/* =================================================
                SUMMARY
            ================================================= */}

            <div className="row g-4 mt-5">

              <div className="col-md-3">

                <div className="card border-0 shadow-sm rounded-4 h-100">

                  <div className="card-body text-center p-4">

                    <div className="fs-1">
                      🖼️
                    </div>

                    <h3 className="fw-bold">
                      {results.length}
                    </h3>

                    <p className="text-muted mb-0">
                      Images Checked
                    </p>

                  </div>

                </div>

              </div>

              <div className="col-md-3">

                <div className="card border-0 shadow-sm rounded-4 h-100">

                  <div className="card-body text-center p-4">

                    <div className="fs-1">
                      📦
                    </div>

                    <h3 className="fw-bold">
                      {formatSize(totalSize)}
                    </h3>

                    <p className="text-muted mb-0">
                      Total Size
                    </p>

                  </div>

                </div>

              </div>

              <div className="col-md-3">

                <div className="card border-0 shadow-sm rounded-4 h-100">

                  <div className="card-body text-center p-4">

                    <div className="fs-1">
                      ❤️
                    </div>

                    <h3 className="fw-bold">
                      {averageScore}/100
                    </h3>

                    <p className="text-muted mb-0">
                      Health Score
                    </p>

                  </div>

                </div>

              </div>

              <div className="col-md-3">

                <div className="card border-0 shadow-sm rounded-4 h-100">

                  <div className="card-body text-center p-4">

                    <div className="fs-1">
                      🚀
                    </div>

                    <h3 className="fw-bold text-success">
                      {totalSavings}%
                    </h3>

                    <p className="text-muted mb-0">
                      Saved
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                REPORT HEADER
            ================================================= */}

            <div className="mt-5 mb-4">

              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

                <div>

                  <h2 className="fw-bold mb-1">
                    Image Health Report
                  </h2>

                  <p className="text-muted mb-0">
                    Find problems and optimize each image.
                  </p>

                </div>

                <div className="d-flex flex-wrap gap-2">

                  <button
                    className="btn btn-primary rounded-pill px-4"
                    onClick={
                      optimizeAllImages
                    }
                    disabled={
                      optimizingAll ||
                      results.every(
                        (image) =>
                          image.optimizedBlob
                      )
                    }
                  >

                    {optimizingAll ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        />

                        Optimizing{" "}
                        {
                          optimizationProgress
                        }%
                      </>
                    ) : (
                      <>
                        🛠️ Fix All Images
                      </>
                    )}

                  </button>

                  <button
                    className="btn btn-outline-danger rounded-pill"
                    onClick={
                      clearResults
                    }
                  >
                    Clear Results
                  </button>

                </div>

              </div>

              {optimizingAll && (
                <div className="mt-3">

                  <div
                    className="progress"
                    style={{
                      height: 10,
                    }}
                  >

                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      style={{
                        width: `${optimizationProgress}%`,
                      }}
                    />

                  </div>

                  <small className="text-muted">
                    Optimizing your images...
                  </small>

                </div>
              )}

            </div>

            {/* =================================================
                IMAGE CARDS
            ================================================= */}

            <div className="row g-4">

              {results.map((image) => {
                const health = calculateHealthBreakdown(image);

                const performanceScore =
                  calculatePerformanceScore(
                    image
                  );

                const seoScore =
                  calculateSEOScore(
                    image
                  );

                const webScore =
                  calculateWebScore(
                    image
                  );

                return (
                  <div
                    className="col-lg-6"
                    key={image.id}
                  >

                    <div className="card border-0 shadow-sm rounded-4 h-100">

                      <div className="card-body p-4">

                        {/* =================================================
                            ORIGINAL IMAGE
                        ================================================= */}

                        <div className="d-flex gap-3">

                          <img
                            src={image.preview}
                            alt={image.name}
                            className="rounded-3"
                            style={{
                              width: 110,
                              height: 110,
                              objectFit: "cover",
                            }}
                          />

                          <div className="flex-grow-1">

                            <h5
                              className="fw-bold text-truncate"
                              title={image.name}
                            >
                              {image.name}
                            </h5>

                            <div className="small text-muted mb-2">
                              {image.format}
                            </div>

                            <div className="small text-muted">
                              📐 {image.width} ×{" "}
                              {image.height}
                            </div>

                            <div className="fw-bold mt-2">
                              📦{" "}
                              {formatSize(
                                image.size
                              )}
                            </div>

                          </div>

                        </div>

                        {/* =================================================
                            HEALTH SCORE
                        ================================================= */}

                        <div className="mt-4">

                          <div className="d-flex justify-content-between mb-2">

                            <span className="fw-semibold">
                              Health Score
                            </span>

                            <span
                              className={`fw-bold ${getScoreColor(
                                image.score
                              )}`}
                            >
                              {image.score}/100
                            </span>

                          </div>

                          <div
                            className="progress"
                            style={{
                              height: 10,
                            }}
                          >

                            <div
                              className={`progress-bar ${getScoreClass(
                                image.score
                              )}`}
                              style={{
                                width: `${image.score}%`,
                              }}
                            />

                          </div>

                          <div className="mt-2">

                            <span
                              className={`badge ${getScoreClass(
                                image.score
                              )}`}
                            >
                              {getScoreBadge(
                                image.score
                              )}
                            </span>

                          </div>

                        </div>

                        {/* =================================================
                            STATUS
                        ================================================= */}

                        <div className="mt-4">

                          <span
                            className={`fw-bold ${getStatusClass(
                              image.status
                            )}`}
                          >
                            ● {image.status}
                          </span>

                        </div>

                        {/* =================================================
                            DETAILED SCORES
                        ================================================= */}

                        <div className="mt-4">

                          <h6 className="fw-bold mb-3">
                            📊 Detailed Analysis
                          </h6>

                          {/* Performance */}

                          <div className="mb-3">

                            <div className="d-flex justify-content-between mb-1">

                              <span>
                                ⚡ Performance
                              </span>

                              <strong
                                className={getScoreColor(
                                  performanceScore
                                )}
                              >
                                {
                                  performanceScore
                                }/100
                              </strong>

                            </div>

                            <div
                              className="progress"
                              style={{
                                height: 7,
                              }}
                            >

                              <div
                                className={`progress-bar ${getScoreClass(
                                  performanceScore
                                )}`}
                                style={{
                                  width: `${performanceScore}%`,
                                }}
                              />

                            </div>

                          </div>

                          {/* SEO */}

                          <div className="mb-3">

                            <div className="d-flex justify-content-between mb-1">

                              <span>
                                🔍 SEO
                              </span>

                              <strong
                                className={getScoreColor(
                                  seoScore
                                )}
                              >
                                {seoScore}/100
                              </strong>

                            </div>

                            <div
                              className="progress"
                              style={{
                                height: 7,
                              }}
                            >

                              <div
                                className={`progress-bar ${getScoreClass(
                                  seoScore
                                )}`}
                                style={{
                                  width: `${seoScore}%`,
                                }}
                              />

                            </div>

                          </div>

                          {/* Web */}

                          <div>

                            <div className="d-flex justify-content-between mb-1">

                              <span>
                                🌐 Web Ready
                              </span>

                              <strong
                                className={getScoreColor(
                                  webScore
                                )}
                              >
                                {webScore}/100
                              </strong>

                            </div>

                            <div
                              className="progress"
                              style={{
                                height: 7,
                              }}
                            >

                              <div
                                className={`progress-bar ${getScoreClass(
                                  webScore
                                )}`}
                                style={{
                                  width: `${webScore}%`,
                                }}
                              />

                            </div>

                          </div>

                        </div>

                        {/* =================================================
                            CHECKLIST
                        ================================================= */}

                        <div className="mt-4">

                          <div className="d-flex justify-content-between py-2 border-bottom">

                            <span>
                              📦 File Size
                            </span>

                            <strong>
                              {image.sizeMB <=
                              2
                                ? "✓ Good"
                                : "⚠ Large"}
                            </strong>

                          </div>

                          <div className="d-flex justify-content-between py-2 border-bottom">

                            <span>
                              📐 Dimensions
                            </span>

                            <strong>
                              {image.width <=
                                3000 &&
                              image.height <=
                                3000
                                ? "✓ Good"
                                : "⚠ Large"}
                            </strong>

                          </div>

                          <div className="d-flex justify-content-between py-2 border-bottom">

                            <span>
                              🌐 Web Format
                            </span>

                            <strong>
                              {image.format ===
                              "WEBP"
                                ? "✓ WebP"
                                : "⚠ Consider WebP"}
                            </strong>

                          </div>

                          <div className="d-flex justify-content-between py-2">

                            <span>
                              🔍 SEO Filename
                            </span>

                            <strong>
                              {image.name
                                .split(
                                  "."
                                )[0]
                                .length >=
                              5
                                ? "✓ Descriptive"
                                : "⚠ Improve"}
                            </strong>

                          </div>

                        </div>

                        {/* =================================================
                            RECOMMENDATIONS
                        ================================================= */}

                        <div className="alert alert-light border mt-4">

                          <strong>
                            💡 Recommendations
                          </strong>

                          <ul className="mb-0 mt-2">

                            {image.recommendations.map(
                              (
                                recommendation,
                                index
                              ) => (

                                <li
                                  key={
                                    index
                                  }
                                  className="mb-1 text-muted"
                                >
                                  {
                                    recommendation
                                  }
                                </li>

                              )
                            )}

                          </ul>

                        </div>

                        {/* =================================================
                            FIX BUTTON
                        ================================================= */}

                        {!image.optimizedBlob && (

                          <button
                            className="btn btn-primary btn-lg w-100 rounded-pill mt-2"
                            onClick={() =>
                              optimizeImage(
                                image
                              )
                            }
                            disabled={
                              optimizingId ===
                              image.id
                            }
                          >

                            {optimizingId ===
                            image.id ? (
                              <>
                                <span
                                  className="spinner-border spinner-border-sm me-2"
                                  role="status"
                                />

                                Optimizing Image...
                              </>
                            ) : (
                              <>
                                🛠️ Fix My Image
                              </>
                            )}

                          </button>

                        )}

                        {/* =================================================
                            BEFORE / AFTER
                        ================================================= */}

                        {image.optimizedBlob && (

                          <div className="mt-4">

                            <div className="alert alert-success">

                              <h5 className="fw-bold">
                                ✅ Optimization Complete
                              </h5>

                              <div className="row text-center mt-3">

                                <div className="col-6">

                                  <div className="small text-muted">
                                    Before
                                  </div>

                                  <div className="fw-bold fs-5">
                                    {formatSize(
                                      image.size
                                    )}
                                  </div>

                                </div>

                                <div className="col-6">

                                  <div className="small text-muted">
                                    After
                                  </div>

                                  <div className="fw-bold fs-5 text-success">
                                    {formatSize(
                                      image.optimizedSize
                                    )}
                                  </div>

                                </div>

                              </div>

                              <div className="text-center mt-3">

                                <span className="badge bg-success fs-6 px-3 py-2">
                                  🎉{" "}
                                  {
                                    image.savings
                                  }
                                  % smaller
                                </span>

                              </div>

                            </div>

                            {/* =================================================
                                COMPARISON
                            ================================================= */}

                            <div className="row g-3">

                              <div className="col-6">

                                <div className="small fw-bold mb-2">
                                  Original
                                </div>

                                <img
                                  src={
                                    image.preview
                                  }
                                  alt="Original"
                                  className="img-fluid rounded-3 border"
                                  style={{
                                    width:
                                      "100%",
                                    height: 180,
                                    objectFit:
                                      "contain",
                                    background:
                                      "#f8f9fa",
                                  }}
                                />

                              </div>

                              <div className="col-6">

                                <div className="small fw-bold mb-2 text-success">
                                  Optimized WebP
                                </div>

                                <img
                                  src={
                                    image.optimizedPreview
                                  }
                                  alt="Optimized"
                                  className="img-fluid rounded-3 border"
                                  style={{
                                    width:
                                      "100%",
                                    height: 180,
                                    objectFit:
                                      "contain",
                                    background:
                                      "#f8f9fa",
                                  }}
                                />

                              </div>

                            </div>

                            {/* =================================================
                                OPTIMIZED DETAILS
                            ================================================= */}

                            <div className="mt-3 p-3 rounded-3 bg-light">

                              <div className="d-flex justify-content-between">

                                <span>
                                  Format
                                </span>

                                <strong>
                                  WebP
                                </strong>

                              </div>

                              <div className="d-flex justify-content-between mt-2">

                                <span>
                                  Dimensions
                                </span>

                                <strong>
                                  {
                                    image.optimizedWidth
                                  }{" "}
                                  ×{" "}
                                  {
                                    image.optimizedHeight
                                  }
                                </strong>

                              </div>

                              <div className="d-flex justify-content-between mt-2">

                                <span>
                                  File Size
                                </span>

                                <strong>
                                  {formatSize(
                                    image.optimizedSize
                                  )}
                                </strong>

                              </div>

                            </div>

                            {/* =================================================
                                PART 5B - WHAT WAS FIXED
                            ================================================= */}

                            <div className="mt-3 p-3 border rounded-3">
                              <h6 className="fw-bold mb-2">🛠️ What We Fixed</h6>
                              <ul className="mb-0 ps-3">
                                {getOptimizationChanges(image).map((change, index) => (
                                  <li key={index} className="text-muted mb-1">
                                    {change}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="mt-3 p-3 bg-light rounded-3">
                              <div className="small text-muted mb-1">Suggested SEO-friendly filename</div>
                              <div className="d-flex flex-column flex-sm-row gap-2 align-items-stretch">
                                <code className="flex-grow-1 p-2 bg-white border rounded text-break">
                                  {getSuggestedFilename(image)}
                                </code>
                                <button
                                  type="button"
                                  className="btn btn-outline-primary"
                                  onClick={() => copySuggestedFilename(image)}
                                >
                                  {copiedFilename === image.id ? "✓ Copied" : "Copy"}
                                </button>
                              </div>
                              <small className="text-muted d-block mt-2">
                                Use descriptive, readable words instead of generic names such as image.jpg or IMG1234.jpg.
                              </small>
                            </div>

                            {/* =================================================
                                DOWNLOAD
                            ================================================= */}

                            <button
                              className="btn btn-success btn-lg w-100 rounded-pill mt-3"
                              onClick={() =>
                                downloadOptimizedImage(
                                  image
                                )
                              }
                            >
                              ⬇️ Download Optimized Image
                            </button>

                          </div>

                        )}

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

            {/* =================================================
                OPTIMIZATION SUMMARY
            ================================================= */}

            {optimizedImages.length > 0 && (

              <div className="card border-0 shadow-sm rounded-4 mt-5">

                <div className="card-body text-center p-4">

                  <h4 className="fw-bold">
                    🎉 Optimization Summary
                  </h4>

                  <div className="row g-3 mt-2">

                    <div className="col-md-4">

                      <div className="p-3 bg-light rounded-3">

                        <div className="text-muted">
                          Images Optimized
                        </div>

                        <div className="fs-3 fw-bold">
                          {
                            optimizedImages.length
                          }
                        </div>

                      </div>

                    </div>

                    <div className="col-md-4">

                      <div className="p-3 bg-light rounded-3">

                        <div className="text-muted">
                          Optimized Size
                        </div>

                        <div className="fs-3 fw-bold">
                          {formatSize(
                            optimizedTotalSize
                          )}
                        </div>

                      </div>

                    </div>

                    <div className="col-md-4">

                      <div className="p-3 bg-success bg-opacity-10 rounded-3">

                        <div className="text-muted">
                          Total Saved
                        </div>

                        <div className="fs-3 fw-bold text-success">
                          {totalSavings}%
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            )}

            {/* =================================================
                PART 5B - WEB READINESS SUMMARY
            ================================================= */}

            {optimizedImages.length > 0 && (
              <div className="card border-0 shadow-sm rounded-4 mt-4">
                <div className="card-body p-4">
                  <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
                    <div>
                      <h4 className="fw-bold mb-1">🚀 Web Readiness</h4>
                      <p className="text-muted mb-0">
                        Your optimized images are lighter and better prepared for website use.
                      </p>
                    </div>
                    <span className="badge bg-success align-self-start px-3 py-2">
                      {optimizedImages.length} Ready
                    </span>
                  </div>

                  <div className="row g-3 mt-2">
                    {optimizedImages.map((image) => {
                      const optimizedHealth = calculateHealthBreakdown({
                        ...image,
                        size: image.optimizedSize,
                        sizeMB: image.optimizedSize / (1024 * 1024),
                        width: image.optimizedWidth,
                        height: image.optimizedHeight,
                        format: image.optimizedFormat || "WEBP",
                      }).overall;

                      return (
                        <div className="col-md-6" key={`ready-${image.id}`}>
                          <div className="border rounded-4 p-3 h-100">
                            <div className="d-flex justify-content-between align-items-center gap-2">
                              <strong className="text-truncate" title={image.name}>
                                {image.name}
                              </strong>
                              <span className={`fw-bold ${getScoreColor(optimizedHealth)}`}>
                                {optimizedHealth}/100
                              </span>
                            </div>
                            <div className="progress mt-2" style={{ height: 7 }}>
                              <div
                                className={`progress-bar ${getScoreClass(optimizedHealth)}`}
                                style={{ width: `${optimizedHealth}%` }}
                              />
                            </div>
                            <small className="text-muted d-block mt-2">
                              {getReadinessMessage(optimizedHealth)}
                            </small>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* =================================================
                CTA
            ================================================= */}

            <div className="text-center mt-5 p-5 bg-primary bg-opacity-10 rounded-4">

              <h3 className="fw-bold">
                🚀 Make Your Images Web Ready
              </h3>

              <p
                className="text-muted mx-auto"
                style={{
                  maxWidth: 650,
                }}
              >
                Optimize image dimensions,
                reduce file size and convert
                images to modern WebP format
                before publishing them online.
              </p>

              <div className="d-flex justify-content-center flex-wrap gap-2">

                <a
                  href="/compress-image"
                  className="btn btn-primary rounded-pill px-4"
                >
                  🗜️ Compress
                </a>

                <a
                  href="/resize-image"
                  className="btn btn-outline-primary rounded-pill px-4"
                >
                  📏 Resize
                </a>

                <a
                  href="/convert-image"
                  className="btn btn-outline-primary rounded-pill px-4"
                >
                  🔄 Convert
                </a>

              </div>

            </div>

          </>
        )}

      {/* =================================================
          PRIVACY
      ================================================= */}

      <div className="text-center mt-5">

        <small className="text-muted">
          🔒 Your images are processed directly
          in your browser. They are not uploaded
          to a server.
        </small>

      </div>

    </section>
  );
}

export default ImageHealthChecker;