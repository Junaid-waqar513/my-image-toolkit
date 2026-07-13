import ResultCard from "../ResultCard";
import EmptyState from "../EmptyState";
import ImageComparison from "../ImageComparison";

function CompressionResults({
  processedImages,
  downloadCompressedZip,
}) {

  if (processedImages.length === 0) {
  return (
    <EmptyState
      icon="🗜️"
      title="No Compressed Images"
      description="Compress an image to see results here."
    />
  );
}

  return (
    <section className="mt-5">

      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">

        <div>

          <h2 className="fw-bold mb-1">
            🗜️ Compressed Images
          </h2>

          <p className="text-muted mb-0">
            {processedImages.length} image(s) compressed successfully
          </p>

        </div>

        <button
          className="btn btn-dark btn-lg rounded-pill mt-3 mt-md-0 px-4"
          onClick={downloadCompressedZip}
        >
          📦 Download All ZIP
        </button>

      </div>

      {/* Cards */}

      <div className="row g-4">

        {processedImages.map((item, index) => (

  <div
    key={index}
    className="col-xl-4 col-lg-4 col-md-6"
  >

    <ResultCard
      title="🗜️ Compressed Image"
      image={item.compressed}
      originalFile={item.original.file}
      filename={item.original.file.name}
      badge="Compressed"
      badgeColor="success"
      originalSize={item.original.file.size}
      newSize={item.compressed.size}
      downloadName={item.compressed.name}
    />

  </div>

))}

      </div>
      <ImageComparison
  title="Compression Comparison"
  before={
    processedImages.length
      ? processedImages[0].original.preview
      : null
  }
  after={
    processedImages.length
      ? URL.createObjectURL(
          processedImages[0].compressed
        )
      : null
  }
/>

    </section>
  );

}

export default CompressionResults;