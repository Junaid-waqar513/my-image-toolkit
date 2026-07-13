import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import SEO from "../seo/SEO";

function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | ImageToolkit"
        description="Read ImageToolkit's privacy policy. Learn how we handle your data — including why your images never leave your browser."
        keywords="imagetoolkit privacy policy, image tool privacy"
        canonical="https://project4-ashen-one.vercel.app/privacy-policy"
      />

      <Navbar />

      <main className="container py-5" style={{ minHeight: "60vh", maxWidth: "850px" }}>

        <h1 className="fw-bold mb-4">Privacy Policy</h1>

        <p className="text-muted">Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="h4 fw-bold mt-4">1. Your Images Never Leave Your Device</h2>
        <p>
          ImageToolkit processes all images entirely within your web browser
          using client-side JavaScript. Your files are never uploaded to our
          servers, stored, or transmitted anywhere. Once you close or refresh
          the page, all image data is discarded.
        </p>

        <h2 className="h4 fw-bold mt-4">2. Information We Collect</h2>
        <p>
          We do not collect or store the images you process. We may use
          third-party analytics tools (such as Google Analytics) to
          understand general site usage, such as which pages are visited
          and approximate location/device type. This data is anonymized
          and is not linked to any images you process.
        </p>

        <h2 className="h4 fw-bold mt-4">3. Cookies</h2>
        <p>
          We may use cookies for basic site functionality and analytics.
          You can disable cookies in your browser settings at any time.
        </p>

        <h2 className="h4 fw-bold mt-4">4. Third-Party Advertising</h2>
        <p>
          This site may display advertisements served by third-party
          networks, such as Google AdSense. These networks may use cookies
          to serve ads based on your prior visits to this or other
          websites. You can opt out of personalized advertising by
          visiting Google's Ads Settings.
        </p>

        <h2 className="h4 fw-bold mt-4">5. Contact</h2>
        <p>
          If you have questions about this Privacy Policy, contact us at{" "}
          <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>.
        </p>

      </main>

      <Footer />
    </>
  );
}

export default PrivacyPolicy;
