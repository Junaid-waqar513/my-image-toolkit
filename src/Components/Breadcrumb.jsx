import { Link, useLocation } from "react-router-dom";

function Breadcrumb() {
  const location = useLocation();

  const pathnames = location.pathname
    .split("/")
    .filter(Boolean);

  return (
    <nav
      aria-label="breadcrumb"
      className="mb-4"
    >
      <ol className="breadcrumb bg-light rounded-4 p-3 shadow-sm">

        <li className="breadcrumb-item">
          <Link
            to="/"
            className="text-decoration-none"
          >
            🏠 Home
          </Link>
        </li>

        {pathnames.map((value, index) => {

          const to =
            "/" +
            pathnames
              .slice(0, index + 1)
              .join("/");

          const last =
            index === pathnames.length - 1;

          return (
            <li
              key={to}
              className={`breadcrumb-item ${
                last ? "active" : ""
              }`}
              aria-current={
                last ? "page" : undefined
              }
            >
              {last ? (
                value
                  .replace("-", " ")
                  .replace(/\b\w/g, (c) =>
                    c.toUpperCase()
                  )
              ) : (
                <Link
                  to={to}
                  className="text-decoration-none"
                >
                  {value
                    .replace("-", " ")
                    .replace(/\b\w/g, (c) =>
                      c.toUpperCase()
                    )}
                </Link>
              )}
            </li>
          );
        })}

      </ol>
    </nav>
  );
}

export default Breadcrumb;