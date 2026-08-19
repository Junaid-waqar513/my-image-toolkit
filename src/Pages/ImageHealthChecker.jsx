import ImageHealthChecker from "../Components/ImageHealthChecker";
import SEO from "../seo/SEO";

function ImageHealthCheckerPage() {
  return (
    <>
      <SEO
        title="Free Image Health Checker — Check Image Quality, Size & SEO"
        description="Check image dimensions, file size, format, transparency, and SEO readiness with our free browser-based Image Health Checker. No image uploads required."
        keywords="image health checker, image checker, image SEO checker, image quality checker, image size checker, image dimensions checker, image optimization checker"
        path="/image-health-checker"
      />

      <ImageHealthChecker />
    </>
  );
}

export default ImageHealthCheckerPage;