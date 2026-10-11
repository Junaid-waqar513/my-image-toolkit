import ToolPageLayout from "../Layout/ToolPageLayout";
import ImageToolkit from "../ImageToolkit";
import SEO from "../seo/SEO";
import { toolContent } from "../data/toolContent";
import { toolSchema, breadcrumbSchema, faqSchema, combineSchemas } from "../seo/schema";

const convertFaqs = [
  {
    question: "Why does converting a transparent PNG to JPEG add a white background?",
    answer:
      "JPEG has no alpha channel, so it physically cannot store transparent pixels. When you convert, every transparent area is filled with solid white before the JPEG encoder runs, since there's no other way to represent \"nothing\" in that format. To keep transparency, convert to PNG or WEBP instead — both support an alpha channel.",
  },
  {
    question: "Does converting between formats lose quality?",
    answer:
      "It depends on the direction. Converting PNG (lossless) to JPEG or WEBP (lossy) does lose some quality, since those formats compress by discarding data your eye is less likely to notice. Converting the other way — JPEG to PNG, for example — doesn't lose any additional quality, but also can't recover detail that was already lost in the original JPEG encoding.",
  },
  {
    question: "What's actually different between JPG, PNG, and WEBP?",
    answer:
      "JPEG is lossy and has no transparency, but produces small files for photos. PNG is lossless with full transparency support, but file sizes are much larger for photo-like images. WEBP supports both lossy and lossless modes plus transparency, and generally produces smaller files than either JPEG or PNG at equivalent quality — the main tradeoff is that a handful of older tools and email clients still don't support it.",
  },
  {
    question: "Can I batch convert many images to a different format at once?",
    answer:
      "Yes — upload multiple files and they're all converted to the format you select in a single pass. Use the Batch Processing tool if you want to combine format conversion with resizing or compression in the same step.",
  },
];

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
          ),
          faqSchema(convertFaqs)
        )}
      />
      <ToolPageLayout
        title="Convert Image Online"
        description="Convert images between JPG, PNG, WEBP and BMP."
        info={toolContent.convert}
        faqs={convertFaqs}
      >
        <ImageToolkit defaultTool="convert" />
      </ToolPageLayout>
    </>
  );
}

export default ConvertImage;