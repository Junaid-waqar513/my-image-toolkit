import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import TargetSizeCompressor from "../Components/TargetSizeCompressor";
import SEO from "../seo/SEO";
import PrivacyBadge from "../Components/PrivacyBadge";
import ToolInfoSection from "../Components/ToolInfoSection";
import { toolContent } from "../data/toolContent";
import { toolSchema, breadcrumbSchema, faqSchema, combineSchemas } from "../seo/schema";

const SITE_URL = "https://project4-ashen-one.vercel.app";

const faqs = [
  {
    question: "How does compressing to an exact size actually work?",
    answer:
      "The tool re-encodes your image and tests the resulting file size, lowering the JPEG/WEBP quality setting in small steps until the output is at or under 50KB, using up to 15 attempts per image. This is different from a manual quality slider, where you'd have to guess and check the size yourself.",
  },
  {
    question: "Will a photo compressed to 50KB still look acceptable?",
    answer:
      "It depends on the original resolution and detail level. A simple graphic or a small photo (under roughly 1000×1000px) can often hit 50KB with barely visible quality loss. A high-resolution DSLR photo forced down to 50KB will show visible compression artifacts — there's a hard physical tradeoff between pixel count and file size at any given quality level.",
  },
  {
    question: "What if my image can't be compressed all the way to 50KB?",
    answer:
      "Some images — especially large, highly detailed originals — hit a practical quality floor before reaching 50KB, since going lower would produce a barely-recognizable image. In that case the tool stops at the smallest reasonable size it can produce and flags it clearly, rather than silently destroying the image to hit an arbitrary number.",
  },
  {
    question: "Does this work for PNG files?",
    answer:
      "Yes, but PNG is a lossless format, so hitting a very small target size like 50KB sometimes isn't possible without noticeable quality loss on detailed images, unlike JPEG which has a much wider usable compression range. If your PNG needs transparency, expect a higher minimum achievable size than an equivalent JPEG.",
  },
  {
    question: "Why would I need a photo under exactly 50KB?",
    answer:
      "This is the most common exact limit for government ID uploads, exam admit card photos, passport-style application forms, and some older web forms that specify a strict maximum in kilobytes rather than megabytes.",
  },
];

function CompressTo50KBPage() {
  return (
    <>
      <SEO
        title="Compress Image to 50KB Online — Free & Exact"
        description="Compress any JPG or PNG to exactly 50KB or under, automatically. No quality slider guesswork — built for ID photos, forms, and strict upload limits."
        keywords="compress image to 50kb, reduce photo to 50kb, image size 50kb, compress jpg to 50kb, compress photo for form upload"
        canonical={`${SITE_URL}/compress-image-to-50kb`}
        schema={combineSchemas(
          toolSchema({
            name: "Compress Image to 50KB",
            description:
              "Compress any image to exactly 50KB or under automatically, entirely in your browser.",
            url: `${SITE_URL}/compress-image-to-50kb`,
          }),
          breadcrumbSchema("Compress to 50KB", `${SITE_URL}/compress-image-to-50kb`),
          faqSchema(faqs)
        )}
      />

      <Navbar />

      <header className="container text-center pt-5 pb-2">
        <h1 className="display-5 fw-bold text-dark mb-2">
          Compress Image to 50KB
        </h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: 650 }}>
          For ID photos, exam forms, and application uploads with a strict
          50KB limit. No quality slider — just an exact target size.
        </p>
        <PrivacyBadge />
      </header>

      <div className="container">
        <TargetSizeCompressor targetKB={50} />
      </div>

      <ToolInfoSection content={toolContent.c50} />

      <section className="container pb-5 mt-5">
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 className="h3 fw-bold text-center mb-4">
            Frequently Asked Questions
          </h2>

          <div className="accordion" id="compress50kbFaq">
            {faqs.map((faq, index) => (
              <div className="accordion-item" key={index}>
                <h3 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#compress50FaqItem${index}`}
                    aria-expanded="false"
                    aria-controls={`compress50FaqItem${index}`}
                  >
                    {faq.question}
                  </button>
                </h3>
                <div
                  id={`compress50FaqItem${index}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#compress50kbFaq"
                >
                  <div className="accordion-body text-muted">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container my-5">
        <h2 className="h4 fw-bold mb-4">Related Tools</h2>
        <div className="row g-3">
          <div className="col-md-4">
            <a
              className="d-flex align-items-center gap-3 p-3 border rounded-4 text-decoration-none text-dark h-100"
              href="/compress-image-to-100kb"
            >
              <span style={{ fontSize: "1.75rem" }}>🗜️</span>
              <span className="fw-semibold">Compress to 100KB</span>
            </a>
          </div>
          <div className="col-md-4">
            <a
              className="d-flex align-items-center gap-3 p-3 border rounded-4 text-decoration-none text-dark h-100"
              href="/compress-image"
            >
              <span style={{ fontSize: "1.75rem" }}>🎚️</span>
              <span className="fw-semibold">Compress by Quality</span>
            </a>
          </div>
          <div className="col-md-4">
            <a
              className="d-flex align-items-center gap-3 p-3 border rounded-4 text-decoration-none text-dark h-100"
              href="/resize-image"
            >
              <span style={{ fontSize: "1.75rem" }}>📏</span>
              <span className="fw-semibold">Resize Image</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default CompressTo50KBPage;
