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
      "The tool re-encodes your image and tests the resulting file size, lowering the JPEG/WEBP quality setting in small steps until the output is at or under 100KB, using up to 15 attempts per image, rather than making you guess a quality percentage and check the result yourself.",
  },
  {
    question: "Is 100KB enough to keep a photo looking good?",
    answer:
      "For most photos under about 2000×2000px, yes — 100KB is usually enough headroom to stay visually close to the original. Very high-resolution images (4000px+ on the long edge) will show more visible compression at 100KB, since there's simply more detail competing for the same byte budget.",
  },
  {
    question: "What's the difference between this and the regular Compress Image tool?",
    answer:
      "The regular Compress Image tool uses a quality percentage (like 80%) and the resulting file size varies depending on the image. This tool works backwards from a fixed target — you tell it 100KB, and it finds whatever quality setting gets closest to that number.",
  },
  {
    question: "Why 100KB specifically?",
    answer:
      "100KB is a common cap for profile photos, forum avatars, and many web forms that don't specify an exact reason beyond keeping upload sizes reasonable. It's also a practical sweet spot — small enough to load fast, large enough to still look sharp for most use cases.",
  },
  {
    question: "Can I compress multiple images to 100KB at once?",
    answer:
      "Yes. Drop in as many images as you need, and each one is compressed independently toward the 100KB target. When they're all done, download them individually or as a single ZIP file.",
  },
];

function CompressTo100KBPage() {
  return (
    <>
      <SEO
        title="Compress Image to 100KB Online — Free & Exact"
        description="Compress any JPG or PNG to exactly 100KB or under, automatically. No quality slider guesswork — built for profile photos, avatars, and upload limits."
        keywords="compress image to 100kb, reduce photo to 100kb, image size 100kb, compress jpg to 100kb, compress photo for upload limit"
        canonical={`${SITE_URL}/compress-image-to-100kb`}
        schema={combineSchemas(
          toolSchema({
            name: "Compress Image to 100KB",
            description:
              "Compress any image to exactly 100KB or under automatically, entirely in your browser.",
            url: `${SITE_URL}/compress-image-to-100kb`,
          }),
          breadcrumbSchema("Compress to 100KB", `${SITE_URL}/compress-image-to-100kb`),
          faqSchema(faqs)
        )}
      />

      <Navbar />

      <header className="container text-center pt-5 pb-2">
        <h1 className="display-5 fw-bold text-dark mb-2">
          Compress Image to 100KB
        </h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: 650 }}>
          For profile photos, avatars, and forms with a 100KB upload limit.
          No quality slider — just an exact target size.
        </p>
        <PrivacyBadge />
      </header>

      <div className="container">
        <TargetSizeCompressor targetKB={100} />
      </div>

      <ToolInfoSection content={toolContent.c100} />

      <section className="container pb-5 mt-5">
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 className="h3 fw-bold text-center mb-4">
            Frequently Asked Questions
          </h2>

          <div className="accordion" id="compress100kbFaq">
            {faqs.map((faq, index) => (
              <div className="accordion-item" key={index}>
                <h3 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#compress100FaqItem${index}`}
                    aria-expanded="false"
                    aria-controls={`compress100FaqItem${index}`}
                  >
                    {faq.question}
                  </button>
                </h3>
                <div
                  id={`compress100FaqItem${index}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#compress100kbFaq"
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
              href="/compress-image-to-50kb"
            >
              <span style={{ fontSize: "1.75rem" }}>🗜️</span>
              <span className="fw-semibold">Compress to 50KB</span>
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

export default CompressTo100KBPage;
