function ControlSection({ title, icon, children }) {
  return (
    <div className="card shadow-lg border-0 rounded-4 mb-5">

      <div className="card-header bg-primary text-white rounded-top-4">

        <h4 className="mb-0">

          {icon} {title}

        </h4>

      </div>

      <div className="card-body">

        {children}

      </div>

    </div>
  );
}

export default ControlSection;