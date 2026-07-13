import ResultCard from "../ResultCard";
import EmptyState from "../EmptyState";

function BatchResults({
  batchResults,
}) {

  if (batchResults.length === 0) {
    return (
      <EmptyState
        icon="⚡"
        title="No Batch Results"
        description="Run batch processing to see results here."
      />
    );
  }

  return (
    <section className="mt-5">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold mb-1">
            ⚡ Batch Processing Results
          </h2>

          <p className="text-muted mb-0">
            {batchResults.length} image(s) processed successfully
          </p>

        </div>

      </div>

      {/* Cards */}

      <div className="row g-4">

        {batchResults.map((item, index) => (

          <div
            key={index}
            className="col-xl-4 col-lg-4 col-md-6"
          >

            <ResultCard
              title="⚡ Batch Processed"
              image={item.processed}
              originalFile={item.original.file}
              filename={item.original.file.name}
              badge="Batch"
              badgeColor="primary"
              originalSize={item.original.file.size}
              newSize={item.processed.size}
              downloadName={item.processed.name}
            />

          </div>

        ))}

      </div>

    </section>
  );

}

export default BatchResults;