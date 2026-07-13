function FilterControls({

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

  onApply,

  loading,

}) {

  return (

    <div className="card border-0 shadow-lg rounded-4 p-4 mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h3 className="fw-bold mb-1">

            🎨 Image Filters

          </h3>

          <p className="text-muted mb-0">

            Fine tune your image with professional editing controls.

          </p>

        </div>

        <span className="badge bg-success fs-6 px-3 py-2 rounded-pill">

          Effects

        </span>

      </div>

      {/* Brightness */}

      <div className="mb-4">

        <div className="d-flex justify-content-between">

          <label className="fw-semibold">

            ☀ Brightness

          </label>

          <span className="badge bg-light text-dark">

            {brightness}%

          </span>

        </div>

        <input
          type="range"
          className="form-range"
          min="0"
          max="200"
          value={brightness}
          onChange={(e) =>
            setBrightness(Number(e.target.value))
          }
        />

      </div>

      {/* Contrast */}

      <div className="mb-4">

        <div className="d-flex justify-content-between">

          <label className="fw-semibold">

            ◐ Contrast

          </label>

          <span className="badge bg-light text-dark">

            {contrast}%

          </span>

        </div>

        <input
          type="range"
          className="form-range"
          min="0"
          max="200"
          value={contrast}
          onChange={(e) =>
            setContrast(Number(e.target.value))
          }
        />

      </div>

      {/* Saturation */}

      <div className="mb-4">

        <div className="d-flex justify-content-between">

          <label className="fw-semibold">

            🌈 Saturation

          </label>

          <span className="badge bg-light text-dark">

            {saturation}%

          </span>

        </div>

        <input
          type="range"
          className="form-range"
          min="0"
          max="200"
          value={saturation}
          onChange={(e) =>
            setSaturation(Number(e.target.value))
          }
        />

      </div>

      {/* Blur */}

      <div className="mb-4">

        <div className="d-flex justify-content-between">

          <label className="fw-semibold">

            🌫 Blur

          </label>

          <span className="badge bg-light text-dark">

            {blur}px

          </span>

        </div>

        <input
          type="range"
          className="form-range"
          min="0"
          max="20"
          value={blur}
          onChange={(e) =>
            setBlur(Number(e.target.value))
          }
        />

      </div>

      {/* Grayscale */}

      <div className="mb-4">

        <div className="d-flex justify-content-between">

          <label className="fw-semibold">

            ⚫ Grayscale

          </label>

          <span className="badge bg-light text-dark">

            {grayscale}%

          </span>

        </div>

        <input
          type="range"
          className="form-range"
          min="0"
          max="100"
          value={grayscale}
          onChange={(e) =>
            setGrayscale(Number(e.target.value))
          }
        />

      </div>

      {/* Sepia */}

      <div className="mb-4">

        <div className="d-flex justify-content-between">

          <label className="fw-semibold">

            🟤 Sepia

          </label>

          <span className="badge bg-light text-dark">

            {sepia}%

          </span>

        </div>

        <input
          type="range"
          className="form-range"
          min="0"
          max="100"
          value={sepia}
          onChange={(e) =>
            setSepia(Number(e.target.value))
          }
        />

      </div>

      <div className="alert alert-info rounded-4">

        💡 Adjust the sliders above to create your desired image effect before applying.

      </div>

      <button
        className="btn btn-success btn-lg rounded-pill w-100 mt-3"
        onClick={onApply}
        disabled={loading}
      >

        {loading
          ? "Applying Filters..."
          : "🎨 Apply Filters"}

      </button>

    </div>

  );

}

export default FilterControls;