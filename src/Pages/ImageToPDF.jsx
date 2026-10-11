import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ImageToPDF from "../Components/ImageToPDF";
import SEO from "../seo/SEO";
import PrivacyBadge from "../Components/PrivacyBadge";
import ToolInfoSection from "../Components/ToolInfoSection";
import { toolContent } from "../data/toolContent";
import AdDisplay from "../Components/AdDisplay"; // 1. Imported your clean ad component
import { toolSchema, breadcrumbSchema, faqSchema, combineSchemas } from "../seo/schema";

const SITE_URL = "https://project4-ashen-one.vercel.app";

const imageToPdfFaqs = [
  {
    question: "How do I convert an image to PDF?",
    answer:
      "Drop your image into the upload area, choose your page size and settings, then click Convert to PDF. Your PDF is generated instantly and can be downloaded right away.",
  },
  {
    question: "Can I convert multiple images into one PDF?",
    answer:
      "Yes. Upload as many images as you like, reorder them as needed, and they'll all be combined into a single PDF with one image per page.",
  },
  {
    question: "Can I convert JPG to PDF?",
    answer:
      "Yes, JPG and JPEG files are fully supported.",
  },
  {
    question: "Can I convert PNG to PDF?",
    answer:
      "Yes, PNG files are fully supported, including images with transparency.",
  },
  {
    question: "Are my images uploaded to a server?",
    answer:
      "No. The entire conversion happens directly in your browser. Your images and the resulting PDF are never uploaded anywhere.",
  },
  {
    question: "Can I choose A4 or Letter page size?",
    answer:
      "Yes. You can choose A4, Letter, or use each image's original size as the page size.",
  },
  {
    question: "Can I rearrange images before creating the PDF?",
    answer:
      "Yes. Use the up and down arrows next to each image to reorder them before converting — this determines the page order in the final PDF.",
  },
];

function ImageToPDFPage() {
  return (
    <>
      <SEO
        title="Free Instant Image to PDF Converter (No Uploads) | ImageToolkit"
        description="Convert JPG, PNG and other images to PDF online for free. Combine multiple images into one PDF safely directly inside your browser with zero server uploads."
        keywords="image to pdf, convert image to pdf, free image to pdf converter, batch image to pdf no upload, picture to pdf browser"
        canonical={`${SITE_URL}/image-to-pdf`}
        path="/image-to-pdf"
        schema={combineSchemas(
          toolSchema({
            name: "Free Instant Image to PDF Converter",
            description:
              "Convert JPG, PNG and other images to PDF online for free, combining multiple images into one document safely in your browser.",
            url: `${SITE_URL}/image-to-pdf`,
          }),
          breadcrumbSchema("Image to PDF", `${SITE_URL}/image-to-pdf`),
          faqSchema(imageToPdfFaqs)
        )}
      />

      <Navbar />
      
      {/* Visual Header Enhancement to reduce bounce rates and catch immediate intent */}
      <header className="container text-center pt-5 pb-2">
        <h1 className="display-5 fw-bold text-dark mb-2">⚡ Free Instant Image to PDF Converter</h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: "650px" }}>
          Combine multiple JPG, PNG, or WebP images into a single clean PDF document. 
          Processed 100% locally inside your browser for maximum privacy.
        </p>
        <PrivacyBadge />
      </header>

      <div className="container">
        {/* 2. PLACEMENT 1: High-visibility horizontal banner layout above the upload box */}
        <AdDisplay slot="TOP_IMAGE_TO_PDF_SLOT_ID" format="horizontal" />

        <ImageToPDF />

        {/* 3. PLACEMENT 2: Dynamic adaptive display banner beneath the workspace module */}
        <AdDisplay slot="BOTTOM_IMAGE_TO_PDF_SLOT_ID" format="auto" />
      </div>

      {/* FAQ Section */}
      <ToolInfoSection content={toolContent.pdf} />

      <section className="container pb-5 mt-4">
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 className="h3 fw-bold text-center mb-4">
            Frequently Asked Questions
          </h2>

          <div className="accordion" id="imageToPdfFaq">
            {imageToPdfFaqs.map((faq, index) => (
              <div className="accordion-item" key={index}>
                <h3 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#faqItem${index}`}
                    aria-expanded="false"
                    aria-controls={`faqItem${index}`}
                  >
                    {faq.question}
                  </button>
                </h3>
                <div
                  id={`faqItem${index}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#imageToPdfFaq"
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

export default ImageToPDFPage;
