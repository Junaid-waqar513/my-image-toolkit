import React from 'react';

const SuccessBanner = ({ oldSize, newSize, onDownload }) => {
  // Calculate savings percentage safely
  const savings = oldSize > 0 ? Math.round(((oldSize - newSize) / oldSize) * 100) : 0;
  
  // Format bytes to readable strings (e.g., KB or MB)
  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div 
      className="card text-center my-4 p-4 border-0 shadow-sm" 
      style={{ backgroundColor: '#f1f8e9', borderRadius: '12px' }}
    >
      <div className="card-body">
        <h4 className="text-success mb-3">🎉 Optimization Complete!</h4>
        <div className="row my-3 justify-content-center">
          <div className="col-5 col-md-3 border-end">
            <small className="text-muted d-block">Original Size</small>
            <strong className="text-secondary fs-5">{formatSize(oldSize)}</strong>
          </div>
          <div className="col-5 col-md-3">
            <small className="text-muted d-block">Optimized Size</small>
            <strong className="text-success fs-5">{formatSize(newSize)}</strong>
          </div>
        </div>
        <div className="badge bg-success p-2 fs-6 my-2 mb-4">
          Saved {savings}% of file size!
        </div>
        <div>
          <button 
            onClick={onDownload} 
            className="btn btn-success btn-lg px-5 shadow-sm fw-bold"
            style={{ borderRadius: '8px' }}
          >
            Download Processed File
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessBanner;
