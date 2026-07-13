import ResultCard from "../ResultCard";
import EmptyState from "../EmptyState";
import ImageComparison from "../ImageComparison";
function WatermarkResults({
  watermarkedImages,
}) {

  if (watermarkedImages.length === 0) {
    return (
      <EmptyState
        icon="💧"
        title="No Watermarked Images"
        description="Apply a watermark to see results here."
      />
    );
  }

  return (
    <section className="mt-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            💧 Watermarked Images
          </h2>

          <p className="text-muted mb-0">
            {watermarkedImages.length} image(s) watermarked successfully
          </p>
        </div>

      </div>

      {/* Cards */}
      <div className="row g-4">

        {watermarkedImages.map((item, index) => (

          <div
            className="col-xl-4 col-lg-4 col-md-6"
            key={index}
          >

            <ResultCard
              title="💧 Watermarked Image"
              image={item.watermarked}
              originalFile={item.original.file}
              filename={item.original.file.name}
              badge="Watermarked"
              badgeColor="info"
              originalSize={item.original.file.size}
              newSize={item.watermarked.size}
              downloadName={item.watermarked.name}
            />

          </div>

        ))}

      </div>
<ImageComparison
  title="Watermark Comparison"
  before={
    watermarkedImages.length
      ? watermarkedImages[0].original.preview
      : null
  }
  after={
    watermarkedImages.length
      ? URL.createObjectURL(
          watermarkedImages[0].watermarked
        )
      : null
  }
/>
    </section>
  );

}

export default WatermarkResults;