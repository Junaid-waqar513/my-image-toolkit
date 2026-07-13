function Hero() {
  return (
    <section className="hero-section rounded-5 shadow-lg overflow-hidden mb-5">

      <div className="container py-5">

        <div className="row align-items-center">

          {/* Left */}
          <div className="col-lg-7">

            <span className="badge bg-warning text-dark px-3 py-2 mb-3 fw-semibold">
              ⭐ 100% Free • No Signup • Privacy First
            </span>

            <h1 className="display-4 fw-bold text-white mb-3">
              Free Online Image Toolkit
              <br />
              <span className="text-warning">
                Compress, Resize & Convert Images
              </span>
            </h1>

            <p className="lead text-light mb-4">
              Optimize your JPG, PNG, WEBP and GIF images in seconds.
              Compress images without noticeable quality loss, resize,
              convert formats, crop, rotate, flip, add watermarks,
              apply filters and batch process—all directly in your browser.
            </p>

            {/* Feature Pills */}

            <div className="d-flex flex-wrap gap-2 mb-4">

              <span className="badge bg-light text-dark px-3 py-2">
                📦 Batch Processing
              </span>

              <span className="badge bg-light text-dark px-3 py-2">
                ⚡ Lightning Fast
              </span>

              <span className="badge bg-light text-dark px-3 py-2">
                🔒 100% Private
              </span>

              <span className="badge bg-light text-dark px-3 py-2">
                🖼 No Upload Required
              </span>

              <span className="badge bg-light text-dark px-3 py-2">
                🎨 Filters
              </span>

              <span className="badge bg-light text-dark px-3 py-2">
                💧 Watermark
              </span>

            </div>

            {/* Buttons */}

            <div className="d-flex flex-wrap gap-3">

              <button
                className="btn btn-warning btn-lg rounded-pill px-4 fw-bold shadow"
                onClick={() =>
                  window.scrollTo({
                    top: 650,
                    behavior: "smooth",
                  })
                }
              >
                🚀 Start Editing
              </button>

              <button
                className="btn btn-outline-light btn-lg rounded-pill px-4"
                disabled
              >
                🛠 10+ Image Tools
              </button>

            </div>

            {/* Trust Stats */}

            <div className="row text-center mt-5 g-3">

              <div className="col-4">
                <h3 className="fw-bold text-warning mb-0">
                  10+
                </h3>

                <small className="text-light">
                  Image Tools
                </small>
              </div>

              <div className="col-4">
                <h3 className="fw-bold text-info mb-0">
                  100%
                </h3>

                <small className="text-light">
                  Free
                </small>
              </div>

              <div className="col-4">
                <h3 className="fw-bold text-success mb-0">
                  Secure
                </h3>

                <small className="text-light">
                  Browser Processing
                </small>
              </div>

            </div>

          </div>

          {/* Right */}

          <div className="col-lg-5 text-center mt-5 mt-lg-0">

            <div className="hero-icon display-1">
              🖼️
            </div>

            <h2 className="fw-bold text-white mt-3">
              Professional Image Editor
            </h2>

            <p className="text-light px-lg-4">

              Everything you need to optimize your images in one
              powerful online toolkit.

            </p>

            <div className="card bg-white bg-opacity-10 border border-light rounded-4 mt-4">

              <div className="card-body">

                <div className="row">

                  <div className="col-6 border-end">

                    <h4 className="text-warning fw-bold mb-0">
                      JPG
                    </h4>

                    <small className="text-light">
                      PNG
                    </small>

                  </div>

                  <div className="col-6">

                    <h4 className="text-info fw-bold mb-0">
                      WEBP
                    </h4>

                    <small className="text-light">
                      GIF
                    </small>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;