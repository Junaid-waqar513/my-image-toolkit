import React from 'react';
import { SUPPORT_URL } from '../config/support';

const BatchLimitModal = ({ isOpen, onClose, fileCount }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="modal fade show d-block" 
      tabIndex="-1" 
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow" style={{ borderRadius: '16px' }}>
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold text-dark mx-auto pt-2">⚡ Bulk Processing Limit reached</h5>
          </div>
          <div className="modal-body text-center px-4">
            <p className="text-muted">
              You uploaded <strong>{fileCount} images</strong>. Our free toolkit processes up to <strong>5 images</strong> at a time entirely in your browser.
            </p>
            <div className="p-3 my-3 bg-light rounded-3" style={{ border: '1px dashed #ffc107' }}>
              <span className="fs-3">☕</span>
              <h6 className="fw-bold mt-2 mb-1">Support the Developer</h6>
              <p className="small text-muted mb-0">
                To keep this site 100% free and private with no annoying servers, please consider supporting my work!
              </p>
            </div>
          </div>
          <div className="modal-footer border-0 d-flex flex-column gap-2 pb-4 px-4">
            <a 
              href={SUPPORT_URL} 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-warning w-100 fw-bold py-2 shadow-sm"
              style={{ borderRadius: '8px' }}
            >
              ☕ Support the Developer
            </a>
            <button 
              type="button" 
              className="btn btn-link text-decoration-none text-secondary btn-sm" 
              onClick={onClose}
            >
              Just process the first 5 images for free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchLimitModal;
