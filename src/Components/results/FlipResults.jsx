import ResultCard from "../ResultCard";
import EmptyState from "../EmptyState";

function FlipResults({ flippedImages }) {
  if (flippedImages.length === 0) {
    return (
      <EmptyState
        icon="🔁"
        title="No Flipped Images"
        description="Flip an image to see results here."
      />
    );
  }

  return (
    <section className="mt-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            🔁 Flipped Images
          </h2>

          <p className="text-muted mb-0">
            {flippedImages.length} image(s) flipped successfully
          </p>
        </div>

      </div>

      {/* Cards */}
      <div className="row g-4">

        {flippedImages.map((item, index) => (

          <div
            key={index}
            className="col-xl-4 col-lg-4 col-md-6"
          >

            <ResultCard
              title="🔁 Flipped Image"
              image={item.flipped}
              originalFile={item.original.file}
              filename={item.original.file.name}
              badge="Flipped"
              badgeColor="secondary"
              originalSize={item.original.file.size}
              newSize={item.flipped.size}
              downloadName={item.flipped.name}
            />

          </div>

        ))}

      </div>

    </section>
  );
}

export default FlipResults;