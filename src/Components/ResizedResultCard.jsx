function ResultCard({
  title,
  image,
  filename,

  badge = "Done",
  badgeColor = "success",

  originalSize,
  newSize,

  extraInfo = [],

  downloadName,
}) {

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
          ((originalSize - newSize) /
            originalSize) *
          100
        ).toFixed(1)
      : null;

  return (

    <div className="card result-card border-0 shadow-lg rounded-4 overflow-hidden h-100">

      {/* Image */}

      <div className="position-relative overflow-hidden">

        <img
          src={image}
          alt={filename}
          className="card-img-top result-image"
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

        {/* Original Size */}

        {originalSize && (

          <div className="d-flex justify-content-between mb-2">

            <span>📦 Original</span>

            <strong>

              {(originalSize / 1024).toFixed(2)} KB

            </strong>

          </div>

        )}

        {/* New Size */}

        {newSize && (

          <div className="d-flex justify-content-between mb-2">

            <span>✨ New Size</span>

            <strong className="text-success">

              {(newSize / 1024).toFixed(2)} KB

            </strong>

          </div>

        )}

        {/* Compression Saved */}

        {savedKB && (

          <>

            <div className="d-flex justify-content-between mb-2">

              <span>💾 Saved</span>

              <strong className="text-primary">

                {savedKB} KB

              </strong>

            </div>

            <div className="d-flex justify-content-between mb-3">

              <span>📉 Reduction</span>

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

        {/* Extra Information */}

        {extraInfo.map((info, index) => (

          <div
            key={index}
            className="d-flex justify-content-between mb-2"
          >

            <span>{info.label}</span>

            <strong>

              {info.value}

            </strong>

          </div>

        ))}

        {/* Download */}

        <div className="d-grid mt-4">

          <a
            href={image}
            download={downloadName}
            className="btn btn-success rounded-pill fw-semibold"
          >

            ⬇ Download

          </a>

        </div>

      </div>

    </div>

  );

}

export default ResultCard;