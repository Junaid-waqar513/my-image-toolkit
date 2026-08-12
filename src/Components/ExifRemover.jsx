import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import exifr from "exifr";

function ExifRemover() {
  // =====================================================
  // STATE
  // =====================================================

  const [results, setResults] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [removingAll, setRemovingAll] = useState(false);

  // =====================================================
  // FORMAT HELPERS
  // =====================================================

  const formatSize = (bytes) => {
    if (!bytes) return "0 B";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatGPS = (lat, lon) => {
    if (lat == null || lon == null) return null;
    const latDir = lat >= 0 ? "N" : "S";
    const lonDir = lon >= 0 ? "E" : "W";
    return `${Math.abs(lat).toFixed(5)}° ${latDir}, ${Math.abs(lon).toFixed(5)}° ${lonDir}`;
  };

  // =====================================================
  // METADATA SCAN
  // =====================================================

  const scanImages = useCallback((files) => {
    if (!files || files.length === 0) return;

    setScanning(true);

    const imageFiles = files.filter((file) =>
      file.type.startsWith("image/")
    );

    const promises = imageFiles.map(
      (file) =>
        new Promise((resolve) => {
          const preview = URL.createObjectURL(file);
          const image = new Image();

          image.onload = async () => {
            const width = image.naturalWidth;
            const height = image.naturalHeight;

            let metadata = null;

            try {
              const parsed = await exifr.parse(file, {
                gps: true,
                exif: true,
                ifd0: true,
              });

              if (parsed) {
                metadata = {
                  make: parsed.Make || null,
                  model: parsed.Model || null,
                  dateTaken: parsed.DateTimeOriginal
                    ? new Date(parsed.DateTimeOriginal).toLocaleString()
                    : null,
                  gps: formatGPS(parsed.latitude, parsed.longitude),
                  software: parsed.Software || null,
                  lens: parsed.LensModel || null,
                };
              }
            } catch (error) {
              // No EXIF data, or the format doesn't carry any.
              metadata = null;
            }

            const hasMetadata =
              metadata &&
              Object.values(metadata).some((value) => value !== null);

            resolve({
              id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
              name: file.name,
              size: file.size,
              format: file.type.replace("image/", "").toUpperCase(),
              width,
              height,
              preview,
              file,
              metadata: hasMetadata ? metadata : null,
              cleanedBlob: null,
              cleanedPreview: null,
              cleanedSize: null,
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
      setResults((current) => [...current, ...data.filter(Boolean)]);
      setScanning(false);
    });
  }, []);

  // =====================================================
  // DROPZONE
  // =====================================================

  const onDrop = useCallback(
    (acceptedFiles) => {
      scanImages(acceptedFiles);
    },
    [scanImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp"],
    },
    multiple: true,
  });

  // =====================================================
  // REMOVE METADATA (redraw to canvas — this naturally
  // strips all EXIF/metadata since canvas never carries it)
  // =====================================================

  const removeMetadata = async (imageData) => {
    if (!imageData || !imageData.file) return;

    setRemovingId(imageData.id);

    try {
      const image = new Image();
      const sourceUrl = URL.createObjectURL(imageData.file);
      image.src = sourceUrl;

      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Your browser does not support image processing.");
      }

      context.drawImage(image, 0, 0);

      const originalMime = imageData.file.type || "image/jpeg";
      const outputMime = originalMime === "image/gif" ? "image/png" : originalMime;

      const cleanedBlob = await new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), outputMime, 0.95);
      });

      if (!cleanedBlob) {
        throw new Error("Your browser could not process this image.");
      }

      const cleanedPreview = URL.createObjectURL(cleanedBlob);

      setResults((current) =>
        current.map((item) => {
          if (item.id !== imageData.id) return item;

          if (item.cleanedPreview) {
            URL.revokeObjectURL(item.cleanedPreview);
          }

          return {
            ...item,
            cleanedBlob,
            cleanedPreview,
            cleanedSize: cleanedBlob.size,
          };
        })
      );

      URL.revokeObjectURL(sourceUrl);
    } catch (error) {
      console.error("Metadata removal failed:", error);
      alert("Sorry, this image could not be processed. Please try another image.");
    } finally {
      setRemovingId(null);
    }
  };

  const removeAllMetadata = async () => {
    if (!results || results.length === 0) return;

    setRemovingAll(true);

    try {
      for (const image of results) {
        if (!image.cleanedBlob) {
          await removeMetadata(image);
        }
      }
    } finally {
      setRemovingAll(false);
    }
  };

  // =====================================================
  // DOWNLOAD
  // =====================================================

  const getCleanFilename = (imageData) => {
    const baseName = imageData.name.replace(/\.[^/.]+$/, "");
    const extension = imageData.file.type.split("/")[1] || "jpg";
    return `${baseName}-clean.${extension}`;
  };

  const downloadCleaned = (imageData) => {
    if (!imageData.cleanedBlob) return;

    const url = URL.createObjectURL(imageData.cleanedBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = getCleanFilename(imageData);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const downloadAllCleaned = () => {
    results.forEach((image) => {
      if (image.cleanedBlob) {
        downloadCleaned(image);
      }
    });
  };

  // =====================================================
  // CLEAR
  // =====================================================

  const clearResults = () => {
    results.forEach((image) => {
      if (image.preview) URL.revokeObjectURL(image.preview);
      if (image.cleanedPreview) URL.revokeObjectURL(image.cleanedPreview);
    });
    setResults([]);
  };

  // =====================================================
  // SUMMARY
  // =====================================================

  const imagesWithMetadata = results.filter((image) => image.metadata);
  const imagesWithGPS = results.filter((image) => image.metadata?.gps);
  const cleanedImages = results.filter((image) => image.cleanedBlob);

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section className="container py-5">
      {/* HEADER */}
      <div className="text-center mb-5">
        <span className="badge bg-primary px-3 py-2 mb-3">
          🔒 Privacy Tool
        </span>

        <h1 className="display-5 fw-bold">
          EXIF Metadata Remover
        </h1>

        <p className="lead text-muted mx-auto" style={{ maxWidth: 760 }}>
          Remove hidden EXIF data — including camera info and GPS
          location — from your photos. Everything happens in your
          browser; your images are never uploaded.
        </p>
      </div>

      {/* UPLOAD */}
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
          {isDragActive ? "📥" : "🕵️"}
        </div>

        <h3 className="fw-bold mt-3">
          {isDragActive ? "Drop your images here" : "Check for Hidden Metadata"}
        </h3>

        <p className="text-muted mb-3">
          Drag & drop images here or click to browse
        </p>

        <button type="button" className="btn btn-primary rounded-pill px-4">
          📁 Select Images
        </button>

        <small className="text-muted mt-3">
          JPG, PNG, WebP, GIF and BMP
        </small>
      </div>

      {/* SCANNING */}
      {scanning && (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="fw-semibold mt-3">Scanning for metadata...</p>
        </div>
      )}

      {/* RESULTS */}
      {results.length > 0 && !scanning && (
        <>
          {/* SUMMARY */}
          <div className="row g-4 mt-5">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body text-center p-4">
                  <div className="fs-1">🖼️</div>
                  <h3 className="fw-bold">{results.length}</h3>
                  <p className="text-muted mb-0">Images Checked</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body text-center p-4">
                  <div className="fs-1">⚠️</div>
                  <h3 className="fw-bold text-warning">
                    {imagesWithMetadata.length}
                  </h3>
                  <p className="text-muted mb-0">Contain Metadata</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body text-center p-4">
                  <div className="fs-1">📍</div>
                  <h3 className="fw-bold text-danger">
                    {imagesWithGPS.length}
                  </h3>
                  <p className="text-muted mb-0">Contain GPS Location</p>
                </div>
              </div>
            </div>
          </div>

          {imagesWithGPS.length > 0 && (
            <div className="alert alert-warning border-0 mt-4">
              📍 <strong>{imagesWithGPS.length}</strong> image
              {imagesWithGPS.length === 1 ? "" : "s"} contain
              {imagesWithGPS.length === 1 ? "s" : ""} embedded GPS
              location data revealing where the photo was taken.
              Remove metadata before sharing publicly if you want to
              keep this private.
            </div>
          )}

          {/* ACTION BAR */}
          <div className="mt-5 mb-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <h2 className="fw-bold mb-1">Metadata Report</h2>
              <p className="text-muted mb-0">
                Review what's hidden in each image, then remove it.
              </p>
            </div>

            <div className="d-flex flex-wrap gap-2">
              <button
                className="btn btn-primary rounded-pill px-4"
                onClick={removeAllMetadata}
                disabled={removingAll || results.every((img) => img.cleanedBlob)}
              >
                {removingAll ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    Removing...
                  </>
                ) : (
                  "🧹 Remove All Metadata"
                )}
              </button>

              {cleanedImages.length > 0 && (
                <button
                  className="btn btn-success rounded-pill px-4"
                  onClick={downloadAllCleaned}
                >
                  ⬇️ Download All Cleaned
                </button>
              )}

              <button
                className="btn btn-outline-danger rounded-pill"
                onClick={clearResults}
              >
                Clear Results
              </button>
            </div>
          </div>

          {/* IMAGE CARDS */}
          <div className="row g-4">
            {results.map((image) => (
              <div className="col-lg-6" key={image.id}>
                <div className="card border-0 shadow-sm rounded-4 h-100">
                  <div className="card-body p-4">
                    <div className="d-flex gap-3">
                      <img
                        src={image.preview}
                        alt={image.name}
                        className="rounded-3"
                        style={{ width: 90, height: 90, objectFit: "cover" }}
                      />

                      <div className="flex-grow-1">
                        <h5 className="fw-bold text-truncate" title={image.name}>
                          {image.name}
                        </h5>
                        <div className="small text-muted">
                          {image.format} · {image.width} × {image.height}
                        </div>
                        <div className="fw-bold mt-1">{formatSize(image.size)}</div>
                      </div>
                    </div>

                    {/* METADATA FOUND */}
                    <div className="mt-4">
                      {image.metadata ? (
                        <div className="border rounded-3 p-3 bg-light">
                          <div className="fw-semibold mb-2">
                            📋 Metadata Found
                          </div>

                          <ul className="mb-0 ps-3 small">
                            {image.metadata.make && (
                              <li>Camera Make: {image.metadata.make}</li>
                            )}
                            {image.metadata.model && (
                              <li>Camera Model: {image.metadata.model}</li>
                            )}
                            {image.metadata.dateTaken && (
                              <li>Date Taken: {image.metadata.dateTaken}</li>
                            )}
                            {image.metadata.lens && (
                              <li>Lens: {image.metadata.lens}</li>
                            )}
                            {image.metadata.software && (
                              <li>Software: {image.metadata.software}</li>
                            )}
                            {image.metadata.gps && (
                              <li className="text-danger fw-semibold">
                                📍 GPS Location: {image.metadata.gps}
                              </li>
                            )}
                          </ul>
                        </div>
                      ) : (
                        <div className="alert alert-success mb-0 py-2 small">
                          ✓ No metadata found in this image.
                        </div>
                      )}
                    </div>

                    {/* REMOVE BUTTON */}
                    {!image.cleanedBlob && image.metadata && (
                      <button
                        className="btn btn-primary btn-lg w-100 rounded-pill mt-3"
                        onClick={() => removeMetadata(image)}
                        disabled={removingId === image.id}
                      >
                        {removingId === image.id ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" />
                            Removing Metadata...
                          </>
                        ) : (
                          "🧹 Remove Metadata"
                        )}
                      </button>
                    )}

                    {/* CLEANED RESULT */}
                    {image.cleanedBlob && (
                      <div className="mt-3">
                        <div className="alert alert-success mb-3">
                          ✅ Metadata removed —{" "}
                          <strong>{formatSize(image.cleanedSize)}</strong>{" "}
                          clean file ready.
                        </div>

                        <button
                          className="btn btn-success btn-lg w-100 rounded-pill"
                          onClick={() => downloadCleaned(image)}
                        >
                          ⬇️ Download Clean Image
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-5 p-5 bg-primary bg-opacity-10 rounded-4">
            <h3 className="fw-bold">🚀 Prepare Your Images Fully</h3>
            <p className="text-muted mx-auto" style={{ maxWidth: 650 }}>
              After removing metadata, compress and resize your images
              for the best combination of privacy and performance.
            </p>

            <div className="d-flex justify-content-center flex-wrap gap-2">
              <a href="/compress-image" className="btn btn-primary rounded-pill px-4">
                🗜️ Compress
              </a>
              <a href="/resize-image" className="btn btn-outline-primary rounded-pill px-4">
                📏 Resize
              </a>
            </div>
          </div>
        </>
      )}

      {/* PRIVACY */}
      <div className="text-center mt-5">
        <small className="text-muted">
          🔒 Your images are processed directly in your browser. They
          are not uploaded to a server.
        </small>
      </div>
    </section>
  );
}

export default ExifRemover;