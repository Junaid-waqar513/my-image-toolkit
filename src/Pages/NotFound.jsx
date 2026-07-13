import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container text-center py-5">

      <h1 className="display-1 fw-bold">
        404
      </h1>

      <h2 className="mb-3">
        Page Not Found
      </h2>

      <p className="text-muted">
        The page you requested doesn't exist.
      </p>

      <Link
        to="/"
        className="btn btn-primary rounded-pill px-4"
      >
        Go Home
      </Link>

    </div>
  );
}

export default NotFound;