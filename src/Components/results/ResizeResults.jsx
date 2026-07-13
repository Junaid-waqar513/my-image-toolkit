import ResultCard from "../ResultCard";
import EmptyState from "../EmptyState";

function ResizeResults({
  resizedImages,
  downloadResizedZip,
}) {
  if (resizedImages.length === 0) {
    return (
      <EmptyState
        icon="📏"
        title="No Resized Images"
        description="Resize an image to see the results here."
      />
    );
  }

  return (
    <section className="mt-5">

      {/* Header */}

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">

        <div>

          <h2 className="fw-bold mb-1">
            📏 Resized Images
          </h2>

          <p className="text-muted mb-0">
            {resizedImages.length} image(s) resized successfully
          </p>

        </div>

        <button
          className="btn btn-dark btn-lg rounded-pill mt-3 mt-md-0 px-4"
          onClick={downloadResizedZip}
        >
          📦 Download All ZIP
        </button>

      </div>

      {/* Result Cards */}

      <div className="row g-4">

        {resizedImages.map((item, index) => (

          <div
            key={index}
            className="col-xl-4 col-lg-4 col-md-6"
          >

            <ResultCard
              title="📏 Resized Image"
              image={item.resized}
              originalFile={item.original.file}
              originalPreview={item.original.preview}
              filename={item.original.file.name}
              badge="Resized"
              badgeColor="warning"
              originalSize={item.original.file.size}
              newSize={item.resized.size}
              extraInfo={[
                {
                  label: "Dimensions",
                  value: `${item.width} × ${item.height}`,
                },
              ]}
              downloadName={`resized-${item.original.file.name}`}
            />

          </div>

        ))}

      </div>

    </section>
  );
}

export default ResizeResults;