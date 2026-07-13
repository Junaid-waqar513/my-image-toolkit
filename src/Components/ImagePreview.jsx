import { useEffect, useState } from "react";

function ImagePreview({
  images,
  setImages,
  setSelectedImage,
}) {
  const [dimensions, setDimensions] = useState({});

  useEffect(() => {
    images.forEach((image) => {
      if (dimensions[image.preview]) return;

      const img = new Image();

      img.onload = () => {
        setDimensions((prev) => ({
          ...prev,
          [image.preview]: {
            width: img.width,
            height: img.height,
          },
        }));
      };

      img.src = image.preview;
    });
  }, [images]);

  const removeImage = (indexToRemove) => {
    URL.revokeObjectURL(images[indexToRemove].preview);

    setImages(
      images.filter((_, index) => index !== indexToRemove)
    );
  };

  const formatSize = (bytes) => {
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }

    return `${(bytes / 1024).toFixed(2)} KB`;
  };

  if (images.length === 0) return null;

  return (
    <>
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            📂 Uploaded Images
          </h2>

          <p className="text-muted mb-0">
            Preview, crop, download or remove your uploaded files
          </p>
        </div>

        <span className="badge bg-primary fs-6 px-4 py-3 rounded-pill shadow-sm">
          {images.length} Image
          {images.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Grid */}

      <div className="row g-4">

        {images.map((image, index) => (

          <div
            key={`${image.file.name}-${index}`}
            className="col-xl-3 col-lg-4 col-md-6"
          >

            <div className="card border-0 shadow-lg rounded-4 overflow-hidden h-100 result-card">

              {/* Image */}

              <div className="position-relative">

                <img
                  src={image.preview}
                  alt={image.file.name}
                  className="card-img-top result-image"
                  loading="lazy"
                  decoding="async"
                  style={{
                    height: "240px",
                    objectFit: "cover",
                  }}
                />

                <span className="badge bg-success position-absolute top-0 end-0 m-3">
                  Ready
                </span>

              </div>

              {/* Body */}

              <div className="card-body">

                <h5
                  className="fw-bold text-truncate"
                  title={image.file.name}
                >
                  🖼 {image.file.name}
                </h5>

                <hr />

                <div className="d-flex justify-content-between mb-2">
                  <span>Size</span>

                  <strong className="text-primary">
                    {formatSize(image.file.size)}
                  </strong>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Type</span>

                  <strong className="text-success">
                    {image.file.type
                      .replace("image/", "")
                      .toUpperCase()}
                  </strong>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span>Dimensions</span>

                  <strong>
                    {dimensions[image.preview]
                      ? `${dimensions[image.preview].width} × ${dimensions[image.preview].height}`
                      : "..."}
                  </strong>
                </div>

                <div className="small text-muted mb-4">
                  Uploaded: Just now
                </div>

                {/* Buttons */}

                <div className="d-grid gap-2">

                  <button
                    className="btn btn-warning rounded-pill fw-semibold"
                    onClick={() =>
                      setSelectedImage(image.preview)
                    }
                  >
                    ✂️ Crop Image
                  </button>

                  <a
                    href={image.preview}
                    download={image.file.name}
                    className="btn btn-outline-primary rounded-pill"
                  >
                    ⬇ Download Original
                  </a>

                  <button
                    className="btn btn-outline-danger rounded-pill"
                    onClick={() => removeImage(index)}
                  >
                    🗑 Remove Image
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>
    </>
  );
}

export default ImagePreview;