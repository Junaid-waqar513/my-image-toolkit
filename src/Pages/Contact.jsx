import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import SEO from "../seo/SEO";

function Contact() {
  return (
    <>
      <SEO
        title="Contact ImageToolkit — Support & Feedback"
        description="Have a question, found a bug, or want to suggest a feature? Get in touch with the ImageToolkit team."
        keywords="contact imagetoolkit, image toolkit support"
        canonical="https://project4-ashen-one.vercel.app/contact"
      />

      <Navbar />

      <main className="container py-5" style={{ minHeight: "60vh" }}>

        <h1 className="fw-bold mb-4">
          Contact Us
        </h1>

        <p className="lead" style={{ maxWidth: "650px" }}>
          Need help, found a bug, or have a suggestion for a new tool?
          We'd love to hear from you.
        </p>

        <p className="mt-4">
          📧 Email us at{" "}
          <a href="mailto:support@yourdomain.com">
            support@yourdomain.com
          </a>
        </p>

      </main>

      <Footer />
    </>
  );
}

export default Contact;