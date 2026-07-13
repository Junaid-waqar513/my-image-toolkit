import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import "../styles/dropzone.css";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

function DropZone({ images, setImages }) {
  const onDrop = (acceptedFiles, fileRejections) => {
    // Validation Errors
    fileRejections.forEach(({ file, errors }) => {
      errors.forEach((error) => {
        if (error.code === "file-too-large") {
          toast.error(`${file.name} is larger than 20 MB.`);
        } else if (error.code === "file-invalid-type") {
          toast.error(`${file.name} is not a supported image.`);
        } else {
          toast.error(`${file.name}: ${error.message}`);
        }
      });
    });

    const existingNames = new Set(
      images.map((img) => img.file.name)
    );

    const newFiles = acceptedFiles
      .filter((file) => {
        if (existingNames.has(file.name)) {
          toast.warning(`${file.name} is already added.`);
          return false;
        }

        return true;
      })
      .map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

    if (newFiles.length > 0) {
      setImages((prev) => [...prev, ...newFiles]);

      toast.success(
        `${newFiles.length} image(s) uploaded successfully.`
      );
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: MAX_FILE_SIZE,
    accept: {
      "image/*": [],
    },
  });

  // Total Upload Size
  const totalSize = images.reduce(
    (sum, img) => sum + img.file.size,
    0
  );

  return (
    <section>

      <div
        {...getRootProps()}
        className={`dropzone-card ${
          isDragActive ? "drag-active" : ""
        }`}
      >
        <input {...getInputProps()} />

        {/* Upload Icon */}

        <div className="upload-icon mb-3">
          {isDragActive ? "📥" : "☁️"}
        </div>

        {/* Heading */}

        <h2 className="fw-bold mb-3">

          {isDragActive
            ? "Drop your images here"
            : "Drag & Drop Your Images"}

        </h2>

        <p className="text-muted fs-5 mb-4">

          Upload one or multiple images to start editing instantly.

        </p>

        {/* CTA */}

        <button
          type="button"
          className="btn btn-primary btn-lg rounded-pill px-5 shadow"
        >
          📁 Browse Images
        </button>

        {/* Supported Formats */}

        <div className="mt-5">

          <h6 className="fw-bold mb-3">
            Supported Formats
          </h6>

          <div className="d-flex justify-content-center flex-wrap gap-2">

            <span className="badge rounded-pill bg-primary px-3 py-2">
              JPG
            </span>

            <span className="badge rounded-pill bg-success px-3 py-2">
              PNG
            </span>

            <span className="badge rounded-pill bg-warning text-dark px-3 py-2">
              WEBP
            </span>

            <span className="badge rounded-pill bg-danger px-3 py-2">
              GIF
            </span>

            <span className="badge rounded-pill bg-dark px-3 py-2">
              BMP
            </span>

          </div>

        </div>

        {/* Upload Info */}

        <div className="mt-4">

          <small className="text-secondary d-block">

            ✔ Multiple Images Supported

          </small>

          <small className="text-secondary d-block">

            ✔ Maximum File Size: 20 MB

          </small>

          <small className="text-secondary d-block">

            ✔ Processing Happens Inside Your Browser

          </small>

          <small className="text-success fw-semibold d-block mt-2">

            🔒 Your images are never uploaded to our server.

          </small>

        </div>

      </div>

      {/* Upload Statistics */}

      {images.length > 0 && (

        <div className="row mt-4 g-3">

          <div className="col-md-4">

            <div className="card border-0 shadow-sm rounded-4">

              <div className="card-body text-center">

                <h3 className="text-primary fw-bold">

                  {images.length}

                </h3>

                <p className="mb-0">
                  Uploaded Images
                </p>

              </div>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card border-0 shadow-sm rounded-4">

              <div className="card-body text-center">

                <h3 className="text-success fw-bold">

                  {(totalSize / 1024 / 1024).toFixed(2)} MB

                </h3>

                <p className="mb-0">
                  Total Size
                </p>

              </div>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card border-0 shadow-sm rounded-4">

              <div className="card-body text-center">

                <h3 className="text-warning fw-bold">

                  Ready

                </h3>

                <p className="mb-0">
                  Status
                </p>

              </div>

            </div>

          </div>

        </div>

      )}

    </section>
  );
}

export default DropZone;