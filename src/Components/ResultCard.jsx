import { useEffect, useState } from "react";
import ImageComparison from "./ImageComparison";

function ResultCard({
  title,
  image,
  filename,
  originalFile,

  badge = "Done",
  badgeColor = "success",

  originalSize,
  newSize,

  extraInfo = [],

  downloadName,
}) {

  const [internalSrc, setInternalSrc] = useState(null);
  const [originalSrc, setOriginalSrc] = useState(null);
  const [showCompare, setShowCompare] = useState(false);

  useEffect(() => {
    if (!image) {
      setInternalSrc(null);
      return;
    }

    if (typeof image === "string") {
      setInternalSrc(image);
      return;
    }

    const url = URL.createObjectURL(image);
    setInternalSrc(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [image]);

  useEffect(() => {
    if (!originalFile) {
      setOriginalSrc(null);
      return;
    }

    if (typeof originalFile === "string") {
      setOriginalSrc(originalFile);
      return;
    }

    const url = URL.createObjectURL(originalFile);
    setOriginalSrc(url);

    return () => URL.revokeObjectURL(url);
  }, [originalFile]);

  const savedKB =
    originalSize && newSize
      ? (
          (originalSize - newSize) /
          1024
        ).toFixed(2)
      : null;

  const savedPercentage =
    originalSize && newSize
      ? (
          (
            (originalSize - newSize) /
            originalSize
          ) * 100
        ).toFixed(1)
      : null;

  return (
    <div className="card result-card border-0 shadow-lg rounded-4 overflow-hidden h-100">

      {/* Image */}

      <div className="position-relative overflow-hidden">

        <img
          src={internalSrc}
          alt={filename}
          className="card-img-top result-image"
          loading="lazy"
          decoding="async"
          style={{
            height: "230px",
            objectFit: "cover",
          }}
        />

        <span
          className={`badge bg-${badgeColor} position-absolute top-0 start-0 m-3 px-3 py-2`}
        >
          {badge}
        </span>

      </div>

      {/* Body */}

      <div className="card-body">

        <h5
          className="fw-bold text-truncate"
          title={filename}
        >
          {title}
        </h5>

        <p
          className="text-muted text-truncate"
          title={filename}
        >
          {filename}
        </p>

        {originalSize && (
          <div className="d-flex justify-content-between mb-2">
            <span>Original</span>

            <strong>
              {(originalSize / 1024).toFixed(2)} KB
            </strong>
          </div>
        )}

        {newSize && (
          <div className="d-flex justify-content-between mb-2">
            <span>Processed</span>

            <strong className="text-success">
              {(newSize / 1024).toFixed(2)} KB
            </strong>
          </div>
        )}

        {savedKB && (
          <>
            <div className="d-flex justify-content-between mb-2">

              <span>Saved</span>

              <strong className="text-primary">
                {savedKB} KB
              </strong>

            </div>

            <div className="d-flex justify-content-between mb-3">

              <span>Reduction</span>

              <strong className="text-success">
                {savedPercentage}%
              </strong>

            </div>

            <div
              className="progress rounded-pill mb-3"
              style={{
                height: "8px",
              }}
            >
              <div
                className="progress-bar bg-success"
                style={{
                  width: `${savedPercentage}%`,
                }}
              />
            </div>
          </>
        )}

        {extraInfo.map((info, index) => (
          <div
            key={index}
            className="d-flex justify-content-between mb-2"
          >
            <span>{info.label}</span>

            <strong>{info.value}</strong>
          </div>
        ))}

        <div className="d-grid mt-4">

            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-primary rounded-pill fw-semibold"
                onClick={() => setShowCompare((s) => !s)}
              >
                🔍 Compare
              </button>

              <a
                href={internalSrc}
                download={downloadName}
                className="btn btn-success rounded-pill fw-semibold"
              >
                ⬇ Download
              </a>
            </div>

        </div>

          {showCompare && originalSrc && internalSrc && (
            <div className="mt-4">
              <ImageComparison
                before={originalSrc}
                after={internalSrc}
                title="Original → Processed"
              />
            </div>
          )}

      </div>

    </div>
  );
}

export default ResultCard;