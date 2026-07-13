function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Graphic Designer",
      image: "👩",
      rating: "★★★★★",
      review:
        "ImageToolkit has become my favorite online image editor. Fast, simple and incredibly reliable.",
    },
    {
      name: "Michael Brown",
      role: "Web Developer",
      image: "👨",
      rating: "★★★★★",
      review:
        "The compression quality is amazing. I use it daily before uploading images to my clients' websites.",
    },
    {
      name: "Emily Davis",
      role: "Digital Marketer",
      image: "👩‍💼",
      rating: "★★★★★",
      review:
        "Everything works inside the browser and it's completely free. That's exactly what I needed.",
    },
  ];

  return (
    <section className="py-5 bg-light">

      <div className="container">

        <div className="text-center mb-5">

          <span className="badge bg-primary px-4 py-2 rounded-pill">
            Testimonials
          </span>

          <h2 className="display-5 fw-bold mt-3">
            Loved by Thousands of Users
          </h2>

          <p
            className="text-muted mx-auto"
            style={{ maxWidth: "700px" }}
          >
            Designers, developers, marketers and students use
            ImageToolkit every day to optimize and edit images.
          </p>

        </div>

        <div className="row g-4">

          {testimonials.map((user, index) => (

            <div
              className="col-lg-4"
              key={index}
            >

              <div className="card border-0 shadow rounded-4 h-100 p-4">

                <div className="display-4 mb-3">
                  {user.image}
                </div>

                <h4 className="fw-bold">
                  {user.name}
                </h4>

                <div className="text-muted mb-2">
                  {user.role}
                </div>

                <div className="text-warning fs-5 mb-3">
                  {user.rating}
                </div>

                <p className="mb-0">
                  "{user.review}"
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;