import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ExifRemover from "../Components/ExifRemover";
import SEO from "../seo/SEO";
import { toolSchema, breadcrumbSchema, faqSchema, combineSchemas } from "../seo/schema";

const SITE_URL = "https://project4-ashen-one.vercel.app";

const exifFaqs = [
  {
    question: "What is EXIF data and why should I remove it?",
    answer:
      "EXIF data is hidden metadata saved inside your photos by your camera or phone. It often contains highly sensitive information including your exact GPS coordinates, date and time, device model, and camera settings. Removing it protects your digital privacy before sharing images online.",
  },
  {
    question: "How do I strip metadata from an image?",
    answer:
      "Simply drag and drop your images into the upload area above. Our tool automatically processes the file, strips out all hidden metadata tracking blocks, and gives you a clean copy to download instantly.",
  },
  {
    question: "Does removing metadata reduce photo quality?",
    answer:
      "No. Stripping EXIF tags only deletes hidden text properties buried inside the file container. Your visual picture quality, pixels, and colors remain exactly the same.",
  },
  {
    question: "Are my private pictures uploaded to any server?",
    answer:
      "Absolutely not. To ensure 100% data safety, all processing is performed locally inside your web browser. Your private pictures never touch an external server.",
  },
];

function ExifRemoverPage() {
  return (
    <>
      <SEO
        title="Privacy-First EXIF Metadata Remover | Strip GPS Location Online"
        description="Remove EXIF data and hidden camera metadata including private GPS locations from JPG or PNG files safely online. 100% local browser-based cleanup."
        keywords="remove image metadata, strip exif data, photo metadata cleaner, delete gps location from photo, anonymous image uploader"
        canonical={`${SITE_URL}/exif-remover`}
        path="/exif-remover"
        schema={combineSchemas(
          toolSchema({
            name: "Privacy-First EXIF Metadata Remover",
            description:
              "Strip out EXIF and hidden metadata configurations, including private GPS tracking coordinates, from image files completely free.",
            url: `${SITE_URL}/exif-remover`,
          }),
          breadcrumbSchema("EXIF Metadata Remover", `${SITE_URL}/exif-remover`),
          faqSchema(exifFaqs)
        )}
      />

      <Navbar />

      {/* Visual Header Enhancement to reduce bounce rates and catch immediate intent */}
      <header className="container text-center pt-5 pb-2">
        <h1 className="display-5 fw-bold text-dark mb-2">🛡️ Privacy-First EXIF Metadata Remover</h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: "650px" }}>
          Strip hidden camera settings, device properties, and precise GPS tracking tags from your photos. 
          Processed entirely offline in your browser for absolute data protection.
        </p>
      </header>

      <ExifRemover />

      {/* FAQ Section to earn rich Google search results */}
      <section className="container pb-5 mt-5">
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 className="h3 fw-bold text-center mb-4">
            Frequently Asked Questions
          </h2>

          <div className="accordion" id="exifRemoverFaq">
            {exifFaqs.map((faq, index) => (
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
                  data-bs-parent="#exifRemoverFaq"
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

export default ExifRemoverPage;
