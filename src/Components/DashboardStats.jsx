function DashboardStats({
  images,
  processedImages,
  resizedImages,
  convertedImages,
  rotatedImages,
  flippedImages,
  filteredImages,
  watermarkedImages,
  batchResults,
}) {

  // =======================
  // Statistics
  // =======================

  const totalOriginalSize = processedImages.reduce(
    (total, item) => total + item.original.file.size,
    0
  );

  const totalCompressedSize = processedImages.reduce(
    (total, item) => total + item.compressed.size,
    0
  );

  const totalSaved =
    totalOriginalSize - totalCompressedSize;

  const compressionPercentage =
    totalOriginalSize > 0
      ? (
          (totalSaved / totalOriginalSize) *
          100
        ).toFixed(1)
      : 0;

  const formatSize = (bytes) => {
    if (!bytes) return "0 KB";

    if (bytes >= 1024 * 1024) {
      return `${(
        bytes /
        (1024 * 1024)
      ).toFixed(2)} MB`;
    }

    return `${(bytes / 1024).toFixed(2)} KB`;
  };

  // =======================
  // Cards
  // =======================

  const cards = [
    {
      title: "Uploaded",
      icon: "📷",
      count: images.length,
      color: "#3b82f6",
      bg: "#eff6ff",
    },

    {
      title: "Compressed",
      icon: "📦",
      count: processedImages.length,
      color: "#10b981",
      bg: "#ecfdf5",
    },

    {
      title: "Resized",
      icon: "📏",
      count: resizedImages.length,
      color: "#f59e0b",
      bg: "#fffbeb",
    },

    {
      title: "Converted",
      icon: "🔄",
      count: convertedImages.length,
      color: "#06b6d4",
      bg: "#ecfeff",
    },

    {
      title: "Rotated",
      icon: "↩️",
      count: rotatedImages.length,
      color: "#8b5cf6",
      bg: "#f5f3ff",
    },

    {
      title: "Flipped",
      icon: "↔️",
      count: flippedImages.length,
      color: "#6366f1",
      bg: "#eef2ff",
    },

    {
      title: "Filtered",
      icon: "🎨",
      count: filteredImages.length,
      color: "#ef4444",
      bg: "#fef2f2",
    },

    {
      title: "Watermarked",
      icon: "💧",
      count: watermarkedImages.length,
      color: "#0ea5e9",
      bg: "#f0f9ff",
    },

    {
      title: "Batch",
      icon: "⚡",
      count: batchResults.length,
      color: "#22c55e",
      bg: "#f0fdf4",
    },
  ];

  return (
    <section className="mb-5">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold mb-1">
            📊 Dashboard
          </h2>

          <p className="text-muted mb-0">
            Quick overview of your image processing activity
          </p>

        </div>

      </div>

      {/* Summary Cards */}

      <div className="row g-4 mb-5">

        <div className="col-xl-3 col-md-6">

          <div className="card border-0 shadow rounded-4 text-center h-100">

            <div className="card-body">

              <h6 className="text-muted">
                Uploaded Images
              </h6>

              <h2 className="fw-bold text-primary">
                {images.length}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-xl-3 col-md-6">

          <div className="card border-0 shadow rounded-4 text-center h-100">

            <div className="card-body">

              <h6 className="text-muted">
                Original Size
              </h6>

              <h2 className="fw-bold">
                {formatSize(totalOriginalSize)}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-xl-3 col-md-6">

          <div className="card border-0 shadow rounded-4 text-center h-100">

            <div className="card-body">

              <h6 className="text-muted">
                Compressed Size
              </h6>

              <h2 className="fw-bold text-success">
                {formatSize(totalCompressedSize)}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-xl-3 col-md-6">

          <div className="card border-0 shadow rounded-4 text-center h-100">

            <div className="card-body">

              <h6 className="text-muted">
                Space Saved
              </h6>

              <h2 className="fw-bold text-primary">
                {formatSize(totalSaved)}
              </h2>

              <small className="text-success">
                {compressionPercentage}% Saved
              </small>

            </div>

          </div>

        </div>

      </div>

      {/* Tool Statistics */}

      <div className="row g-4">

        {cards.map((card, index) => (

          <div
            key={index}
            className="col-xl-4 col-lg-4 col-md-6"
          >

            <div
              className="card border-0 shadow-lg rounded-4 stats-card h-100"
              style={{
                background: card.bg,
                transition: ".35s",
              }}
            >

              <div className="card-body d-flex align-items-center">

                <div
                  className="rounded-circle d-flex justify-content-center align-items-center me-4"
                  style={{
                    width: "75px",
                    height: "75px",
                    background: card.color,
                    color: "#fff",
                    fontSize: "32px",
                  }}
                >
                  {card.icon}
                </div>

                <div>

                  <h2
                    className="fw-bold mb-1"
                    style={{
                      color: card.color,
                    }}
                  >
                    {card.count}
                  </h2>

                  <h6 className="mb-0 fw-semibold">
                    {card.title}
                  </h6>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default DashboardStats;