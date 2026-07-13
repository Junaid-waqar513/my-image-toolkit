import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      id="footer"
      className="mt-5"
      style={{
        background: "#0f172a",
        color: "#fff",
      }}
    >
      <div className="container py-5">

        <div className="row gy-5">

          {/* About */}

          <div className="col-lg-4">

            <h3 className="fw-bold mb-3">
              🖼 ImageToolkit
            </h3>

            <p
              className="text-light"
              style={{
                lineHeight: "1.8",
              }}
            >
              Free online image editing tools that work directly
              in your browser. Compress, resize, convert, crop,
              rotate, flip, watermark and optimize images with
              complete privacy.
            </p>

            <div className="mt-4">

              <span className="badge bg-success me-2">
                Secure
              </span>

              <span className="badge bg-primary me-2">
                Fast
              </span>

              <span className="badge bg-warning text-dark">
                Free
              </span>

            </div>

          </div>

          {/* Image Tools */}

          <div className="col-lg-2 col-md-6">

            <h5 className="fw-bold mb-4">
              Image Tools
            </h5>

            <ul className="list-unstyled">

              <li className="mb-2">
                <Link
                  to="/compress-image"
                  className="text-decoration-none text-light"
                >
                  Compress Image
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/resize-image"
                  className="text-decoration-none text-light"
                >
                  Resize Image
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/convert-image"
                  className="text-decoration-none text-light"
                >
                  Convert Image
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/crop-image"
                  className="text-decoration-none text-light"
                >
                  Crop Image
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/watermark-image"
                  className="text-decoration-none text-light"
                >
                  Watermark
                </Link>
              </li>

              <li>
                <Link
                  to="/batch-process"
                  className="text-decoration-none text-light"
                >
                  Batch Processing
                </Link>
              </li>

            </ul>

          </div>

          {/* Quick Links */}

          <div className="col-lg-2 col-md-6">

            <h5 className="fw-bold mb-4">
              Quick Links
            </h5>

            <ul className="list-unstyled">

              <li className="mb-2">
                <Link
                  to="/"
                  className="text-decoration-none text-light"
                >
                  Home
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/about"
                  className="text-decoration-none text-light"
                >
                  About
                </Link>
              </li>

              <li className="mb-2">
                <a
                  href="#faq"
                  className="text-decoration-none text-light"
                >
                  FAQ
                </a>
              </li>

              <li className="mb-2">
                <Link
                  to="/contact"
                  className="text-decoration-none text-light"
                >
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* Resources */}

          <div className="col-lg-2 col-md-6">

            <h5 className="fw-bold mb-4">
              Resources
            </h5>

            <ul className="list-unstyled">

              <li className="mb-2">
                <Link
                  to="/privacy-policy"
                  className="text-decoration-none text-light"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="text-decoration-none text-light"
                >
                  Terms of Service
                </Link>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div className="col-lg-2 col-md-6">

            <h5 className="fw-bold mb-4">
              Connect
            </h5>

            <p className="mb-2">

              📧 support@imagetoolkit.com

            </p>

            <p className="mb-2">

              🌍 Available Worldwide

            </p>

            <Link
              to="/contact"
              className="btn btn-success rounded-pill mt-2"
            >
              Contact Us
            </Link>

          </div>

        </div>

        <hr
          className="my-5"
          style={{
            borderColor: "rgba(255,255,255,.15)",
          }}
        />

        <div className="row align-items-center">

          <div className="col-md-6">

            <small>

              © {new Date().getFullYear()} ImageToolkit.
              All Rights Reserved.

            </small>

          </div>

          <div className="col-md-6 text-md-end mt-3 mt-md-0">

            <small>

              Built with React • Bootstrap • JavaScript

            </small>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;