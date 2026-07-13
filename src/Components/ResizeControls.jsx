function ResizeControls({
  width,
  setWidth,
  height,
  setHeight,
  onResize,
  loading,
}) {

  return (

    <div className="card border-0 shadow-lg rounded-4 p-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h3 className="fw-bold mb-1">

            📏 Resize Images

          </h3>

          <p className="text-muted mb-0">

            Resize your images to any dimensions.

          </p>

        </div>

        <span className="badge bg-warning text-dark fs-6 px-3 py-2 rounded-pill">

          {width} × {height}

        </span>

      </div>

      {/* Width & Height */}

      <div className="row g-4">

        <div className="col-md-6">

          <div className="card border-0 bg-light rounded-4 p-3 h-100">

            <label className="form-label fw-semibold">

              Width (px)

            </label>

            <input
              type="number"
              className="form-control form-control-lg"
              value={width}
              min="1"
              onChange={(e) =>
                setWidth(Number(e.target.value))
              }
            />

          </div>

        </div>

        <div className="col-md-6">

          <div className="card border-0 bg-light rounded-4 p-3 h-100">

            <label className="form-label fw-semibold">

              Height (px)

            </label>

            <input
              type="number"
              className="form-control form-control-lg"
              value={height}
              min="1"
              onChange={(e) =>
                setHeight(Number(e.target.value))
              }
            />

          </div>

        </div>

      </div>

      {/* Presets */}

      <div className="mt-4">

        <label className="form-label fw-semibold mb-3">

          Quick Presets

        </label>

        <div className="d-flex flex-wrap gap-2">

          <button
            className="btn btn-outline-primary rounded-pill"
            onClick={() => {
              setWidth(1080);
              setHeight(1080);
            }}
          >
            Instagram
          </button>

          <button
            className="btn btn-outline-danger rounded-pill"
            onClick={() => {
              setWidth(1920);
              setHeight(1080);
            }}
          >
            YouTube
          </button>

          <button
            className="btn btn-outline-success rounded-pill"
            onClick={() => {
              setWidth(1200);
              setHeight(630);
            }}
          >
            Facebook
          </button>

          <button
            className="btn btn-outline-warning rounded-pill"
            onClick={() => {
              setWidth(800);
              setHeight(800);
            }}
          >
            Square
          </button>

        </div>

      </div>

      {/* Resize Button */}

      <button
        className="btn btn-warning btn-lg rounded-pill fw-bold mt-4"
        onClick={onResize}
        disabled={loading}
      >

        {loading
          ? "⏳ Resizing Images..."
          : "🚀 Resize Images"}

      </button>

    </div>

  );

}

export default ResizeControls;