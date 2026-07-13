import ResultCard from "../ResultCard";
import EmptyState from "../EmptyState";

function RotateResults({ rotatedImages }) {
  if (rotatedImages.length === 0) {
    return (
      <EmptyState
        icon="🔄"
        title="No Rotated Images"
        description="Rotate an image to see results here."
      />
    );
  }

  return (
    <section className="mt-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            🔄 Rotated Images
          </h2>

          <p className="text-muted mb-0">
            {rotatedImages.length} image(s) rotated successfully
          </p>
        </div>

      </div>

      {/* Cards */}
      <div className="row g-4">

        {rotatedImages.map((item, index) => (

          <div
            key={index}
            className="col-xl-4 col-lg-4 col-md-6"
          >

            <ResultCard
              title="🔄 Rotated Image"
              image={item.rotated}
              originalFile={item.original.file}
              filename={item.original.file.name}
              badge="Rotated"
              badgeColor="warning"
              originalSize={item.original.file.size}
              newSize={item.rotated.size}
              downloadName={item.rotated.name}
            />

          </div>

        ))}

      </div>

    </section>
  );
}

export default RotateResults;