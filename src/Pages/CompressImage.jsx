import ToolPageLayout from "../Layout/ToolPageLayout";
import ImageToolkit from "../ImageToolkit";
import SEO from "../seo/SEO";
import { toolSchema, breadcrumbSchema, combineSchemas } from "../seo/schema";

function CompressImage() {
  return (
    <>
      <SEO
        title="Compress Image Online Free — No Quality Loss | ImageToolkit"
        description="Compress JPG, PNG and WEBP images online for free without losing quality. 100% browser-based — your images are never uploaded to a server."
        keywords="compress image online, image compressor free, reduce image size, jpg compressor, png compressor"
        canonical="https://project4-ashen-one.vercel.app/compress-image"
        schema={combineSchemas(
          toolSchema({
            name: "Image Compressor",
            description:
              "Compress JPG, PNG and WEBP images online for free without losing quality.",
            url: "https://project4-ashen-one.vercel.app/compress-image",
          }),
          breadcrumbSchema(
            "Compress Image",
            "https://project4-ashen-one.vercel.app/compress-image"
          )
        )}
      />
      <ToolPageLayout
        title="Compress Image Online"
        description="Reduce image size without losing quality."
      >
       <ImageToolkit defaultTool="compress" />
      </ToolPageLayout>
    </>
  );
}

export default CompressImage;