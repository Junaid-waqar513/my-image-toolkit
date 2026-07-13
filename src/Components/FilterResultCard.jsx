import { useEffect, useState } from "react";

function FilterResultCard({ item }) {

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!item?.filtered) return;
    const url = URL.createObjectURL(item.filtered);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [item]);

  const originalSize =
    item.original.file.size;

  const filteredSize =
    item.filtered.size;

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
          className="badge bg-success position-absolute top-0 end-0 m-3 px-3 py-2"
        >
          🎨 Filtered
        </span>

      </div>

      {/* Body */}

      <div className="card-body">

        <h5
          className="fw-bold text-truncate"
          title={item.original.file.name}
        >
          🖼 {item.original.file.name}
        </h5>

        <hr />

        <div className="d-flex justify-content-between mb-2">

          <span>Original Size</span>

          <strong className="text-danger">
            {(originalSize / 1024).toFixed(2)} KB
          </strong>

        </div>

        <div className="d-flex justify-content-between mb-2">

          <span>Filtered Size</span>

          <strong className="text-success">
            {(filteredSize / 1024).toFixed(2)} KB
          </strong>

        </div>

        <div className="d-flex justify-content-between mb-3">

          <span>Status</span>

          <strong className="text-success">
            Applied
          </strong>

        </div>

        <div className="alert alert-success text-center py-2 rounded-3">

          ✅ Filter Applied Successfully

        </div>

        <div className="mt-4">

          <a
            href={preview}
            download={item.filtered.name}
            className="btn btn-success btn-lg w-100 rounded-pill fw-semibold"
          >
            ⬇ Download Filtered Image
          </a>

        </div>

      </div>

    </div>

  );

}

export default FilterResultCard;