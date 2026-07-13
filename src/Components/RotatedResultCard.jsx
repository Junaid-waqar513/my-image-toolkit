import { useEffect, useState } from "react";

function RotatedResultCard({ item }) {

  const [rotatedPreview, setRotatedPreview] = useState(null);

  useEffect(() => {
    if (!item?.rotated) return;
    const url = URL.createObjectURL(item.rotated);
    setRotatedPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [item]);

  const fileName =
    item.rotated.name || item.original?.file?.name || "Rotated Image";

  const fileSize =
    (item.rotated.size / 1024).toFixed(2);

  return (

    <div className="card border-0 shadow-lg rounded-4 overflow-hidden h-100 result-card">

      {/* Image */}

      <div className="position-relative overflow-hidden">

        <img
          src={rotatedPreview}
          alt={fileName}
          className="card-img-top result-image"
          loading="lazy"
          decoding="async"
          style={{
            height: "230px",
            objectFit: "cover",
            transition: "0.4s ease",
          }}
        />

        <span className="badge bg-success position-absolute top-0 start-0 m-3 px-3 py-2">
          🔄 Rotated
        </span>

      </div>

      {/* Body */}

      <div className="card-body">

        <h5
          className="fw-bold text-truncate mb-3"
          title={fileName}
        >
          🖼 {fileName}
        </h5>

        <div className="d-flex justify-content-between mb-2">

          <span>📦 Size</span>

          <strong className="text-primary">
            {fileSize} KB
          </strong>

        </div>

        <div className="d-flex justify-content-between">

          <span>✅ Status</span>

          <strong className="text-success">
            Rotated Successfully
          </strong>

        </div>

        <hr />

        <div className="d-grid">

          <a
            href={rotatedPreview}
            download={item.rotated.name}
            className="btn btn-success btn-lg rounded-pill fw-semibold"
          >
            ⬇ Download Image
          </a>

        </div>

      </div>

    </div>

  );

}

export default RotatedResultCard;