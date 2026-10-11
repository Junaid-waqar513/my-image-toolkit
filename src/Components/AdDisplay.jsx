import React, { useEffect } from 'react';

const AdDisplay = ({ slot, format = 'auto', responsive = 'true' }) => {
  useEffect(() => {
    // This safely triggers Google to load the ad once the component mounts
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log('AdSense script not loaded yet or blocked by user:', error);
    }
  }, []);

  return (
    <div className="my-4 text-center d-flex justify-content-center align-items-center w-100 overflow-hidden" style={{ minHeight: '90px' }}>
      {/* Inserts standard responsive Google AdSense element block */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2690067690290428"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      ></ins>
    </div>
  );
};

export default AdDisplay;
