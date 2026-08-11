import ImageHealthChecker from "../Components/ImageHealthChecker";
import SEO from "../seo/SEO";

function ImageHealthCheckerPage() {
  return (
    <>
      <SEO
        title="Image Health Checker – Check Image SEO, Size & Performance"
        description="Check image size, dimensions, format, SEO and web performance instantly. Optimize your images for faster websites with our free Image Health Checker."
        keywords="image health checker,image optimization checker,image SEO checker,image performance checker,check image size,image optimizer,image optimization"
        canonical="https://project4-ashen-one.vercel.app/image-health-checker"
      />

      <ImageHealthChecker />
    </>
  );
}

export default ImageHealthCheckerPage;