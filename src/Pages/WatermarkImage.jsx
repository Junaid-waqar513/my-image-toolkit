import ToolPageLayout from "../Layout/ToolPageLayout";
import ImageToolkit from "../ImageToolkit";
import SEO from "../seo/SEO";
import { toolSchema, breadcrumbSchema, combineSchemas } from "../seo/schema";

function WatermarkImage() {
  return (
    <>
      <SEO
        title="Add Watermark to Image Online Free | ImageToolkit"
        description="Add a text watermark to your images online for free. Protect your photos in seconds, right in your browser — no signup needed."
        keywords="add watermark to image, watermark photo online, free watermark tool, protect images online"
        canonical="https://project4-ashen-one.vercel.app/watermark-image"
        schema={combineSchemas(
          toolSchema({
            name: "Image Watermark Tool",
            description:
              "Add a text watermark to your images online for free.",
            url: "https://project4-ashen-one.vercel.app/watermark-image",
          }),
          breadcrumbSchema(
            "Watermark Image",
            "https://project4-ashen-one.vercel.app/watermark-image"
          )
        )}
      />
      <ToolPageLayout
        title="Watermark Image"
        description="Add text watermark to your images."
      >
        <ImageToolkit defaultTool="effects" />
      </ToolPageLayout>
    </>
  );
}

export default WatermarkImage;