import { Helmet } from "react-helmet-async";

const SITE_NAME = "ImageToolkit";
const DEFAULT_OG_IMAGE = "https://project4-ashen-one.vercel.app/og-image.png";

function SEO({
  title = "Image Toolkit - Free Online Image Tools",
  description = "Compress, resize, convert, crop, rotate, flip and watermark images online for free.",
  keywords = "image toolkit,image compressor,image resizer,image converter,online image tools",
  canonical = window.location.href,
  ogImage = DEFAULT_OG_IMAGE,
  schema = null,
}) {
  return (
    <Helmet>
      <title>{title}</title>

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
        content="Junaid Waqar"
      />

      <meta
        name="robots"
        content="index, follow"
      />

      <link
        rel="canonical"
        href={canonical}
      />

      {/* Open Graph */}

      <meta property="og:type" content="website" />

      <meta property="og:site_name" content={SITE_NAME} />

      <meta property="og:title" content={title} />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:url"
        content={canonical}
      />

      <meta
        property="og:image"
        content={ogImage}
      />

      <meta property="og:image:width" content="1200" />

      <meta property="og:image:height" content="630" />

      <meta property="og:locale" content="en_US" />

      {/* Twitter */}

      <meta
        name="twitter:card"
        content="summary_large_image"
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
        content={ogImage}
      />

      {/* Structured Data (JSON-LD) */}

      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}

export default SEO;