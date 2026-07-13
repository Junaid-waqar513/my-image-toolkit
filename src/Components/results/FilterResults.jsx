import ResultCard from "../ResultCard";
import EmptyState from "../EmptyState";
import ImageComparison from "../ImageComparison";

function FilterResults({ filteredImages }) {

  if (filteredImages.length === 0) {
    return (
      <EmptyState
        icon="🎨"
        title="No Filtered Images"
        description="Apply filters to an image to see the results here."
      />
    );
  }

  return (
    <section className="mt-5">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold mb-1">
            🎨 Filtered Images
          </h2>

          <p className="text-muted mb-0">
            {filteredImages.length} image(s) filtered successfully
          </p>

        </div>

      </div>

      {/* Result Cards */}

      <div className="row g-4">

        {filteredImages.map((item, index) => (

          <div
            key={index}
            className="col-xl-4 col-lg-4 col-md-6"
          >

            <ResultCard
              title="🎨 Filtered Image"
              image={item.filtered}
              originalFile={item.original.file}
              filename={item.original.file.name}
              badge="Filtered"
              badgeColor="primary"
              originalSize={item.original.file.size}
              newSize={item.filtered.size}
              downloadName={item.filtered.name}
            />

          </div>
          

        ))}

      </div>
<ImageComparison
  title="Filter Comparison"
  before={
    filteredImages.length
      ? filteredImages[0].original.preview
      : null
  }
  after={
    filteredImages.length
      ? URL.createObjectURL(
          filteredImages[0].filtered
        )
      : null
  }
/>
    </section>
  );
}

export default FilterResults;