import React from 'react';

// Small trust badge shown under each tool's title.
// `text` can be overridden for tools that handle text instead of files.
const PrivacyBadge = ({
  text = 'Your files never touch a server',
  align = 'center',
}) => {
  return (
    <div
      className={`d-flex ${align === 'start' ? 'justify-content-start' : 'justify-content-center'} my-3`}
    >
      <div
        className="d-inline-flex align-items-center px-3 py-2"
        style={{
          fontSize: '0.9rem',
          borderRadius: '999px',
          backgroundColor: '#e8f5e9',
          color: '#1b5e20',
          border: '1px solid #c8e6c9',
        }}
        role="note"
      >
        <span className="me-2" aria-hidden="true">🔒</span>
        <span>
          <strong>100% Privacy-Friendly:</strong> {text}
        </span>
      </div>
    </div>
  );
};

export default PrivacyBadge;
