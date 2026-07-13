import { Link } from "react-router-dom";

function FeaturedTools() {
  const featured = [
    {
      icon: "🗜️",
      title: "Compress Image",
      path: "/compress-image",
      users: "250K+ Users",
      rating: "★★★★★",
      description:
        "Reduce image size while maintaining excellent quality.",
      color: "primary",
    },
    {
      icon: "📏",
      title: "Resize Image",
      path: "/resize-image",
      users: "180K+ Users",
      rating: "★★★★★",
      description:
        "Resize images for social media, websites and printing.",
      color: "success",
    },
    {
      icon: "🔄",
      title: "Convert Image",
      path: "/convert-image",
      users: "150K+ Users",
      rating: "★★★★★",
      description:
        "Convert JPG, PNG, WEBP, BMP and GIF instantly.",
      color: "warning",
    },
    {
      icon: "✂️",
      title: "Crop Image",
      path: "/crop-image",
      users: "120K+ Users",
      rating: "★★★★★",
      description:
        "Crop photos accurately with a powerful editor.",
      color: "danger",
    },
  ];

  return (
    <section className="container my-5">

      <div className="text-center mb-5">

        <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">
          ⭐ Most Popular
        </span>

        <h2 className="display-5 fw-bold mt-3">
          Featured Image Tools
        </h2>

        <p
          className="lead text-muted mx-auto"
          style={{ maxWidth: "700px" }}
        >
          Powerful online image editing tools trusted by
          thousands of designers, developers, marketers and
          businesses around the world.
        </p>

      </div>

      <div className="row g-4">

        {featured.map((tool, index) => (

          <div
            key={index}
            className="col-lg-3 col-md-6"
          >

            <div className="card border-0 shadow-lg rounded-4 h-100 featured-card">

              <div className="card-body text-center p-4">

                <div
                  className={`bg-${tool.color} text-white rounded-circle d-inline-flex justify-content-center align-items-center mb-4`}
                  style={{
                    width: 80,
                    height: 80,
                    fontSize: 40,
                  }}
                >
                  {tool.icon}
                </div>

                <h4 className="fw-bold">
                  {tool.title}
                </h4>

                <div className="text-warning fs-5">
                  {tool.rating}
                </div>

                <div className="fw-semibold text-primary mb-3">
                  {tool.users}
                </div>

                <p className="text-muted">
                  {tool.description}
                </p>

                <Link
                  to={tool.path}
                  className={`btn btn-${tool.color} rounded-pill px-4`}
                >
                  Use Tool →
                </Link>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default FeaturedTools;