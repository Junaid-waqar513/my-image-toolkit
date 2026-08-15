import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { jsPDF } from "jspdf";

// =====================================================
// CONSTANTS
// =====================================================

const PAGE_SIZES = {
  a4: { label: "A4", width: 210, height: 297 },
  letter: { label: "Letter", width: 216, height: 279 },
  original: { label: "Original Image Size", width: null, height: null },
};

const MARGINS = {
  none: 0,
  small: 10,
  medium: 20,
  large: 30,
};

// Assume 96 DPI to convert pixel dimensions to millimeters
const pxToMm = (px) => (px * 25.4) / 96;

function ImageToPDF() {
  // =====================================================
  // STATE
  // =====================================================

  const [images, setImages] = useState([]);
  const [pageSize, setPageSize] = useState("a4");
  const [orientation, setOrientation] = useState("auto");
  const [fit, setFit] = useState("fit");
  const [margin, setMargin] = useState("small");
  const [filename, setFilename] = useState("image-to-pdf");
  const [generating, setGenerating] = useState(false);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);

  // =====================================================
  // FORMAT HELPERS
  // =====================================================

  const formatSize = (bytes) => {
    if (!bytes) return "0 B";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // =====================================================
  // ADD IMAGES
  // =====================================================

  const addImages = useCallback((files) => {
    if (!files || files.length === 0) return;

    setError(null);

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length === 0) {
      setError("Please select JPG, PNG or WEBP image files.");
      return;
    }

    const promises = imageFiles.map(
      (file) =>
        new Promise((resolve) => {
          const preview = URL.createObjectURL(file);
          const image = new Image();

          image.onload = () => {
            resolve({
              id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
              file,
              preview,
              name: file.name,
              size: file.size,
              width: image.naturalWidth,
              height: image.naturalHeight,
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
      setImages((current) => [...current, ...data.filter(Boolean)]);
      setPdfBlob(null);
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    });
  }, [pdfUrl]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      addImages(acceptedFiles);
    },
    [addImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".webp"],
    },
    multiple: true,
  });

  // =====================================================
  // REORDER / REMOVE
  // =====================================================

  const moveImage = (index, direction) => {
    setImages((current) => {
      const next = [...current];
      const targetIndex = index + direction;

      if (targetIndex < 0 || targetIndex >= next.length) return current;

      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
  };

  const removeImage = (id) => {
    setImages((current) => {
      const target = current.find((image) => image.id === id);
      if (target?.preview) URL.revokeObjectURL(target.preview);
      return current.filter((image) => image.id !== id);
    });
    setPdfBlob(null);
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfUrl(null);
  };

  const clearAll = () => {
    images.forEach((image) => {
      if (image.preview) URL.revokeObjectURL(image.preview);
    });
    setImages([]);
    setPdfBlob(null);
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfUrl(null);
    setError(null);
  };

  // =====================================================
  // PDF GENERATION
  // =====================================================

  const resolvePageOrientation = (image) => {
    if (orientation === "portrait") return "portrait";
    if (orientation === "landscape") return "landscape";
    // auto: base it on the image's own aspect ratio
    return image.width >= image.height ? "landscape" : "portrait";
  };

  const resolvePageDimensions = (image, pageOrientation) => {
    if (pageSize === "original") {
      const w = pxToMm(image.width);
      const h = pxToMm(image.height);
      return pageOrientation === "landscape"
        ? [Math.max(w, h), Math.min(w, h)]
        : [Math.min(w, h), Math.max(w, h)];
    }

    const base = PAGE_SIZES[pageSize];
    return pageOrientation === "landscape"
      ? [base.height, base.width]
      : [base.width, base.height];
  };

  const generatePdf = async () => {
    if (images.length === 0) return;

    setGenerating(true);
    setError(null);

    try {
      const marginMm = MARGINS[margin];
      let doc = null;

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const pageOrientation = resolvePageOrientation(image);
        const [pageWidth, pageHeight] = resolvePageDimensions(image, pageOrientation);

        if (i === 0) {
          doc = new jsPDF({
            orientation: pageOrientation,
            unit: "mm",
            format: [pageWidth, pageHeight],
          });
        } else {
          doc.addPage([pageWidth, pageHeight], pageOrientation);
        }

        const printableWidth = pageWidth - marginMm * 2;
        const printableHeight = pageHeight - marginMm * 2;

        const imageAspect = image.width / image.height;

        let drawWidth;
        let drawHeight;

        if (fit === "original") {
          drawWidth = pxToMm(image.width);
          drawHeight = pxToMm(image.height);
        } else if (fit === "fill") {
          drawWidth = printableWidth;
          drawHeight = printableHeight;
        } else {
          // fit === "fit" (default): scale to fit within printable area,
          // preserving aspect ratio
          const scale = Math.min(
            printableWidth / image.width,
            printableHeight / image.height
          );
          drawWidth = image.width * scale;
          drawHeight = image.height * scale;
        }

        const x = (pageWidth - drawWidth) / 2;
        const y = (pageHeight - drawHeight) / 2;

        // jsPDF needs a data URL, not a blob URL
        // eslint-disable-next-line no-await-in-loop
        const dataUrl = await fileToDataUrl(image.file);

        const format = image.file.type.includes("png") ? "PNG" : "JPEG";

        doc.addImage(dataUrl, format, x, y, drawWidth, drawHeight);
      }

      const blob = doc.output("blob");
      const url = URL.createObjectURL(blob);

      setPdfBlob(blob);
      setPdfUrl(url);
    } catch (err) {
      console.error("PDF generation failed:", err);
      setError(
        "Something went wrong creating your PDF. Try removing very large images and generating again."
      );
    } finally {
      setGenerating(false);
    }
  };

  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // =====================================================
  // DOWNLOAD
  // =====================================================

  const downloadPdf = () => {
    if (!pdfBlob) return;

    const safeFilename = (filename || "image-to-pdf").trim() || "image-to-pdf";
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${safeFilename}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const convertAnother = () => {
    clearAll();
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section className="container py-5">
      {/* HEADER */}
      <div className="text-center mb-5">
        <span className="badge bg-primary px-3 py-2 mb-3">📄 Document Tool</span>

        <h1 className="display-5 fw-bold">Image to PDF Converter</h1>

        <p className="lead text-muted mx-auto" style={{ maxWidth: 760 }}>
          Convert JPG, PNG and other images into a PDF document online for
          free. Combine multiple images into one PDF and download it
          instantly. Your files are processed directly in your browser.
        </p>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* UPLOAD */}
      {!pdfBlob && (
        <div
          {...getRootProps()}
          className={`border border-2 rounded-4 p-5 text-center ${
            isDragActive
              ? "border-success bg-success bg-opacity-10"
              : "border-primary bg-light"
          }`}
          style={{
            cursor: "pointer",
            minHeight: 220,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            transition: "all .2s ease",
          }}
        >
          <input {...getInputProps()} aria-label="Upload images to convert to PDF" />

          <div style={{ fontSize: 55 }}>{isDragActive ? "📥" : "📄"}</div>

          <h3 className="fw-bold mt-3">
            {isDragActive ? "Drop your images here" : "Drop Images Here"}
          </h3>

          <p className="text-muted mb-3">or click to browse</p>

          <button type="button" className="btn btn-primary rounded-pill px-4">
            📁 Choose Images
          </button>

          <small className="text-muted mt-3">JPG, PNG and WEBP</small>
        </div>
      )}

      {/* IMAGE LIST */}
      {images.length > 0 && !pdfBlob && (
        <>
          <div className="d-flex justify-content-between align-items-center mt-5 mb-3">
            <h2 className="h4 fw-bold mb-0">
              {images.length} Image{images.length === 1 ? "" : "s"} Selected
            </h2>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger rounded-pill"
              onClick={clearAll}
            >
              Clear All
            </button>
          </div>

          <div className="row g-3">
            {images.map((image, index) => (
              <div className="col-md-6" key={image.id}>
                <div className="card border-0 shadow-sm rounded-4">
                  <div className="card-body p-3 d-flex gap-3 align-items-center">
                    <img
                      src={image.preview}
                      alt={image.name}
                      className="rounded-3"
                      style={{ width: 70, height: 70, objectFit: "cover" }}
                    />

                    <div className="flex-grow-1" style={{ minWidth: 0 }}>
                      <div className="fw-semibold text-truncate" title={image.name}>
                        {index + 1}. {image.name}
                      </div>
                      <div className="small text-muted">
                        {image.width} × {image.height} · {formatSize(image.size)}
                      </div>
                    </div>

                    <div className="d-flex flex-column gap-1">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        aria-label={`Move ${image.name} up`}
                        onClick={() => moveImage(index, -1)}
                        disabled={index === 0}
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        aria-label={`Move ${image.name} down`}
                        onClick={() => moveImage(index, 1)}
                        disabled={index === images.length - 1}
                      >
                        ↓
                      </button>
                    </div>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      aria-label={`Remove ${image.name}`}
                      onClick={() => removeImage(image.id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ADD MORE */}
          <div
            {...getRootProps()}
            className="border border-2 border-dashed rounded-4 p-3 text-center mt-3"
            style={{ cursor: "pointer" }}
          >
            <input {...getInputProps()} aria-label="Add more images" />
            <small className="text-muted">+ Drop more images or click to add</small>
          </div>

          {/* PDF SETTINGS */}
          <div className="card border-0 shadow-sm rounded-4 mt-4">
            <div className="card-body p-4">
              <h3 className="h5 fw-bold mb-4">PDF Settings</h3>

              <div className="row g-3">
                <div className="col-md-6 col-lg-3">
                  <label htmlFor="pageSize" className="form-label fw-semibold">
                    Page Size
                  </label>
                  <select
                    id="pageSize"
                    className="form-select"
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value)}
                  >
                    <option value="a4">A4</option>
                    <option value="letter">Letter</option>
                    <option value="original">Original Image Size</option>
                  </select>
                </div>

                <div className="col-md-6 col-lg-3">
                  <label htmlFor="orientation" className="form-label fw-semibold">
                    Orientation
                  </label>
                  <select
                    id="orientation"
                    className="form-select"
                    value={orientation}
                    onChange={(e) => setOrientation(e.target.value)}
                  >
                    <option value="auto">Auto</option>
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                  </select>
                </div>

                <div className="col-md-6 col-lg-3">
                  <label htmlFor="fit" className="form-label fw-semibold">
                    Image Fit
                  </label>
                  <select
                    id="fit"
                    className="form-select"
                    value={fit}
                    onChange={(e) => setFit(e.target.value)}
                  >
                    <option value="fit">Fit to Page</option>
                    <option value="fill">Fill Page</option>
                    <option value="original">Original Size</option>
                  </select>
                </div>

                <div className="col-md-6 col-lg-3">
                  <label htmlFor="margin" className="form-label fw-semibold">
                    Margin
                  </label>
                  <select
                    id="margin"
                    className="form-select"
                    value={margin}
                    onChange={(e) => setMargin(e.target.value)}
                  >
                    <option value="none">None</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>

              <div className="mt-3">
                <label htmlFor="filename" className="form-label fw-semibold">
                  File Name
                </label>
                <div className="input-group">
                  <input
                    id="filename"
                    type="text"
                    className="form-control"
                    value={filename}
                    onChange={(e) => setFilename(e.target.value)}
                    placeholder="image-to-pdf"
                  />
                  <span className="input-group-text">.pdf</span>
                </div>
              </div>
            </div>
          </div>

          {/* CONVERT BUTTON */}
          <button
            type="button"
            className="btn btn-primary btn-lg w-100 rounded-pill mt-4"
            onClick={generatePdf}
            disabled={images.length === 0 || generating}
          >
            {generating ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" />
                Creating PDF...
              </>
            ) : (
              "📄 Convert to PDF"
            )}
          </button>
        </>
      )}

      {/* PDF READY */}
      {pdfBlob && (
        <div className="text-center mt-5">
          <div className="alert alert-success d-inline-block px-4 py-3">
            ✅ <strong>PDF Ready</strong> — {images.length} page
            {images.length === 1 ? "" : "s"}, {formatSize(pdfBlob.size)}
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 mt-3">
            <button
              type="button"
              className="btn btn-success btn-lg rounded-pill px-4"
              onClick={downloadPdf}
            >
              ⬇️ Download PDF
            </button>

            <button
              type="button"
              className="btn btn-outline-primary btn-lg rounded-pill px-4"
              onClick={convertAnother}
            >
              Convert Another
            </button>
          </div>
        </div>
      )}

      {/* PRIVACY */}
      <div className="text-center mt-5">
        <small className="text-muted">
          🔒 Your images stay on your device. Files are processed directly in
          your browser and are never uploaded to our server.
        </small>
      </div>
    </section>
  );
}

export default ImageToPDF;