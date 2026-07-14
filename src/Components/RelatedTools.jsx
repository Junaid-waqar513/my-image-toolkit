import { Link, useLocation } from "react-router-dom";

const ALL_TOOLS = [
  { icon: "🗜️", title: "Compress Image", path: "/compress-image" },
  { icon: "📏", title: "Resize Image", path: "/resize-image" },
  { icon: "🔄", title: "Convert Image", path: "/convert-image" },
  { icon: "✂️", title: "Crop Image", path: "/crop-image" },
  { icon: "↻", title: "Rotate Image", path: "/rotate-image" },
  { icon: "⇋", title: "Flip Image", path: "/flip-image" },
  { icon: "💧", title: "Watermark Image", path: "/watermark-image" },
  { icon: "📦", title: "Batch Process", path: "/batch-process" },
];

// Shows up to 3 tools other than the one currently being viewed.
// Placed once inside ToolPageLayout so every tool page automatically
// links to the others — real contextual internal linking for SEO.
function RelatedTools() {
  const { pathname } = useLocation();

  const others = ALL_TOOLS.filter((tool) => tool.path !== pathname).slice(0, 3);

  if (others.length === 0) {
    return null;
  }

  return (
    <section className="container my-5">
      <h2 className="h4 fw-bold mb-4">Related Tools</h2>

      <div className="row g-3">
        {others.map((tool) => (
          <div className="col-md-4" key={tool.path}>
            <Link
              to={tool.path}
              className="d-flex align-items-center gap-3 p-3 border rounded-4 text-decoration-none text-dark h-100"
            >
              <span style={{ fontSize: "1.75rem" }}>{tool.icon}</span>
              <span className="fw-semibold">{tool.title}</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RelatedTools;