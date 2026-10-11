import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ImageHealthChecker from "../Components/ImageHealthChecker";
import SEO from "../seo/SEO";
import PrivacyBadge from "../Components/PrivacyBadge";
import ToolInfoSection from "../Components/ToolInfoSection";
import { toolContent } from "../data/toolContent";
import { toolSchema, breadcrumbSchema, faqSchema, combineSchemas } from "../seo/schema";

const SITE_URL = "https://project4-ashen-one.vercel.app";

const healthCheckerFaqs = [
  {
    question: "What does the Image Health Checker actually check?",
    answer:
      "It analyzes file size, pixel dimensions, format, compression efficiency, and basic SEO readiness (like whether the filename and dimensions are search-friendly), then gives each image a health score with specific suggestions for improvement.",
  },
  {
    question: "Are my images uploaded to a server to be checked?",
    answer:
      "No. The entire analysis runs locally in your browser using the File and Canvas APIs. Your images are never uploaded anywhere.",
  },
  {
    question: "Why does image health matter for SEO?",
    answer:
      "Large, unoptimized images are one of the most common causes of slow page load times, and page speed is a factor in search rankings. Oversized dimensions and heavy file sizes also waste bandwidth for every visitor, especially on mobile.",
  },
  {
    question: "What should I do after checking my image's health?",
    answer:
      "If the checker flags a large file size, use our Compress Image tool. If dimensions are larger than needed for display, use Resize Image. Both run in the same browser-based, upload-free way as this checker.",
  },
];

function ImageHealthCheckerPage() {
  return (
    <>
      <SEO
        title="Free Image Health Checker — Check Image Quality, Size & SEO"
        description="Check image dimensions, file size, format, transparency, and SEO readiness with our free browser-based Image Health Checker. No image uploads required."
        keywords="image health checker, image checker, image SEO checker, image quality checker, image size checker, image dimensions checker, image optimization checker"
        canonical={`${SITE_URL}/image-health-checker`}
        schema={combineSchemas(
          toolSchema({
            name: "Image Health Checker",
            description:
              "Check image dimensions, file size, format, transparency, and SEO readiness for free, entirely in your browser.",
            url: `${SITE_URL}/image-health-checker`,
          }),
          breadcrumbSchema("Image Health Checker", `${SITE_URL}/image-health-checker`),
          faqSchema(healthCheckerFaqs)
        )}
      />

      <Navbar />

      <div className="container">
        <ImageHealthChecker />
      </div>

      <ToolInfoSection content={toolContent.health} />

      <section className="container pb-5 mt-5">
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 className="h3 fw-bold text-center mb-4">
            Frequently Asked Questions
          </h2>

          <div className="accordion" id="healthCheckerFaq">
            {healthCheckerFaqs.map((faq, index) => (
              <div className="accordion-item" key={index}>
                <h3 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#healthFaqItem${index}`}
                    aria-expanded="false"
                    aria-controls={`healthFaqItem${index}`}
                  >
                    {faq.question}
                  </button>
                </h3>
                <div
                  id={`healthFaqItem${index}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#healthCheckerFaq"
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

      <Footer />
    </>
  );
}

export default ImageHealthCheckerPage;