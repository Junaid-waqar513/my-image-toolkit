import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import SEO from "../seo/SEO";

function About() {
  return (
    <>
      <SEO
        title="About ImageToolkit — Free, Private, Browser-Based Image Tools"
        description="Learn how ImageToolkit compresses, resizes, converts and edits images entirely in your browser — no uploads, no signup, 100% free."
        keywords="about imagetoolkit, free image editor, browser-based image tools"
        canonical="https://project4-ashen-one.vercel.app/about"
      />

      <Navbar />

      <main className="container py-5" style={{ minHeight: "60vh" }}>

        <h1 className="fw-bold mb-4">
          About ImageToolkit
        </h1>

        <p className="lead">
          ImageToolkit is a free online platform for
          compressing, resizing, converting, cropping,
          rotating, flipping, watermarking and editing images
          directly in your browser.
        </p>

        <p className="text-muted" style={{ maxWidth: "750px" }}>
          Every tool runs entirely on your device using your browser's
          built-in processing power. That means your images are never
          uploaded to a server, giving you complete privacy, faster
          results, and zero risk of your files being stored or leaked.
          Whether you're preparing photos for social media, shrinking
          files for a website, or converting formats for a project,
          ImageToolkit gives you fast, free, professional-grade results
          without the wait or the cost.
        </p>

      </main>

      <Footer />
    </>
  );
}

export default About;