function RotateControls({

  onRotate,

  loading,

}) {

  return (

    <div className="card border-0 shadow-lg rounded-4 p-4 mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h3 className="fw-bold mb-1">

            🔄 Rotate Images

          </h3>

          <p className="text-muted mb-0">

            Rotate your images instantly with one click.

          </p>

        </div>

        <span className="badge bg-warning text-dark fs-6 px-3 py-2 rounded-pill">

          Rotate Tool

        </span>

      </div>

      <div className="row g-3">

        <div className="col-md-4">

          <button
            className="btn btn-outline-warning btn-lg w-100 rounded-4 py-4 h-100"
            onClick={() => onRotate(90)}
            disabled={loading}
          >

            <div className="display-5">

              ↪

            </div>

            <h5 className="fw-bold mt-2">

              Rotate 90°

            </h5>

            <small className="text-muted">

              Clockwise

            </small>

          </button>

        </div>

        <div className="col-md-4">

          <button
            className="btn btn-outline-warning btn-lg w-100 rounded-4 py-4 h-100"
            onClick={() => onRotate(180)}
            disabled={loading}
          >

            <div className="display-5">

              ↺

            </div>

            <h5 className="fw-bold mt-2">

              Rotate 180°

            </h5>

            <small className="text-muted">

              Upside Down

            </small>

          </button>

        </div>

        <div className="col-md-4">

          <button
            className="btn btn-outline-warning btn-lg w-100 rounded-4 py-4 h-100"
            onClick={() => onRotate(270)}
            disabled={loading}
          >

            <div className="display-5">

              ↩

            </div>

            <h5 className="fw-bold mt-2">

              Rotate 270°

            </h5>

            <small className="text-muted">

              Counter Clockwise

            </small>

          </button>

        </div>

      </div>

      <div className="alert alert-warning rounded-4 mt-4 mb-0">

        <strong>💡 Tip:</strong> Use 90° or 270° for portrait/landscape photos.
        Use 180° if an image is upside down.

      </div>

    </div>

  );

}

export default RotateControls;