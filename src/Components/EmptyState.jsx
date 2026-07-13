function EmptyState({
  icon,
  title,
 description,
}) {
  return (
    <div className="card border-0 shadow rounded-4 p-5 text-center mt-4">

      <div
        style={{
          fontSize: "70px",
        }}
      >
        {icon}
      </div>

      <h3 className="fw-bold mt-3">
        {title}
      </h3>

      <p className="text-muted mb-0">
        {description}
      </p>

    </div>
  );
}

export default EmptyState;