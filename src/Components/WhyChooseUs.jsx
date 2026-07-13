function WhyChooseUs() {
  const features = [
    {
      icon: "⚡",
      title: "Fast Processing",
      description:
        "Optimize, resize and convert images within seconds using your browser.",
    },
    {
      icon: "🔒",
      title: "100% Privacy",
      description:
        "Your images never leave your device. Everything is processed locally.",
    },
    {
      icon: "🆓",
      title: "Completely Free",
      description:
        "Use every image tool without subscriptions, hidden charges or registration.",
    },
    {
      icon: "📱",
      title: "Mobile Friendly",
      description:
        "Works perfectly on desktop, tablet and mobile devices.",
    },
    {
      icon: "🖼️",
      title: "Multiple Formats",
      description:
        "Supports JPG, PNG, WEBP, GIF and BMP images.",
    },
    {
      icon: "🚀",
      title: "All-in-One Toolkit",
      description:
        "Compress, Resize, Convert, Crop, Rotate, Flip, Watermark and much more in one place.",
    },
  ];

  return (
    <section className="py-5">

      <div className="text-center mb-5">

        <span className="badge bg-success px-4 py-2 rounded-pill mb-3">
          Why Choose Us
        </span>

        <h2 className="display-5 fw-bold">
          Everything You Need to Edit Images Online
        </h2>

        <p
          className="text-muted mx-auto"
          style={{ maxWidth: "760px" }}
        >
          Our Image Toolkit is designed to provide professional
          image editing tools that are fast, secure and easy to use.
        </p>

      </div>

      <div className="row g-4">

        {features.map((feature, index) => (

          <div
            className="col-lg-4 col-md-6"
            key={index}
          >

            <div className="card border-0 shadow-lg rounded-4 h-100 p-4">

              <div
                className="rounded-circle d-flex justify-content-center align-items-center mb-4"
                style={{
                  width: "75px",
                  height: "75px",
                  background:
                    "linear-gradient(135deg,#198754,#20c997)",
                  color: "#fff",
                  fontSize: "34px",
                }}
              >
                {feature.icon}
              </div>

              <h4 className="fw-bold">
                {feature.title}
              </h4>

              <p className="text-muted mb-0">
                {feature.description}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default WhyChooseUs;