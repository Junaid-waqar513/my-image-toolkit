import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  resizeToSquarePng,
  buildIco,
  buildWebManifest,
  buildHtmlSnippet,
} from "../utils/iconGenerator";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

// The standard set most sites and PWAs actually need.
const ICON_SIZES = [
  { size: 16, filename: "favicon-16x16.png" },
  { size: 32, filename: "favicon-32x32.png" },
  { size: 48, filename: "favicon-48x48.png" },
  { size: 180, filename: "apple-touch-icon.png" },
  { size: 192, filename: "icon-192.png" },
  { size: 512, filename: "icon-512.png" },
];

function FaviconGenerator() {
  const [sourceImage, setSourceImage] = useState(null);
  const [sourcePreview, setSourcePreview] = useState(null);
  const [previews, setPreviews] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [siteName, setSiteName] = useState("My Site");

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
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

    const file = acceptedFiles[0];
    if (!file) return;

    setPreviews([]);
    setSourceImage(file);
    setSourcePreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: MAX_FILE_SIZE,
    accept: { "image/*": [] },
  });

  const generateIcons = async () => {
    if (!sourceImage) return;

    setGenerating(true);
    setPreviews([]);

    try {
      const img = new Image();
      const url = URL.createObjectURL(sourceImage);
      img.src = url;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      if (img.naturalWidth < 512 || img.naturalHeight < 512) {
        toast.warning(
          "For best results, use a source image at least 512×512px. Smaller sources will be upscaled and may look soft at larger icon sizes."
        );
      }

      const results = [];
      for (const spec of ICON_SIZES) {
         
        const blob = await resizeToSquarePng(img, spec.size);
        results.push({ ...spec, blob, preview: URL.createObjectURL(blob) });
      }

      URL.revokeObjectURL(url);
      setPreviews(results);
      toast.success("Icon set generated — ready to download.");
    } catch (error) {
      console.error("Icon generation failed:", error);
      toast.error("Couldn't generate icons from this image.");
    } finally {
      setGenerating(false);
    }
  };

  const downloadZip = async () => {
    if (previews.length === 0) return;

    try {
      const zip = new JSZip();

      previews.forEach((p) => {
        zip.file(p.filename, p.blob);
      });

      const icoSizes = previews.filter((p) => [16, 32, 48].includes(p.size));
      const icoBlob = await buildIco(icoSizes);
      zip.file("favicon.ico", icoBlob);

      zip.file(
        "site.webmanifest",
        buildWebManifest(siteName, siteName.slice(0, 12))
      );
      zip.file("head-snippet.html", buildHtmlSnippet());

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "favicon-pwa-icon-pack.zip");
    } catch (error) {
      console.error("Zip generation failed:", error);
      toast.error("Couldn't create the ZIP file.");
    }
  };

  return (
    <section>
      <div
        {...getRootProps()}
        className={`dropzone-card ${isDragActive ? "drag-active" : ""}`}
      >
        <input {...getInputProps()} />

        <div className="upload-icon mb-3">{isDragActive ? "📥" : "🖼️"}</div>

        <h2 className="fw-bold mb-3">
          {isDragActive
            ? "Drop your logo or icon here"
            : "Drag & Drop Your Source Image"}
        </h2>

        <p className="text-muted fs-5 mb-4">
          One square image, ideally 512×512px or larger. We'll generate
          every favicon and PWA icon size you need.
        </p>

        <button
          type="button"
          className="btn btn-primary btn-lg rounded-pill px-5 shadow"
        >
          📁 Browse Image
        </button>

        <div className="mt-4">
          <small className="text-secondary d-block">
            ✔ Single image, ideally square
          </small>
          <small className="text-secondary d-block">
            ✔ Generates favicon.ico + 6 PNG sizes + manifest
          </small>
          <small className="text-success fw-semibold d-block mt-2">
            🔒 Your image is never uploaded to our server.
          </small>
        </div>
      </div>

      {sourceImage && (
        <div className="card border-0 shadow-sm rounded-4 mt-4">
          <div className="card-body p-4">
            <div className="d-flex align-items-center gap-4 flex-wrap">
              <img
                src={sourcePreview}
                alt="Source"
                className="rounded-3"
                style={{ width: 80, height: 80, objectFit: "cover" }}
              />

              <div className="flex-grow-1" style={{ minWidth: 220 }}>
                <label className="form-label fw-semibold mb-1">
                  Site name (used in the manifest)
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  maxLength={40}
                />
              </div>

              <button
                type="button"
                className="btn btn-success btn-lg rounded-pill px-4"
                onClick={generateIcons}
                disabled={generating}
              >
                {generating ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Generating…
                  </>
                ) : (
                  "⚡ Generate Icon Set"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {previews.length > 0 && (
        <div className="mt-5">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <h3 className="fw-bold mb-0">Generated Icons</h3>
            <button
              type="button"
              className="btn btn-primary rounded-pill px-4"
              onClick={downloadZip}
            >
              ⬇ Download Full Pack (.zip)
            </button>
          </div>

          <div className="row g-3">
            {previews.map((p) => (
              <div className="col-6 col-md-4 col-lg-2" key={p.filename}>
                <div className="card border-0 shadow-sm rounded-4 text-center h-100">
                  <div className="card-body p-3">
                    <img
                      src={p.preview}
                      alt={p.filename}
                      className="rounded-3 mb-2"
                      style={{
                        width: 56,
                        height: 56,
                        objectFit: "cover",
                        background:
                          "repeating-conic-gradient(#e9ecef 0% 25%, transparent 0% 50%) 0 0 / 12px 12px",
                      }}
                    />
                    <div className="small fw-semibold text-truncate" title={p.filename}>
                      {p.filename}
                    </div>
                    <div className="small text-muted">
                      {p.size}×{p.size}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="alert alert-primary mt-4">
            The ZIP also includes <code>favicon.ico</code>,{" "}
            <code>site.webmanifest</code>, and a{" "}
            <code>head-snippet.html</code> file with the exact HTML tags to
            paste into your site's <code>&lt;head&gt;</code>.
          </div>
        </div>
      )}
    </section>
  );
}

export default FaviconGenerator;
