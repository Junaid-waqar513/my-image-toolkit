import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const scrollToUploader = () => {
    const uploader = document.querySelector(".toolkit-section");

    if (uploader) {
      uploader.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark sticky-top shadow"
      style={{
        background: "rgba(15,23,42,.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,.08)",
        zIndex: 9999,
      }}
    >
      <div className="container">

        {/* Logo */}

        <Link
          to="/"
          className="navbar-brand fw-bold fs-3 d-flex align-items-center"
        >
          🖼️

          <span className="ms-2">
            ImageToolkit
          </span>
        </Link>

        {/* Mobile Toggle */}

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarMenu"
        >

          {/* Center Menu */}

          <ul className="navbar-nav mx-auto">

            {/* Home */}

            <li className="nav-item">

              <NavLink
                to="/"
                className="nav-link fw-semibold px-lg-3"
              >
                Home
              </NavLink>

            </li>

            {/* Tools Dropdown */}

            <li className="nav-item dropdown">

              <a
                href="#"
                className="nav-link dropdown-toggle fw-semibold"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Tools
              </a>

              <ul className="dropdown-menu shadow border-0 rounded-4">

                {/* Compress */}

                <li>

                  <NavLink
                    className="dropdown-item"
                    to="/compress-image"
                  >
                    🗜️ Compress Image
                  </NavLink>

                </li>

                {/* Resize */}

                <li>

                  <NavLink
                    className="dropdown-item"
                    to="/resize-image"
                  >
                    📏 Resize Image
                  </NavLink>

                </li>

                {/* Convert */}

                <li>

                  <NavLink
                    className="dropdown-item"
                    to="/convert-image"
                  >
                    🔄 Convert Image
                  </NavLink>

                </li>

                {/* Crop */}

                <li>

                  <NavLink
                    className="dropdown-item"
                    to="/crop-image"
                  >
                    ✂️ Crop Image
                  </NavLink>

                </li>

                {/* Rotate */}

                <li>

                  <NavLink
                    className="dropdown-item"
                    to="/rotate-image"
                  >
                    ↩️ Rotate Image
                  </NavLink>

                </li>

                {/* Watermark */}

                <li>

                  <NavLink
                    className="dropdown-item"
                    to="/watermark-image"
                  >
                    💧 Watermark Image
                  </NavLink>

                </li>

                {/* Divider */}

                <li>
                  <hr className="dropdown-divider" />
                </li>

                {/* Image Health Checker */}

                <li>

                  <NavLink
                    className="dropdown-item fw-semibold"
                    to="/image-health-checker"
                  >
                    🩺 Image Health Checker
                    <span className="badge bg-success ms-2">
                      NEW
                    </span>
                  </NavLink>

                </li>

                {/* EXIF Metadata Remover */}

                <li>

                  <NavLink
                    className="dropdown-item fw-semibold"
                    to="/exif-remover"
                  >
                    🕵️ EXIF Metadata Remover
                    <span className="badge bg-success ms-2">
                      NEW
                    </span>
                  </NavLink>

                </li>

                {/* Divider */}

                <li>
                  <hr className="dropdown-divider" />
                </li>

                {/* All Tools */}

                {/* Divider */}

                <li>
                  <hr className="dropdown-divider" />
                </li>

                {/* All Tools */}

                <li>

                  <NavLink
                    className="dropdown-item"
                    to="/"
                  >
                    🛠 View All Tools
                  </NavLink>

                </li>

              </ul>

            </li>

            {/* About */}

            <li className="nav-item">

              <NavLink
                to="/about"
                className="nav-link fw-semibold px-lg-3"
              >
                About
              </NavLink>

            </li>

            {/* Blog */}

            <li className="nav-item">

              <NavLink
                to="/blog"
                className="nav-link fw-semibold px-lg-3"
              >
                Blog
              </NavLink>

            </li>

            {/* Contact */}

            <li className="nav-item">

              <NavLink
                to="/contact"
                className="nav-link fw-semibold px-lg-3"
              >
                Contact
              </NavLink>

            </li>

          </ul>

          {/* Right Buttons */}

          <div className="d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">

            <button
              className="btn btn-success rounded-pill px-4"
              onClick={scrollToUploader}
            >
              🚀 Start Editing
            </button>

            <a
              href="https://github.com/Junaid-waqar513/my-image-toolkit"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-warning fw-bold rounded-pill px-4"
            >
              ⭐ GitHub
            </a>

          </div>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;