import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import SeoKeywordChecker from "../Components/SeoKeywordChecker";
import SEO from "../seo/SEO";
import { toolSchema, breadcrumbSchema, combineSchemas } from "../seo/schema";

const SITE_URL = "https://project4-ashen-one.vercel.app";

function SeoKeywordCheckerPage() {
  return (
    <>
      <SEO
        title="Free SEO & Keyword Checker — Analyze Title, Meta & Content"
        description="Check your title, meta description and content for SEO best practices, keyword density and readability, free and entirely in your browser."
        keywords="seo checker, keyword density checker, meta description checker, readability checker, free seo tool"
        canonical={`${SITE_URL}/seo-keyword-checker`}
        schema={combineSchemas(
          toolSchema({
            name: "SEO & Keyword Checker",
            description:
              "Check title, meta description and content for SEO best practices, keyword density and readability.",
            url: `${SITE_URL}/seo-keyword-checker`,
          }),
          breadcrumbSchema(
            "SEO & Keyword Checker",
            `${SITE_URL}/seo-keyword-checker`
          )
        )}
      />

      <Navbar />
      <SeoKeywordChecker />
      <Footer />
    </>
  );
}

export default SeoKeywordCheckerPage;