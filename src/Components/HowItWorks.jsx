function HowItWorks() {
  const steps = [
    {
      icon: "📤",
      title: "Upload Image",
      description:
        "Upload JPG, PNG, WEBP, GIF or BMP images by dragging them into the upload area or selecting them from your computer.",
    },
    {
      icon: "⚙️",
      title: "Choose a Tool",
      description:
        "Select Image Compression, Resize, Convert, Crop, Rotate, Flip, Filters, Watermark or Batch Processing.",
    },
    {
      icon: "⚡",
      title: "Process Image",
      description:
        "Our browser processes your images instantly without uploading them to a server, making everything faster and private.",
    },
    {
      icon: "⬇️",
      title: "Download",
      description:
        "Preview the result, compare before and after, then download your optimized image or ZIP file.",
    },
  ];

  return (
    <section className="py-5">

      <div className="text-center mb-5">

        <span className="badge bg-primary px-3 py-2 mb-3">
          Easy Workflow
        </span>

        <h2 className="fw-bold display-6">
          How Our Image Toolkit Works
        </h2>

        <p className="text-muted mx-auto" style={{ maxWidth: 700 }}>
          Edit your images in just four simple steps.
          No registration, no installation and no waiting.
        </p>

      </div>

      <div className="row g-4">

        {steps.map((step, index) => (

          <div
            key={index}
            className="col-lg-3 col-md-6"
          >

            <div className="card border-0 shadow-lg rounded-4 h-100 text-center p-4">

              <div
                className="mx-auto mb-4 rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: 80,
                  height: 80,
                  background: "#0d6efd",
                  color: "#fff",
                  fontSize: 36,
                }}
              >
                {step.icon}
              </div>

              <div className="badge bg-light text-dark mb-3">
                Step {index + 1}
              </div>

              <h4 className="fw-bold">
                {step.title}
              </h4>

              <p className="text-muted mb-0">
                {step.description}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default HowItWorks;