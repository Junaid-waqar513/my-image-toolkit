import { useEffect, useState } from "react";

function BatchResultCard({ item }) {

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!item?.processed) return;
    const url = URL.createObjectURL(item.processed);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [item]);

  const originalSize =
    item.original.file.size;

  const processedSize =
    item.processed.size;

  return (

    <div className="card border-0 shadow-lg rounded-4 overflow-hidden h-100 result-card">

      {/* Image */}

      <div className="position-relative overflow-hidden">

        <img
          src={preview}
          alt={item.original.file.name}
          className="card-img-top result-image"
          loading="lazy"
          decoding="async"
          style={{
            height: "230px",
            objectFit: "cover",
            transition: ".4s",
          }}
        />

        <span
          className="badge bg-danger position-absolute top-0 end-0 m-3 px-3 py-2"
        >
          ⚡ Batch
        </span>

      </div>

      {/* Card Body */}

      <div className="card-body">

        <h5
          className="fw-bold text-truncate"
          title={item.original.file.name}
        >
          📦 {item.original.file.name}
        </h5>

        <hr />

        <div className="d-flex justify-content-between mb-2">

          <span>Original Size</span>

          <strong className="text-danger">
            {(originalSize / 1024).toFixed(2)} KB
          </strong>

        </div>

        <div className="d-flex justify-content-between mb-2">

          <span>Processed Size</span>

          <strong className="text-success">
            {(processedSize / 1024).toFixed(2)} KB
          </strong>

        </div>

        <div className="d-flex justify-content-between mb-3">

          <span>Status</span>

          <strong className="text-primary">
            Completed
          </strong>

        </div>

        <div className="alert alert-danger text-center py-2 rounded-3">

          ✅ Batch Processing Completed

        </div>

        <div className="mt-4">

          <a
            href={preview}
            download={item.processed.name}
            className="btn btn-danger btn-lg w-100 rounded-pill fw-semibold"
          >
            ⬇ Download Processed Image
          </a>

        </div>

      </div>

    </div>

  );

}

export default BatchResultCard;