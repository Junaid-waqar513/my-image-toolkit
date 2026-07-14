const SITE_URL = "https://project4-ashen-one.vercel.app";
const SITE_NAME = "ImageToolkit";

// Shared FAQ data — also used by the FAQ.jsx component so the visible
// accordion and the FAQPage schema never drift out of sync.
export const homeFaqs = [
  {
    question: "Is ImageToolkit free to use?",
    answer:
      "Yes. All tools are completely free with no registration required.",
  },
  {
    question: "Are my images uploaded to a server?",
    answer:
      "No. Your images stay on your device because processing happens directly in your browser.",
  },
  {
    question: "Which image formats are supported?",
    answer: "JPG, JPEG, PNG, WEBP, GIF and BMP are supported.",
  },
  {
    question: "Can I process multiple images?",
    answer:
      "Yes. Batch processing lets you compress, resize, convert and watermark multiple images at once.",
  },
  {
    question: "Will image quality decrease?",
    answer:
      "Compression is optimized to reduce file size while maintaining excellent visual quality.",
  },
];

// WebSite schema — helps Google understand the site as a whole,
// enables sitelinks search box eligibility.
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

// Organization schema — brand identity for knowledge panel eligibility.
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.png`,
  };
}

// SoftwareApplication schema — for individual tool pages
// (Compress, Resize, Convert, Crop, Rotate, Flip, Watermark, Batch).
export function toolSchema({ name, description, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any (Web Browser)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

// FAQPage schema — enables expandable FAQ rich results in search.
export function faqSchema(faqs = homeFaqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// BreadcrumbList schema — reinforces site structure/internal linking
// for tool pages nested under the homepage.
export function breadcrumbSchema(pageName, pageUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageName,
        item: pageUrl,
      },
    ],
  };
}

// BlogPosting schema — for individual blog articles, helps Google
// understand publish dates and can enable article rich results.
export function blogPostSchema({ title, description, url, datePublished, image }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    datePublished,
    image: image || `${SITE_URL}/og-image.png`,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.png`,
      },
    },
  };
}

// Combines multiple schema objects into a single JSON-LD graph,
// which is what the SEO component expects as a single `schema` prop.
export function combineSchemas(...schemas) {
  return schemas.filter(Boolean);
}