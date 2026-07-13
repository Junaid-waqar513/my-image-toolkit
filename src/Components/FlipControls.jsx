function FlipControls({

  onFlip,

  loading,

}) {

  return (

    <div className="card border-0 shadow-lg rounded-4 p-4 mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h3 className="fw-bold mb-1">

            🔁 Flip Images

          </h3>

          <p className="text-muted mb-0">

            Flip images horizontally or vertically with one click.

          </p>

        </div>

        <span className="badge bg-secondary fs-6 px-3 py-2 rounded-pill">

          Flip Tool

        </span>

      </div>

      <div className="row g-3">

        <div className="col-md-6">

          <button
            className="btn btn-outline-secondary btn-lg w-100 rounded-4 py-4 h-100"
            onClick={() => onFlip("horizontal")}
            disabled={loading}
          >

            <div className="display-5">

              ↔

            </div>

            <h5 className="fw-bold mt-2">

              Horizontal Flip

            </h5>

            <small className="text-muted">

              Mirror Left ↔ Right

            </small>

          </button>

        </div>

        <div className="col-md-6">

          <button
            className="btn btn-outline-secondary btn-lg w-100 rounded-4 py-4 h-100"
            onClick={() => onFlip("vertical")}
            disabled={loading}
          >

            <div className="display-5">

              ↕

            </div>

            <h5 className="fw-bold mt-2">

              Vertical Flip

            </h5>

            <small className="text-muted">

              Mirror Top ↕ Bottom

            </small>

          </button>

        </div>

      </div>

      <div className="alert alert-secondary rounded-4 mt-4 mb-0">

        <strong>💡 Tip:</strong> Horizontal flip is useful for selfies and mirrored photos. Vertical flip is commonly used for design work and creative edits.

      </div>

    </div>

  );

}

export default FlipControls;