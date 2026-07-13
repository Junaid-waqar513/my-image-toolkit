function Newsletter() {
  return (
    <section className="py-5 bg-light">

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-lg-8">

            <div className="card border-0 shadow-lg rounded-5 p-5">

              <div className="text-center">

                <span className="badge bg-warning text-dark px-4 py-2 rounded-pill mb-3">
                  Newsletter
                </span>

                <h2 className="fw-bold mb-3">
                  Stay Updated
                </h2>

                <p className="text-muted mb-4">
                  Get notified whenever we launch new image tools,
                  features and performance improvements.
                </p>

              </div>

              <form>

                <div className="row g-3">

                  <div className="col-md-8">

                    <input
                      type="email"
                      className="form-control form-control-lg rounded-pill"
                      placeholder="Enter your email"
                    />

                  </div>

                  <div className="col-md-4 d-grid">

                    <button
                      className="btn btn-primary btn-lg rounded-pill"
                      type="submit"
                    >
                      Subscribe
                    </button>

                  </div>

                </div>

              </form>

              <small className="text-center text-muted mt-3 d-block">
                We respect your privacy. No spam, ever.
              </small>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Newsletter;