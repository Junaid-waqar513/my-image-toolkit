function HeroSection() {
  return (
    <div
      className="text-center text-white rounded-4 p-5 mb-5"
      style={{
        background:
          "linear-gradient(135deg,#0d6efd,#6610f2)",
      }}
    >
      <h1 className="display-4 fw-bold mb-3">
        🖼 Image Toolkit Pro
      </h1>

      <p className="lead mb-4">
        Professional Image Processing Toolkit
      </p>

      <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">

        <span className="badge bg-light text-dark fs-6">
          Compress
        </span>

        <span className="badge bg-light text-dark fs-6">
          Resize
        </span>

        <span className="badge bg-light text-dark fs-6">
          Convert
        </span>

        <span className="badge bg-light text-dark fs-6">
          Crop
        </span>

        <span className="badge bg-light text-dark fs-6">
          Rotate
        </span>

        <span className="badge bg-light text-dark fs-6">
          Flip
        </span>

        <span className="badge bg-light text-dark fs-6">
          Watermark
        </span>

        <span className="badge bg-light text-dark fs-6">
          Filters
        </span>

        <span className="badge bg-light text-dark fs-6">
          Batch Processing
        </span>

      </div>

      <p className="mb-0">
        Fast • Free • Browser Based
      </p>

    </div>
  );
}

export default HeroSection;