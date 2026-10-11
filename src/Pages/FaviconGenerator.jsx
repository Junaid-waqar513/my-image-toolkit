import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import FaviconGenerator from "../Components/FaviconGenerator";
import SEO from "../seo/SEO";
import PrivacyBadge from "../Components/PrivacyBadge";
import ToolInfoSection from "../Components/ToolInfoSection";
import { toolContent } from "../data/toolContent";
import { toolSchema, breadcrumbSchema, faqSchema, combineSchemas } from "../seo/schema";

const SITE_URL = "https://project4-ashen-one.vercel.app";

const faqs = [
  {
    question: "Which exact icon sizes does this generate?",
    answer:
      "16×16 and 32×32 (classic browser tab favicons), 48×48 (Windows taskbar/desktop shortcuts), 180×180 (Apple touch icon, for iOS home screen), and 192×192 plus 512×512 (the two sizes required by the PWA web app manifest spec for Android and installable web apps). It also builds a favicon.ico containing the 16/32/48 sizes together.",
  },
  {
    question: "How is the favicon.ico file actually built?",
    answer:
      "Modern ICO files can embed standard PNG data directly (this has been supported since Windows Vista and every current browser), so the tool packs the 16×16, 32×32, and 48×48 PNGs into a single valid .ico container using the ICO binary format's directory structure. This avoids the quality loss that comes from older tools that re-encode icons as raw uncompressed BMP data.",
  },
  {
    question: "What image should I upload as the source?",
    answer:
      "A square image, ideally 512×512px or larger — a logo mark, app icon, or letter mark works best. If your source isn't square, the tool center-crops it to a square before resizing, so make sure the important part of your logo isn't near the edges. Sources smaller than 512×512 will be upscaled for the larger sizes and may look soft.",
  },
  {
    question: "What's in the site.webmanifest file, and do I need to edit it?",
    answer:
      "It's a JSON file that tells browsers your app's name, icons, and theme color so it can be \"installed\" as a standalone app on Android and desktop Chrome. It's pre-filled with the site name you enter and points at the 192px and 512px icons. You can edit it further (add a description, orientation lock, etc.) once downloaded — it's a plain text file.",
  },
  {
    question: "Does this upload my logo anywhere?",
    answer:
      "No. Every resize happens on an HTML canvas element inside your own browser, and the ICO file is assembled byte-by-byte in JavaScript, also locally. Nothing is sent to a server at any point.",
  },
];

function FaviconGeneratorPage() {
  return (
    <>
      <SEO
        title="Free Favicon & PWA Icon Generator — All Sizes at Once"
        description="Upload one image and get a complete favicon.ico, apple-touch-icon, and PWA icon set (16px to 512px) plus manifest and HTML snippet. Free, private, browser-based."
        keywords="favicon generator, pwa icon generator, apple touch icon generator, app icon sizes, favicon.ico generator, web manifest generator"
        canonical={`${SITE_URL}/favicon-generator`}
        schema={combineSchemas(
          toolSchema({
            name: "Favicon & PWA Icon Generator",
            description:
              "Generate a complete favicon.ico, apple-touch-icon, and PWA icon set from a single image, entirely in the browser.",
            url: `${SITE_URL}/favicon-generator`,
          }),
          breadcrumbSchema("Favicon Generator", `${SITE_URL}/favicon-generator`),
          faqSchema(faqs)
        )}
      />

      <Navbar />

      <header className="container text-center pt-5 pb-2">
        <h1 className="display-5 fw-bold text-dark mb-2">
          Favicon &amp; PWA Icon Generator
        </h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: 650 }}>
          Upload one image, get every favicon and PWA icon size your site
          needs — favicon.ico, apple-touch-icon, and manifest icons, all in
          one ZIP.
        </p>
        <PrivacyBadge text="Your logo is never uploaded to a server" />
      </header>

      <div className="container">
        <FaviconGenerator />
      </div>

      <ToolInfoSection content={toolContent.favicon} />

      <section className="container pb-5 mt-5">
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 className="h3 fw-bold text-center mb-4">
            Frequently Asked Questions
          </h2>

          <div className="accordion" id="faviconGeneratorFaq">
            {faqs.map((faq, index) => (
              <div className="accordion-item" key={index}>
                <h3 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#faviconFaqItem${index}`}
                    aria-expanded="false"
                    aria-controls={`faviconFaqItem${index}`}
                  >
                    {faq.question}
                  </button>
                </h3>
                <div
                  id={`faviconFaqItem${index}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#faviconGeneratorFaq"
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

export default FaviconGeneratorPage;
