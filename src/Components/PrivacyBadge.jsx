import React from 'react';

const PrivacyBadge = () => {
  return (
    <div 
      className="alert alert-success d-flex align-items-center justify-content-center mx-auto my-3 p-2 border-0" 
      style={{ 
        maxWidth: '550px', 
        fontSize: '0.85rem', 
        borderRadius: '8px',
        backgroundColor: '#e8f5e9',
        color: '#1b5e20'
      }}
      role="alert"
    >
      <span className="me-2" style={{ fontSize: '1.1rem' }}>🔒</span>
      <div>
        <strong>100% Client-Side Privacy:</strong> Your images are processed entirely inside your web browser. Files are never uploaded to our servers.
      </div>
    </div>
  );
};

export default PrivacyBadge;
