function Controls({
  quality,
  setQuality,
  onCompress,
  loading,
}) {
  const getQualityLabel = () => {
    if (quality >= 90)
      return {
        text: "Best Quality",
        color: "success",
      };

    if (quality >= 70)
      return {
        text: "Balanced",
        color: "primary",
      };

    if (quality >= 40)
      return {
        text: "Smaller File",
        color: "warning",
      };

    return {
      text: "Maximum Compression",
      color: "danger",
    };
  };

  const qualityInfo = getQualityLabel();

  return (
    <div className="card border-0 shadow rounded-4">

      <div className="card-body p-4">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h3 className="fw-bold mb-1">
              📦 Image Compression
            </h3>

            <p className="text-muted mb-0">
              Reduce image size while maintaining excellent visual quality.
            </p>
          </div>

          <span className="badge bg-primary fs-6 px-3 py-2 rounded-pill">
            {quality}%
          </span>

        </div>

        {/* Presets */}
        <div className="mb-4">

          <label className="form-label fw-semibold">
            Quick Presets
          </label>

          <div className="d-flex flex-wrap gap-2">

            <button
              className="btn btn-outline-success"
              onClick={() => setQuality(95)}
              type="button"
            >
              Best
            </button>

            <button
              className="btn btn-outline-primary"
              onClick={() => setQuality(80)}
              type="button"
            >
              Balanced
            </button>

            <button
              className="btn btn-outline-warning"
              onClick={() => setQuality(60)}
              type="button"
            >
              Small Size
            </button>

            <button
              className="btn btn-outline-danger"
              onClick={() => setQuality(30)}
              type="button"
            >
              Maximum
            </button>

          </div>

        </div>

        {/* Slider */}

        <label className="form-label fw-semibold">
          Compression Quality
        </label>

        <input
          type="range"
          min="10"
          max="100"
          value={quality}
          className="form-range"
          onChange={(e) =>
            setQuality(Number(e.target.value))
          }
        />

        {/* Progress */}

        <div className="progress rounded-pill mb-3">

          <div
            className={`progress-bar bg-${qualityInfo.color}`}
            style={{
              width: `${quality}%`,
            }}
          >
            {quality}%
          </div>

        </div>

        {/* Status */}

        <div
          className={`alert alert-${qualityInfo.color}`}
        >
          <strong>{qualityInfo.text}</strong>

          <br />

          {quality >= 90 &&
            "Highest image quality with the largest file size."}

          {quality >= 70 &&
            quality < 90 &&
            "Excellent balance between quality and file size."}

          {quality >= 40 &&
            quality < 70 &&
            "Smaller files with slight quality reduction."}

          {quality < 40 &&
            "Smallest files with noticeable quality loss."}
        </div>

        {/* Tips */}

        <div className="card bg-light border-0 mb-4">

          <div className="card-body">

            <h6 className="fw-bold">
              💡 Recommended Settings
            </h6>

            <ul className="mb-0 small">

              <li>95% → Photography</li>

              <li>80% → Websites</li>

              <li>60% → Social Media</li>

              <li>30% → Email Attachments</li>

            </ul>

          </div>

        </div>

        {/* Button */}

        <button
          className="btn btn-primary btn-lg w-100 rounded-pill fw-bold"
          onClick={onCompress}
          disabled={loading}
        >
          {loading
            ? "⏳ Compressing..."
            : "🚀 Compress Images"}
        </button>

      </div>

    </div>
  );
}

export default Controls;