import ToolPageLayout from "../Layout/ToolPageLayout";
import ImageToolkit from "../ImageToolkit";
import SEO from "../seo/SEO";
import { toolSchema, breadcrumbSchema, combineSchemas } from "../seo/schema";

function FlipImage() {
  return (
    <>
      <SEO
        title="Flip Image Online Free — Horizontal & Vertical | ImageToolkit"
        description="Flip images horizontally or vertically online for free. Fast, private, browser-based — no signup required."
        keywords="flip image online, mirror image free, flip photo horizontal, flip picture vertical"
        canonical="https://project4-ashen-one.vercel.app/flip-image"
        schema={combineSchemas(
          toolSchema({
            name: "Image Flipper",
            description:
              "Flip images horizontally or vertically online for free.",
            url: "https://project4-ashen-one.vercel.app/flip-image",
          }),
          breadcrumbSchema("Flip Image", "https://project4-ashen-one.vercel.app/flip-image")
        )}
      />
      <ToolPageLayout
        title="Flip Image"
        description="Flip images horizontally or vertically."
      >
        <ImageToolkit defaultTool="edit" />
      </ToolPageLayout>
    </>
  );
}

export default FlipImage;