function StatsSection() {

  const stats = [

    {
      number: "500K+",
      label: "Images Processed",
      icon: "🖼️",
    },

    {
      number: "150K+",
      label: "Happy Users",
      icon: "😊",
    },

    {
      number: "99.9%",
      label: "Success Rate",
      icon: "✅",
    },

    {
      number: "100%",
      label: "Browser Based",
      icon: "🔒",
    },

  ];

  return (

    <section className="py-5">

      <div className="container">

        <div className="row g-4">

          {stats.map((item, index) => (

            <div
              className="col-lg-3 col-md-6"
              key={index}
            >

              <div className="card border-0 shadow rounded-4 text-center h-100 p-4">

                <div className="display-4">

                  {item.icon}

                </div>

                <h2 className="fw-bold text-primary mt-3">

                  {item.number}

                </h2>

                <p className="text-muted mb-0">

                  {item.label}

                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}

export default StatsSection;