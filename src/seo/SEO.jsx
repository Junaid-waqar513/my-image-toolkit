import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Free Online Image Toolkit | Compress, Resize & Convert Images", 
  description = "Free privacy-first browser-based image tools. Compress, resize, crop, and convert images instantly. 100% secure with zero server uploads.", 
  keywords = "image compressor, batch resize images, webp to jpg, image to pdf, remove exif metadata, free online image tools",
  path = ""
}) => {
  const siteUrl = "https://project4-ashen-one.vercel.app";
  const fullUrl = `${siteUrl}${path}`;

  return (
    <Helmet>
      {/* Primary SEO Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}/og-image.png`} />

      {/* Twitter Sharing */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}/og-image.png`} />
    </Helmet>
  );
};

export default SEO;
