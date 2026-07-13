import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import FeaturedTools from "../Components/FeaturedTools";
import ToolsGrid from "../Components/ToolsGrid";
import WhyChooseUs from "../Components/WhyChooseUs";
import StatsSection from "../Components/StatsSection";
import Testimonials from "../Components/Testimonials";
import FAQ from "../Components/FAQ";
import CTASection from "../Components/CTASection";
import Newsletter from "../Components/Newsletter";
import Footer from "../Components/Footer";
import SEO from "../seo/SEO";
import {
  websiteSchema,
  organizationSchema,
  faqSchema,
  combineSchemas,
} from "../seo/schema";

function Home() {
  return (
    <>
      <SEO
        title="ImageToolkit — Free Online Image Compressor, Resizer & Converter"
        description="Compress, resize, convert, crop, rotate, flip and watermark images online for free. 100% browser-based — your images never leave your device."
        keywords="image toolkit, compress image online, resize image online, convert image format, free image editor"
        canonical="https://project4-ashen-one.vercel.app/"
        schema={combineSchemas(
          websiteSchema(),
          organizationSchema(),
          faqSchema()
        )}
      />

      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Featured Tools */}
      <FeaturedTools />

      {/* All Available Tools */}
      <ToolsGrid />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Statistics */}
      <StatsSection />

      {/* Testimonials */}
      <Testimonials />

      {/* Frequently Asked Questions */}
      <FAQ />

      {/* Call To Action */}
      <CTASection />

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;