import CompareImage from "react-compare-image";

function ImageComparison({
  before,
  after,
  title = "Before & After",
  description = "Drag the slider to compare both images.",
  beforeLabel = "Before",
  afterLabel = "After",
}) {
  if (!before || !after) return null;

  return (
    <section className="mt-4">
      <div className="card border-0 shadow rounded-4 overflow-hidden">
        <div className="card-header bg-white text-center py-3 border-bottom-0">
          <h4 className="fw-bold mb-1">
            🔍 {title}
          </h4>

          <p className="text-muted mb-0 small">
            {description}
          </p>
        </div>

        <CompareImage
          leftImage={before}
          rightImage={after}
          leftImageLabel={beforeLabel}
          rightImageLabel={afterLabel}
          sliderLineWidth={4}
          sliderLineColor="#0d6efd"
          aspectRatio="wider"
        />
      </div>
    </section>
  );
}

export default ImageComparison;