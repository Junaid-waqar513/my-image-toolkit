import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import SEO from "../seo/SEO";

function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service | ImageToolkit"
        description="Read the terms of service for using ImageToolkit's free online image compression, resizing, conversion and editing tools."
        keywords="imagetoolkit terms of service, image tool terms"
        canonical="https://project4-ashen-one.vercel.app/terms"
      />

      <Navbar />

      <main className="container py-5" style={{ minHeight: "60vh", maxWidth: "850px" }}>

        <h1 className="fw-bold mb-4">Terms of Service</h1>

        <p className="text-muted">Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="h4 fw-bold mt-4">1. Acceptance of Terms</h2>
        <p>
          By using ImageToolkit, you agree to these Terms of Service. If you
          do not agree, please do not use this website.
        </p>

        <h2 className="h4 fw-bold mt-4">2. Use of the Service</h2>
        <p>
          ImageToolkit provides free, browser-based tools for compressing,
          resizing, converting, cropping, rotating, flipping, and
          watermarking images. The service is provided "as is" without
          warranties of any kind, express or implied.
        </p>

        <h2 className="h4 fw-bold mt-4">3. Your Content</h2>
        <p>
          You retain full ownership of any images you process using
          ImageToolkit. Since all processing happens locally in your
          browser, we never receive, store, or have access to your files.
        </p>

        <h2 className="h4 fw-bold mt-4">4. Acceptable Use</h2>
        <p>
          You agree not to use ImageToolkit to process or create unlawful,
          infringing, or harmful content.
        </p>

        <h2 className="h4 fw-bold mt-4">5. Limitation of Liability</h2>
        <p>
          ImageToolkit is not liable for any loss of data, damages, or
          issues arising from the use of this service. Always keep a
          backup of your original files before editing.
        </p>

        <h2 className="h4 fw-bold mt-4">6. Changes to These Terms</h2>
        <p>
          We may update these Terms of Service from time to time. Continued
          use of the site after changes constitutes acceptance of the new
          terms.
        </p>

        <h2 className="h4 fw-bold mt-4">7. Contact</h2>
        <p>
          Questions about these terms? Reach out at{" "}
          <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>.
        </p>

      </main>

      <Footer />
    </>
  );
}

export default Terms;
