import ToolPageLayout from "../Layout/ToolPageLayout";
import ImageToolkit from "../ImageToolkit";
import SEO from "../seo/SEO";
import { toolSchema, breadcrumbSchema, combineSchemas } from "../seo/schema";

function RotateImage() {
  return (
    <>
      <SEO
        title="Rotate Image Online Free — 90°, 180°, 270° | ImageToolkit"
        description="Rotate images online for free in your browser. Fix orientation instantly — no signup, no uploads to a server."
        keywords="rotate image online, rotate photo free, fix image orientation, rotate picture 90 degrees"
        canonical="https://project4-ashen-one.vercel.app/rotate-image"
        schema={combineSchemas(
          toolSchema({
            name: "Image Rotator",
            description: "Rotate images online for free in your browser.",
            url: "https://project4-ashen-one.vercel.app/rotate-image",
          }),
          breadcrumbSchema(
            "Rotate Image",
            "https://project4-ashen-one.vercel.app/rotate-image"
          )
        )}
      />
      <ToolPageLayout
        title="Rotate Image"
        description="Rotate images online."
      >
        <ImageToolkit defaultTool="edit" />
      </ToolPageLayout>
    </>
  );
}

export default RotateImage;