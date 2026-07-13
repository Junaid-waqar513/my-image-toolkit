import ToolPageLayout from "../Layout/ToolPageLayout";
import ImageToolkit from "../ImageToolkit";
import SEO from "../seo/SEO";
import { toolSchema, breadcrumbSchema, combineSchemas } from "../seo/schema";

function CropImage() {
  return (
    <>
      <SEO
        title="Crop Image Online Free — No Watermark | ImageToolkit"
        description="Crop images online for free, right in your browser. No signup, no watermark, and your photos never leave your device."
        keywords="crop image online, crop photo free, image cropper, crop picture no watermark"
        canonical="https://project4-ashen-one.vercel.app/crop-image"
        schema={combineSchemas(
          toolSchema({
            name: "Image Cropper",
            description:
              "Crop images online for free, right in your browser.",
            url: "https://project4-ashen-one.vercel.app/crop-image",
          }),
          breadcrumbSchema("Crop Image", "https://project4-ashen-one.vercel.app/crop-image")
        )}
      />
      <ToolPageLayout
        title="Crop Image Online"
        description="Crop images quickly."
      >
        <ImageToolkit defaultTool="edit" />
      </ToolPageLayout>
    </>
  );
}

export default CropImage;