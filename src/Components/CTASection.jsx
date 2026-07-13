function CTASection() {
  return (
    <section
      className="py-5"
      style={{
        background:
          "linear-gradient(135deg,#0d6efd,#6610f2)",
      }}
    >
      <div className="container">

        <div className="row justify-content-center">

          <div className="col-lg-9 text-center text-white">

            <span className="badge bg-light text-dark px-4 py-2 rounded-pill mb-4">
              Start Today
            </span>

            <h2 className="display-4 fw-bold mb-4">
              Optimize Your Images in Seconds
            </h2>

            <p
              className="lead mb-5"
              style={{
                opacity: .95,
              }}
            >
              Compress, resize, convert, crop, rotate, flip and
              watermark your images directly inside your browser.
              No installation, no registration and completely free.
            </p>

            <a
              href="#upload"
              className="btn btn-light btn-lg rounded-pill px-5 py-3 fw-bold"
            >
              🚀 Start Editing Images
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}

export default CTASection;