import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ImageToPDF from "../Components/ImageToPDF";
import SEO from "../seo/SEO";
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
        title="Image to PDF Converter — Convert JPG, PNG to PDF Free"
        description="Convert JPG, PNG and other images to PDF online for free. Combine multiple images into one PDF directly in your browser."
        keywords="image to pdf, jpg to pdf, png to pdf, convert image to pdf, image to pdf converter, jpg pdf converter"
        canonical={`${SITE_URL}/image-to-pdf`}
        schema={combineSchemas(
          toolSchema({
            name: "Image to PDF Converter",
            description:
              "Convert JPG, PNG and other images to PDF online for free, combining multiple images into one document.",
            url: `${SITE_URL}/image-to-pdf`,
          }),
          breadcrumbSchema("Image to PDF", `${SITE_URL}/image-to-pdf`),
          faqSchema(imageToPdfFaqs)
        )}
      />

      <Navbar />
      <ImageToPDF />

      {/* FAQ */}
      <section className="container pb-5">
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