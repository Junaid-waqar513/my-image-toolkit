import ResultCard from "../ResultCard";
import EmptyState from "../EmptyState";

function ConvertResults({
  convertedImages,
  downloadConvertedZip,
}) {

  if (convertedImages.length === 0) {
    return (
      <EmptyState
        icon="🔄"
        title="No Converted Images"
        description="Convert an image to see results here."
      />
    );
  }

  return (
    <section className="mt-5">

      {/* Header */}

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">

        <div>

          <h2 className="fw-bold mb-1">
            🔄 Converted Images
          </h2>

          <p className="text-muted mb-0">
            {convertedImages.length} image(s) converted successfully
          </p>

        </div>

        <button
          className="btn btn-dark btn-lg rounded-pill mt-3 mt-md-0 px-4"
          onClick={downloadConvertedZip}
        >
          📦 Download All ZIP
        </button>

      </div>

      {/* Cards */}

      <div className="row g-4">

        {convertedImages.map((item, index) => (

          <div
            key={index}
            className="col-xl-4 col-lg-4 col-md-6"
          >

            <ResultCard
              title="🔄 Converted Image"
                 image={item.converted}
                 originalFile={item.original.file}
              filename={item.original.file.name}
              badge="Converted"
              badgeColor="info"
              originalSize={item.original.file.size}
              newSize={item.converted.size}
              extraInfo={[
                {
                  label: "Format",
                  value: item.converted.type
                    .replace("image/", "")
                    .toUpperCase(),
                },
              ]}
              downloadName={item.converted.name}
            />

          </div>

        ))}

      </div>

    </section>
  );

}

export default ConvertResults;