function ConvertControls({
  format,
  setFormat,
  onConvert,
  loading,
}) {

  return (

    <div className="card border-0 shadow-lg rounded-4 p-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h3 className="fw-bold mb-1">

            🔄 Convert Images

          </h3>

          <p className="text-muted mb-0">

            Convert your images into different formats.

          </p>

        </div>

        <span className="badge bg-info text-dark fs-6 px-3 py-2 rounded-pill">

          {format.toUpperCase()}

        </span>

      </div>

      {/* Format Selection */}

      <div className="card border-0 bg-light rounded-4 p-4">

        <label className="form-label fw-semibold">

          Output Format

        </label>

        <select
          className="form-select form-select-lg"
          value={format}
          onChange={(e) =>
            setFormat(e.target.value)
          }
        >

          <option value="jpg">
            🖼 JPG (Best Compatibility)
          </option>

          <option value="png">
            🎨 PNG (Lossless)
          </option>

          <option value="webp">
            🚀 WEBP (Smaller Size)
          </option>

        </select>

      </div>

      {/* Information */}

      <div className="alert alert-info rounded-4 mt-4 mb-0">

        <strong>Recommended Formats</strong>

        <ul className="mb-0 mt-2">

          <li>
            JPG → Photos & everyday images
          </li>

          <li>
            PNG → Transparent backgrounds & graphics
          </li>

          <li>
            WEBP → Smallest file size for websites
          </li>

        </ul>

      </div>

      {/* Button */}

      <button
        className="btn btn-info btn-lg rounded-pill fw-bold mt-4"
        onClick={onConvert}
        disabled={loading}
      >

        {loading
          ? "⏳ Converting Images..."
          : "🚀 Convert Images"}

      </button>

    </div>

  );

}

export default ConvertControls;