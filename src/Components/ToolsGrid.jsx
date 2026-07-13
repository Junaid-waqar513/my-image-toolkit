import { useState } from "react";
import { Link } from "react-router-dom";
function ToolsGrid() {
  const tools = [
  {
    icon: "🗜️",
    title: "Compress Image",
    description: "Reduce image size without losing quality.",
    path: "/compress-image",
  },
  {
    icon: "📏",
    title: "Resize Image",
    description: "Resize images instantly.",
    path: "/resize-image",
  },
  {
    icon: "🔄",
    title: "Convert Image",
    description: "Convert JPG, PNG and WEBP.",
    path: "/convert-image",
  },
  {
    icon: "✂️",
    title: "Crop Image",
    description: "Crop images online.",
    path: "/crop-image",
  },
  {
    icon: "↩️",
    title: "Rotate Image",
    description: "Rotate images quickly.",
    path: "/rotate-image",
  },
  {
    icon: "💧",
    title: "Watermark Image",
    description: "Add watermarks to photos.",
    path: "/watermark-image",
  },
];
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "All"
        ? true
        : tool.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="container my-5">

      <div className="text-center mb-5">

        <h2 className="display-5 fw-bold">
          All Image Tools
        </h2>

        <p className="lead text-muted">
          Free online image editing tools for everyone.
        </p>

      </div>

      {/* Search + Filters */}

      <div className="row mb-5">

        <div className="col-lg-6">

          <input
            type="text"
            className="form-control form-control-lg rounded-pill shadow-sm"
            placeholder="🔍 Search image tool..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="col-lg-6 mt-3 mt-lg-0">

          <div className="d-flex flex-wrap gap-2 justify-content-lg-end">

            {[
              "All",
              "Compress",
              "Edit",
              "Convert",
              "Batch",
            ].map((cat) => (

              <button
                key={cat}
                className={`btn ${
                  activeCategory === cat
                    ? "btn-primary"
                    : "btn-outline-primary"
                } rounded-pill`}
                onClick={() =>
                  setActiveCategory(cat)
                }
              >
                {cat}
              </button>

            ))}

          </div>

        </div>

      </div>

      {/* Cards */}

      <div className="row g-4">

        {filteredTools.map((tool, index) => (

          <div
            key={index}
            className="col-lg-4 col-md-6"
          >

            <div className="card h-100 border-0 shadow-lg rounded-4 tool-card">

              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center">

                  <div
                    className={`bg-${tool.color} text-white rounded-circle d-flex justify-content-center align-items-center`}
                    style={{
                      width: "70px",
                      height: "70px",
                      fontSize: "32px",
                    }}
                  >
                    {tool.icon}
                  </div>

                  <span className={`badge bg-${tool.color}`}>
                    {tool.badge}
                  </span>

                </div>

                <h4 className="fw-bold mt-4">
                  {tool.title}
                </h4>

                <p className="text-muted">
                  {tool.description}
                </p>

                <div className="mb-4">

                  <div>✅ Free Forever</div>

                  <div>⚡ Lightning Fast</div>

                  <div>🔒 Privacy Friendly</div>

                </div>

                <Link
  to={tool.path}
  className="btn btn-primary rounded-pill"
>
  Open Tool
</Link>

              </div>

            </div>

          </div>

        ))}

        {filteredTools.length === 0 && (

          <div className="col-12">

            <div className="alert alert-info text-center rounded-4">

              <h5>No tools found</h5>

              <p className="mb-0">
                Try searching with another keyword.
              </p>

            </div>

          </div>

        )}

      </div>

    </section>
  );
}

export default ToolsGrid;