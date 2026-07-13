function BatchProcessControls({

  batchResize,
  setBatchResize,

  batchCompress,
  setBatchCompress,

  batchConvert,
  setBatchConvert,

  batchWatermark,
  setBatchWatermark,

  onBatchProcess,

  loading,

}) {

  return (

    <div className="card border-0 shadow-lg rounded-4 p-4 mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h3 className="fw-bold mb-1">

            ⚡ Batch Processing

          </h3>

          <p className="text-muted mb-0">

            Process multiple images with several operations at once.

          </p>

        </div>

        <span className="badge bg-danger fs-6 px-3 py-2 rounded-pill">

          Batch Mode

        </span>

      </div>

      <div className="row">

        <div className="col-md-6 mb-3">

          <div className="form-check border rounded-4 p-3">

            <input
              className="form-check-input"
              type="checkbox"
              checked={batchResize}
              onChange={(e) =>
                setBatchResize(e.target.checked)
              }
              id="batchResize"
            />

            <label
              className="form-check-label fw-semibold ms-2"
              htmlFor="batchResize"
            >

              📏 Resize Images

            </label>

          </div>

        </div>

        <div className="col-md-6 mb-3">

          <div className="form-check border rounded-4 p-3">

            <input
              className="form-check-input"
              type="checkbox"
              checked={batchCompress}
              onChange={(e) =>
                setBatchCompress(e.target.checked)
              }
              id="batchCompress"
            />

            <label
              className="form-check-label fw-semibold ms-2"
              htmlFor="batchCompress"
            >

              📦 Compress Images

            </label>

          </div>

        </div>

        <div className="col-md-6 mb-3">

          <div className="form-check border rounded-4 p-3">

            <input
              className="form-check-input"
              type="checkbox"
              checked={batchConvert}
              onChange={(e) =>
                setBatchConvert(e.target.checked)
              }
              id="batchConvert"
            />

            <label
              className="form-check-label fw-semibold ms-2"
              htmlFor="batchConvert"
            >

              🔄 Convert Images

            </label>

          </div>

        </div>

        <div className="col-md-6 mb-3">

          <div className="form-check border rounded-4 p-3">

            <input
              className="form-check-input"
              type="checkbox"
              checked={batchWatermark}
              onChange={(e) =>
                setBatchWatermark(e.target.checked)
              }
              id="batchWatermark"
            />

            <label
              className="form-check-label fw-semibold ms-2"
              htmlFor="batchWatermark"
            >

              💧 Add Watermark

            </label>

          </div>

        </div>

      </div>

      <div className="alert alert-primary rounded-4 mt-3">

        <strong>Tip:</strong> Enable multiple options to process all uploaded
        images in one click.

      </div>

      <button
        className="btn btn-danger btn-lg rounded-pill w-100 mt-3"
        onClick={onBatchProcess}
        disabled={loading}
      >

        {loading
          ? "⚡ Processing Images..."
          : "🚀 Run Batch Process"}

      </button>

    </div>

  );

}

export default BatchProcessControls;