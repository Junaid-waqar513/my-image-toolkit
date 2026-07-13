function WatermarkControls({

  watermarkText,
  setWatermarkText,

  onWatermark,

  loading,

}) {

  return (

    <div className="card border-0 shadow-lg rounded-4 p-4 mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h3 className="fw-bold mb-1">

            💧 Watermark Images

          </h3>

          <p className="text-muted mb-0">

            Protect your images with a custom text watermark.

          </p>

        </div>

        <span className="badge bg-dark fs-6 px-3 py-2 rounded-pill">

          Watermark

        </span>

      </div>

      <div className="mb-4">

        <label className="form-label fw-semibold">

          Watermark Text

        </label>

        <input
          type="text"
          className="form-control form-control-lg rounded-3"
          placeholder="Example: © Junaid Waqar"
          value={watermarkText}
          onChange={(e) =>
            setWatermarkText(e.target.value)
          }
        />

      </div>

      <div className="alert alert-info rounded-4">

        <strong>Preview:</strong>

        <div className="mt-2">

          {watermarkText
            ? `💧 ${watermarkText}`
            : "💧 Your watermark text will appear here."}

        </div>

      </div>

      <div className="row mt-3">

        <div className="col-md-6 mb-3">

          <div className="border rounded-4 p-3 text-center h-100">

            <h6 className="fw-bold">

              🛡 Copyright

            </h6>

            <small className="text-muted">

              Protect your work from unauthorized use.

            </small>

          </div>

        </div>

        <div className="col-md-6 mb-3">

          <div className="border rounded-4 p-3 text-center h-100">

            <h6 className="fw-bold">

              🏷 Branding

            </h6>

            <small className="text-muted">

              Add your business or personal brand.

            </small>

          </div>

        </div>

      </div>

      <button
        className="btn btn-dark btn-lg rounded-pill w-100 mt-3"
        onClick={onWatermark}
        disabled={loading}
      >

        {loading
          ? "Applying Watermark..."
          : "💧 Apply Watermark"}

      </button>

    </div>

  );

}

export default WatermarkControls;