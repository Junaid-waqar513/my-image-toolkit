import ToolPageLayout from "../Layout/ToolPageLayout";
import App from "../ImageToolkit";
import SEO from "../seo/SEO";
import { toolSchema, breadcrumbSchema, combineSchemas } from "../seo/schema";

function ResizeImage() {
  return (
    <>
      <SEO
        title="Resize Image Online Free — Pixel Perfect | ImageToolkit"
        description="Resize images online for websites, social media, and printing. Set exact pixel dimensions in your browser — free, fast, and private."
        keywords="resize image online, image resizer free, resize photo for instagram, change image dimensions"
        canonical="https://project4-ashen-one.vercel.app/resize-image"
        schema={combineSchemas(
          toolSchema({
            name: "Image Resizer",
            description:
              "Resize images online for websites, social media, and printing.",
            url: "https://project4-ashen-one.vercel.app/resize-image",
          }),
          breadcrumbSchema(
            "Resize Image",
            "https://project4-ashen-one.vercel.app/resize-image"
          )
        )}
      />
      <ToolPageLayout
        title="Resize Image"
        description="Resize images for websites, social media and printing."
      >
        <App defaultTool="resize" />
      </ToolPageLayout>
    </>
  );
}

export default ResizeImage;