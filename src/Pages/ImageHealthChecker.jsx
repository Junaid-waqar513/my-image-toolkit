import ImageHealthChecker from "../Components/ImageHealthChecker";
import SEO from "../seo/SEO";

const SITE_URL = "https://project4-ashen-one.vercel.app";

function ImageHealthCheckerPage() {
  return (
    <>
      <SEO
        title="Image Health Checker — Check Image Quality, Size & SEO"
        description="Check image dimensions, file size, format, transparency and SEO readiness with the free Image Health Checker from ImageToolkit."
        keywords="image health checker, image checker, image SEO checker, check image size, image quality checker, image dimensions checker"
        canonical={`${SITE_URL}/image-health-checker`}
      />

      <ImageHealthChecker />
    </>
  );
}

export default ImageHealthCheckerPage;