import ToolPageLayout from "../Layout/ToolPageLayout";
import ImageToolkit from "../ImageToolkit";
import SEO from "../seo/SEO";
import { toolSchema, breadcrumbSchema, combineSchemas } from "../seo/schema";

function ConvertImage() {
  return (
    <>
      <SEO
        title="Convert Image Online Free — JPG, PNG, WEBP | ImageToolkit"
        description="Convert images between JPG, PNG, WEBP and BMP online for free. Fast, private, browser-based conversion with no signup required."
        keywords="convert image online, jpg to png, png to jpg, webp converter, image format converter"
        canonical="https://project4-ashen-one.vercel.app/convert-image"
        schema={combineSchemas(
          toolSchema({
            name: "Image Converter",
            description:
              "Convert images between JPG, PNG, WEBP and BMP online for free.",
            url: "https://project4-ashen-one.vercel.app/convert-image",
          }),
          breadcrumbSchema(
            "Convert Image",
            "https://project4-ashen-one.vercel.app/convert-image"
          )
        )}
      />
      <ToolPageLayout
        title="Convert Image Online"
        description="Convert images between JPG, PNG, WEBP and BMP."
      >
        <ImageToolkit defaultTool="convert" />
      </ToolPageLayout>
    </>
  );
}

export default ConvertImage;