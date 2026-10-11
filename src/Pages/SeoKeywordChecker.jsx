import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import SeoKeywordChecker from "../Components/SeoKeywordChecker";
import SEO from "../seo/SEO";
import PrivacyBadge from "../Components/PrivacyBadge";
import ToolInfoSection from "../Components/ToolInfoSection";
import { toolContent } from "../data/toolContent";
import AdDisplay from "../Components/AdDisplay"; // 1. Imported your clean ad component
import { toolSchema, breadcrumbSchema, faqSchema, combineSchemas } from "../seo/schema";

// Corrected from generic fallback to your live domain layout path configuration
const SITE_URL = "https://project4-ashen-one.vercel.app";

const seoCheckerFaqs = [
  {
    question: "What does the SEO & Keyword Checker analyze?",
    answer:
      "This tool performs a complete on-page audit of your content. It analyzes your SEO title length, meta description quality, structural headings, overall readability scores, and core keyword density balances to ensure your articles are optimized for Google ranking.",
  },
  {
    question: "Why is keyword density important for SEO?",
    answer:
      "Keyword density measures how frequently your target keywords appear relative to your total word count. Keeping this ratio between 1% and 2.5% helps search engines understand your topic clearly while avoiding keyword stuffing penalties.",
  },
  {
    question: "Is my blog content or draft secure with this tool?",
    answer:
      "Yes, completely. Like all features on ImageToolkit, the entire analysis happens client-side inside your web browser. Your text, drafts, and keywords are never sent to a server or stored anywhere.",
  },
  {
    question: "Does this check readability scores?",
    answer:
      "Yes. The tool analyzes your sentence lengths, vocabulary structures, and paragraph flows to calculate an instant readability breakdown. This ensures your content is accessible and engaging for everyday web visitors.",
  },
];

function SeoKeywordCheckerPage() {
  return (
    <>
      <SEO
        title="On-Page SEO Auditor & Content Keyword Density Analyzer"
        description="Analyze your text content for SEO best practices completely free. Check title tags, meta descriptions, readability scores, and keyword counts instantly in your browser."
        keywords="seo content auditor, keyword density checker, meta tag analyzer, readability grader online, blog post optimization tool"
        canonical={`${SITE_URL}/seo-keyword-checker`}
        path="/seo-keyword-checker"
        schema={combineSchemas(
          toolSchema({
            name: "On-Page SEO & Keyword Checker",
            description:
              "Analyze web text metadata, content headers, readability grades, and keyword distributions instantly inside your web browser.",
            url: `${SITE_URL}/seo-keyword-checker`,
          }),
          breadcrumbSchema("SEO & Keyword Checker", `${SITE_URL}/seo-keyword-checker`),
          faqSchema(seoCheckerFaqs)
        )}
      />

      <Navbar />

      {/* Visual Header Enhancement to reduce bounce rates and catch immediate intent */}
      <header className="container text-center pt-5 pb-2">
        <h1 className="display-5 fw-bold text-dark mb-2">📈 Free On-Page SEO & Keyword Checker</h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: "650px" }}>
          Audit your website titles, meta tags, and copy layouts before publishing. 
          Grade text readability and measure exact keyword densities 100% locally in your browser.
        </p>
        <PrivacyBadge text="Your text and drafts never leave your browser" />
      </header>

      <div className="container">
        {/* 2. PLACEMENT 1: High-visibility horizontal banner layout above the text box input zone */}
        <AdDisplay slot="TOP_SEO_CHECKER_SLOT_ID" format="horizontal" />

        <SeoKeywordChecker />

        {/* 3. PLACEMENT 2: Dynamic adaptive display banner beneath the workspace analysis dashboard */}
        <AdDisplay slot="BOTTOM_SEO_CHECKER_SLOT_ID" format="auto" />
      </div>

      {/* FAQ Section to earn rich Google search results */}
      <ToolInfoSection content={toolContent.seo} />

      <section className="container pb-5 mt-5">
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 className="h3 fw-bold text-center mb-4">
            Frequently Asked Questions
          </h2>

          <div className="accordion" id="seoCheckerFaq">
            {seoCheckerFaqs.map((faq, index) => (
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
                  data-bs-parent="#seoCheckerFaq"
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

export default SeoKeywordCheckerPage;
