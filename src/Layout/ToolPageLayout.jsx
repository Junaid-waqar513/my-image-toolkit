import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Breadcrumb from "../Components/Breadcrumb";
import HowItWorks from "../Components/HowItWorks";
import WhyChooseUs from "../Components/WhyChooseUs";
import FAQ from "../Components/FAQ";
import FeaturedTools from "../Components/FeaturedTools";
import RelatedTools from "../Components/RelatedTools";
import PrivacyBadge from "../Components/PrivacyBadge";
import ToolInfoSection from "../Components/ToolInfoSection";
function ToolPageLayout({
  title,
  description,
  children,
  faqs,
  info,
}) {
  return (
    <>
      <Navbar />

      <main>

        {/* Hero */}

        <section className="bg-light py-5 border-bottom">

          <div className="container">

            <Breadcrumb title={title} />

            <h1 className="display-4 fw-bold mt-3">
              {title}
            </h1>

            <p
              className="lead text-muted"
              style={{
                maxWidth: "750px",
              }}
            >
              {description}
            </p>

            <PrivacyBadge align="start" />

          </div>

        </section>

        {/* Tool */}

        <section className="py-5">

          <div className="container">

            {children}

          </div>

        </section>

        <ToolInfoSection content={info} />

        <RelatedTools />

        <HowItWorks />
        <WhyChooseUs />

        <FeaturedTools />

        <FAQ faqs={faqs} />

      </main>

      <Footer />

    </>
  );
}

export default ToolPageLayout;