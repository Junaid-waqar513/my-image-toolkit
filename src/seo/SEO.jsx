import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "Free Online Image Toolkit | Compress, Resize & Convert Images",

  description =
    "Free privacy-first browser-based image tools. Compress, resize, crop, and convert images instantly. 100% secure with zero server uploads.",

  keywords =
    "image compressor, batch resize images, webp to jpg, image to pdf, remove exif metadata, free online image tools",

  // Preferred: an absolute canonical URL, e.g. "https://project4-ashen-one.vercel.app/compress-image"
  canonical,

  // Legacy/fallback: a relative path, e.g. "/compress-image", used only if `canonical` isn't given
  path = "",

  // Optional custom image for social sharing
  ogImage = "/og-image.png",

  // Optional page type
  type = "website",

  // Optional structured data: a single schema object, or an array of schema objects
  // (e.g. the return value of combineSchemas() in seo/schema.js)
  schema,
}) => {
  const siteUrl = "https://project4-ashen-one.vercel.app";

  // Make sure the path always starts with /
  const normalizedPath =
    path && !path.startsWith("/") ? `/${path}` : path;

  // Remove trailing slash except for homepage
  const pathBasedUrl =
    normalizedPath === ""
      ? siteUrl
      : `${siteUrl}${normalizedPath.replace(/\/$/, "")}`;

  // An explicit `canonical` prop always wins over the derived path-based URL.
  const fullUrl = canonical || pathBasedUrl;

  // Normalize schema into a flat array so callers can pass either a single
  // object or an array (combineSchemas already returns an array).
  const schemaList = Array.isArray(schema) ? schema : schema ? [schema] : [];

  const fullOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${siteUrl}${ogImage}`;

  return (
    <Helmet>
      {/* =====================================================
          PRIMARY SEO META TAGS
      ===================================================== */}

      <title>{title}</title>

      <meta
        name="title"
        content={title}
      />

      <meta
        name="description"
        content={description}
      />

      <meta
        name="keywords"
        content={keywords}
      />

      <meta
        name="author"
        content="ImageToolkit"
      />

      <meta
        name="robots"
        content="index, follow"
      />

      {/* =====================================================
          CANONICAL URL
          Prevents duplicate URL versions of the same page.
      ===================================================== */}

      <link
        rel="canonical"
        href={fullUrl}
      />

      {/* =====================================================
          OPEN GRAPH / FACEBOOK
      ===================================================== */}

      <meta
        property="og:type"
        content={type}
      />

      <meta
        property="og:site_name"
        content="ImageToolkit"
      />

      <meta
        property="og:url"
        content={fullUrl}
      />

      <meta
        property="og:title"
        content={title}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:image"
        content={fullOgImage}
      />

      <meta
        property="og:image:width"
        content="1200"
      />

      <meta
        property="og:image:height"
        content="630"
      />

      <meta
        property="og:locale"
        content="en_US"
      />

      {/* =====================================================
          TWITTER / X
      ===================================================== */}

      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:url"
        content={fullUrl}
      />

      <meta
        name="twitter:title"
        content={title}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta
        name="twitter:image"
        content={fullOgImage}
      />

      {/* =====================================================
          MOBILE / THEME
      ===================================================== */}

      <meta
        name="theme-color"
        content="#0f172a"
      />

      {/* =====================================================
          STRUCTURED DATA (JSON-LD)
          Renders any schema.org objects passed via the `schema` prop
          (see src/seo/schema.js for the generator functions).
      ===================================================== */}

      {schemaList.map((schemaObj, i) => (
        <script
          key={i}
          type="application/ld+json"
        >
          {JSON.stringify(schemaObj)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;