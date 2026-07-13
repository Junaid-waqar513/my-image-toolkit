import { useEffect, useState } from "react";

function ConvertedResultCard({ item }) {

  const [convertedPreview, setConvertedPreview] = useState(null);

  useEffect(() => {
    if (!item?.converted) return;
    const url = URL.createObjectURL(item.converted);
    setConvertedPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [item]);

  const originalSize =
    item.original.file.size;

  const convertedSize =
    item.converted.size;

  const format =
    item.converted.name.split(".").pop().toUpperCase();

  return (

    <div className="card border-0 shadow-lg rounded-4 overflow-hidden h-100 result-card">

      {/* Image */}

      <div className="position-relative overflow-hidden">

        <img
          src={convertedPreview}
          alt={item.original.file.name}
          className="card-img-top result-image"
          loading="lazy"
          decoding="async"
          style={{
            height: "230px",
            objectFit: "cover",
            transition: "0.4s ease",
          }}
        />

        <span className="badge bg-info text-dark position-absolute top-0 start-0 m-3 px-3 py-2">
          🔄 Converted
        </span>

        <span className="badge bg-dark position-absolute top-0 end-0 m-3">
          {format}
        </span>

      </div>

      {/* Body */}

      <div className="card-body">

        <h5
          className="fw-bold text-truncate mb-3"
          title={item.converted.name}
        >
          📄 {item.converted.name}
        </h5>

        <div className="d-flex justify-content-between mb-2">
          <span>📦 Original</span>

          <strong className="text-danger">
            {(originalSize / 1024).toFixed(2)} KB
          </strong>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <span>🔄 Converted</span>

          <strong className="text-success">
            {(convertedSize / 1024).toFixed(2)} KB
          </strong>
        </div>

        <div className="d-flex justify-content-between">
          <span>📁 Format</span>

          <strong className="text-primary">
            {format}
          </strong>
        </div>

        <hr />

        <div className="d-grid">

          <a
            href={convertedPreview}
            download={item.converted.name}
            className="btn btn-info btn-lg rounded-pill fw-semibold text-dark"
          >
            ⬇ Download Image
          </a>

        </div>

      </div>

    </div>

  );

}

export default ConvertedResultCard;