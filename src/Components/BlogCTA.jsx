import React from 'react';
import { Link } from 'react-router-dom';

function BlogCTA({ toolName, toolUrl }) {
  return (
    <div 
      className="alert alert-danger d-flex flex-column flex-md-row align-items-center justify-content-between p-4 my-4 border-0 rounded-4 shadow-sm" 
      style={{ backgroundColor: '#fff5f5', borderLeft: '5px solid #dc3545' }}
    >
      <div className="d-flex align-items-center mb-3 mb-md-0">
        <span className="fs-2 me-3">🚀</span>
        <div>
          <h5 className="fw-bold text-dark mb-1">Launch the Free {toolName} Tool</h5>
          <p className="small text-muted mb-0">100% browser-based. Zero server uploads. Pure data privacy.</p>
        </div>
      </div>
      <Link to={toolUrl} className="btn btn-danger btn-lg rounded-pill fw-bold px-4 shadow-sm">
        Open Tool Now
      </Link>
    </div>
  );
}

export default BlogCTA;
