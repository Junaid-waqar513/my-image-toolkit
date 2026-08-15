import { useState } from "react";
import { Link } from "react-router-dom";

function ToolsGrid() {
  // =====================================================
  // ALL TOOLS
  // =====================================================

  const tools = [
    {
      icon: "🗜️",
      title: "Compress Image",
      description:
        "Reduce image size without losing quality.",
      path: "/compress-image",
      color: "primary",
      badge: "Popular",
      category: "Compress",
    },

    {
      icon: "📏",
      title: "Resize Image",
      description:
        "Resize images instantly for websites and social media.",
      path: "/resize-image",
      color: "success",
      badge: "Popular",
      category: "Edit",
    },

    {
      icon: "🔄",
      title: "Convert Image",
      description:
        "Convert JPG, PNG, WEBP and other image formats.",
      path: "/convert-image",
      color: "warning",
      badge: "Popular",
      category: "Convert",
    },

    {
      icon: "✂️",
      title: "Crop Image",
      description:
        "Crop images online quickly and accurately.",
      path: "/crop-image",
      color: "danger",
      badge: "Free",
      category: "Edit",
    },

    {
      icon: "↩️",
      title: "Rotate Image",
      description:
        "Rotate images quickly to the correct orientation.",
      path: "/rotate-image",
      color: "secondary",
      badge: "Free",
      category: "Edit",
    },

    {
      icon: "💧",
      title: "Watermark Image",
      description:
        "Add text or watermarks to your photos.",
      path: "/watermark-image",
      color: "dark",
      badge: "Free",
      category: "Edit",
    },

    // =====================================================
    // IMAGE HEALTH CHECKER
    // =====================================================

    {
      icon: "🩺",
      title: "Image Health Checker",
      description:
        "Check image size, dimensions, format, performance and SEO, then optimize it instantly.",
      path: "/image-health-checker",
      color: "info",
      badge: "NEW",
      category: "Compress",
    },

    {
      icon: "🕵️",
      title: "EXIF Metadata Remover",
      description:
        "Remove hidden EXIF data and GPS location from your photos.",
      path: "/exif-remover",
      color: "dark",
      badge: "NEW",
      category: "Edit",
    },
    {
      icon: "📄",
      title: "Image to PDF",
      description:
        "Convert JPG and PNG images into PDF documents.",
      path: "/image-to-pdf",
      color: "danger",
      badge: "Popular",
      category: "Convert",
    },
  ];

  // =====================================================
  // SEARCH / FILTER STATE
  // =====================================================

  const [search, setSearch] = useState("");

  const [activeCategory, setActiveCategory] =
    useState("All");

  // =====================================================
  // FILTER TOOLS
  // =====================================================

  const filteredTools = tools.filter((tool) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      tool.title
        .toLowerCase()
        .includes(searchText) ||
      tool.description
        .toLowerCase()
        .includes(searchText);

    const matchesCategory =
      activeCategory === "All"
        ? true
        : tool.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section className="container my-5">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="text-center mb-5">

        <h2 className="display-5 fw-bold">
          All Image Tools
        </h2>

        <p className="lead text-muted">
          Free online image editing and optimization
          tools for everyone.
        </p>

      </div>

      {/* =================================================
          SEARCH + FILTERS
      ================================================= */}

      <div className="row mb-5">

        {/* SEARCH */}

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

        {/* FILTERS */}

        <div className="col-lg-6 mt-3 mt-lg-0">

          <div className="d-flex flex-wrap gap-2 justify-content-lg-end">

            {[
              "All",
              "Compress",
              "Edit",
              "Convert",
            ].map((cat) => (

              <button
                key={cat}
                type="button"
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

      {/* =================================================
          ACTIVE FILTER MESSAGE
      ================================================= */}

      {(search || activeCategory !== "All") && (

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div className="text-muted small">

            Showing{" "}
            <strong>
              {filteredTools.length}
            </strong>{" "}
            tool
            {filteredTools.length !== 1
              ? "s"
              : ""}

          </div>

          <button
            type="button"
            className="btn btn-sm btn-outline-secondary rounded-pill"
            onClick={() => {
              setSearch("");
              setActiveCategory("All");
            }}
          >
            Clear Filters
          </button>

        </div>

      )}

      {/* =================================================
          TOOL CARDS
      ================================================= */}

      <div className="row g-4">

        {filteredTools.map((tool) => (

          <div
            key={tool.path}
            className="col-lg-4 col-md-6"
          >

            <div
              className="card h-100 border-0 shadow-lg rounded-4 tool-card"
            >

              <div className="card-body p-4">

                {/* =================================================
                    ICON + BADGE
                ================================================= */}

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

                  <span
                    className={`badge bg-${tool.color}`}
                  >
                    {tool.badge}
                  </span>

                </div>

                {/* =================================================
                    TITLE
                ================================================= */}

                <h4 className="fw-bold mt-4">
                  {tool.title}
                </h4>

                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <p className="text-muted">
                  {tool.description}
                </p>

                {/* =================================================
                    FEATURES
                ================================================= */}

                <div className="mb-4">

                  <div>
                    ✅ Free Forever
                  </div>

                  <div>
                    ⚡ Lightning Fast
                  </div>

                  <div>
                    🔒 Privacy Friendly
                  </div>

                </div>

                {/* =================================================
                    OPEN TOOL
                ================================================= */}

                <Link
                  to={tool.path}
                  className="btn btn-primary rounded-pill"
                >
                  Open Tool →
                </Link>

              </div>

            </div>

          </div>

        ))}

        {/* =================================================
            NO RESULTS
        ================================================= */}

        {filteredTools.length === 0 && (

          <div className="col-12">

            <div className="alert alert-info text-center rounded-4">

              <h5>
                No tools found
              </h5>

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