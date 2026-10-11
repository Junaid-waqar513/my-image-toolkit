import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { compressToTargetSize } from "../utils/compress";
import { downloadZip } from "../utils/downloadZip";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB, matches the rest of the site

function formatSize(bytes) {
  if (!bytes) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// targetKB: the exact target file size in kilobytes (e.g. 50 or 100).
function TargetSizeCompressor({ targetKB }) {
  const [results, setResults] = useState([]);
  const [compressing, setCompressing] = useState(false);
  const [downloadingAll, setDownloadingAll] = useState(false);

  const processFiles = useCallback(
    async (files) => {
      const imageFiles = files.filter((file) =>
        file.type.startsWith("image/")
      );

      if (imageFiles.length === 0) return;

      setCompressing(true);

      const newEntries = imageFiles.map((file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        originalFile: file,
        originalPreview: URL.createObjectURL(file),
        originalSize: file.size,
        status: "compressing",
        compressedBlob: null,
        compressedPreview: null,
        compressedSize: null,
        hitTarget: null,
      }));

      setResults((current) => [...current, ...newEntries]);

      for (const entry of newEntries) {
        try {
           
          const compressed = await compressToTargetSize(
            entry.originalFile,
            targetKB
          );

          const compressedSize = compressed.size;
          const targetBytes = targetKB * 1024;
          // Small tolerance — the underlying library gets close but rarely
          // hits the exact byte count, and images that are already smaller
          // than the target don't need compressing at all.
          const hitTarget = compressedSize <= targetBytes * 1.05;

          setResults((current) =>
            current.map((item) =>
              item.id === entry.id
                ? {
                    ...item,
                    status: "done",
                    compressedBlob: compressed,
                    compressedPreview: URL.createObjectURL(compressed),
                    compressedSize,
                    hitTarget,
                  }
                : item
            )
          );
        } catch (error) {
          console.error("Target-size compression failed:", error);
          setResults((current) =>
            current.map((item) =>
              item.id === entry.id ? { ...item, status: "error" } : item
            )
          );
        }
      }

      setCompressing(false);
      toast.success(
        `${imageFiles.length} image(s) compressed toward ${targetKB}KB.`
      );
    },
    [targetKB]
  );

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
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

      processFiles(acceptedFiles);
    },
    [processFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: MAX_FILE_SIZE,
    accept: { "image/*": [] },
  });

  const downloadOne = (entry) => {
    if (!entry.compressedBlob) return;
    const link = document.createElement("a");
    link.href = entry.compressedPreview;
    const dotIndex = entry.originalFile.name.lastIndexOf(".");
    const base =
      dotIndex > -1
        ? entry.originalFile.name.slice(0, dotIndex)
        : entry.originalFile.name;
    const ext = entry.compressedBlob.type.includes("png") ? "png" : "jpg";
    link.download = `${base}-${targetKB}kb.${ext}`;
    link.click();
  };

  const downloadAll = async () => {
    const done = results.filter((r) => r.status === "done");
    if (done.length === 0) return;

    setDownloadingAll(true);
    try {
      const files = done.map((entry) => {
        const dotIndex = entry.originalFile.name.lastIndexOf(".");
        const base =
          dotIndex > -1
            ? entry.originalFile.name.slice(0, dotIndex)
            : entry.originalFile.name;
        const ext = entry.compressedBlob.type.includes("png") ? "png" : "jpg";
        return new File(
          [entry.compressedBlob],
          `${base}-${targetKB}kb.${ext}`,
          { type: entry.compressedBlob.type }
        );
      });
      await downloadZip(files, `compressed-to-${targetKB}kb`);
    } catch (error) {
      console.error("Zip download failed:", error);
      toast.error("Could not create the ZIP file.");
    } finally {
      setDownloadingAll(false);
    }
  };

  const clearAll = () => {
    results.forEach((entry) => {
      URL.revokeObjectURL(entry.originalPreview);
      if (entry.compressedPreview) URL.revokeObjectURL(entry.compressedPreview);
    });
    setResults([]);
  };

  const doneCount = results.filter((r) => r.status === "done").length;
  const missedTargetCount = results.filter(
    (r) => r.status === "done" && !r.hitTarget
  ).length;

  return (
    <section>
      <div
        {...getRootProps()}
        className={`dropzone-card ${isDragActive ? "drag-active" : ""}`}
      >
        <input {...getInputProps()} />

        <div className="upload-icon mb-3">{isDragActive ? "📥" : "☁️"}</div>

        <h2 className="fw-bold mb-3">
          {isDragActive
            ? "Drop your images here"
            : `Drag & Drop Images to Compress to ${targetKB}KB`}
        </h2>

        <p className="text-muted fs-5 mb-4">
          Each image is compressed toward exactly {targetKB}KB automatically —
          no quality slider to fiddle with.
        </p>

        <button
          type="button"
          className="btn btn-primary btn-lg rounded-pill px-5 shadow"
        >
          📁 Browse Images
        </button>

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

      {results.length > 0 && (
        <div className="mt-5">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <h3 className="fw-bold mb-0">
              Results{" "}
              {compressing && (
                <span className="spinner-border spinner-border-sm ms-2 text-primary" />
              )}
            </h3>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill"
                onClick={clearAll}
              >
                Clear All
              </button>
              <button
                type="button"
                className="btn btn-success rounded-pill px-4"
                onClick={downloadAll}
                disabled={doneCount === 0 || downloadingAll}
              >
                {downloadingAll
                  ? "Zipping…"
                  : `⬇ Download All (${doneCount})`}
              </button>
            </div>
          </div>

          {missedTargetCount > 0 && (
            <div className="alert alert-warning">
              {missedTargetCount} image(s) couldn't be compressed all the way
              to {targetKB}KB without becoming unusably low quality. Those
              are shown at the smallest reasonable size instead — check the
              badge on each card.
            </div>
          )}

          <div className="row g-4">
            {results.map((entry) => (
              <div className="col-md-6" key={entry.id}>
                <div className="card border-0 shadow-sm rounded-4 h-100">
                  <div className="card-body p-4">
                    <div className="d-flex gap-3 mb-3">
                      <img
                        src={entry.originalPreview}
                        alt={entry.originalFile.name}
                        className="rounded-3"
                        style={{ width: 90, height: 90, objectFit: "cover" }}
                      />
                      <div className="flex-grow-1">
                        <h6
                          className="fw-bold text-truncate mb-1"
                          title={entry.originalFile.name}
                        >
                          {entry.originalFile.name}
                        </h6>
                        <div className="text-muted small">
                          Original: {formatSize(entry.originalSize)}
                        </div>

                        {entry.status === "compressing" && (
                          <div className="text-primary small mt-1">
                            <span className="spinner-border spinner-border-sm me-1" />
                            Compressing…
                          </div>
                        )}

                        {entry.status === "error" && (
                          <div className="text-danger small mt-1">
                            Couldn't compress this image.
                          </div>
                        )}

                        {entry.status === "done" && (
                          <div className="mt-1">
                            <span
                              className={`badge rounded-pill ${
                                entry.hitTarget ? "bg-success" : "bg-warning text-dark"
                              }`}
                            >
                              {formatSize(entry.compressedSize)}
                              {entry.hitTarget
                                ? ` ✓ under ${targetKB}KB`
                                : " (smallest possible)"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {entry.status === "done" && (
                      <button
                        type="button"
                        className="btn btn-primary rounded-pill w-100"
                        onClick={() => downloadOne(entry)}
                      >
                        ⬇ Download
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default TargetSizeCompressor;
