import ToolPageLayout from "../Layout/ToolPageLayout";
import ImageToolkit from "../ImageToolkit";
import SEO from "../seo/SEO";
import { toolContent } from "../data/toolContent";
import { toolSchema, breadcrumbSchema, faqSchema, combineSchemas } from "../seo/schema";

const compressFaqs = [
  {
    question: "What's the maximum file size and image dimensions supported?",
    answer:
      "Individual files up to 20MB each, with no fixed limit on how many you upload at once. Very large source images (above roughly 4000px on the longest edge) are automatically downscaled during compression to keep processing fast in the browser — if you need to keep the original resolution, use Resize Image separately at your target dimensions first.",
  },
  {
    question: "How does the quality slider actually affect file size?",
    answer:
      "It controls the JPEG/WEBP encoder's quality setting, which changes how aggressively similar-colored blocks of pixels get merged during compression. Above roughly 80% the visual difference is usually invisible; below 50% you'll start to see blockiness in areas with fine detail or text. PNG output stays lossless regardless of the slider since PNG doesn't support a quality parameter — only JPEG and WEBP output actually change with it.",
  },
  {
    question: "Why did my transparent PNG turn out with a white background as a JPEG?",
    answer:
      "JPEG has no alpha channel — it can't store transparency at all. When a transparent PNG is compressed to JPEG, every transparent pixel is filled with white before encoding, since the format has no other way to represent \"no color here.\" If you need to keep transparency, keep the output format as PNG or WEBP instead of JPEG.",
  },
  {
    question: "Does compression run once, or does it re-search for the best settings?",
    answer:
      "It's a single encoding pass at whatever quality percentage the slider is set to — it doesn't iteratively search for a target file size. If you need a guaranteed exact file size (like under 50KB for a form upload) rather than a quality percentage, use the dedicated Compress to 50KB or Compress to 100KB tools instead, which do search iteratively for that.",
  },
];

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
          ),
          faqSchema(compressFaqs)
        )}
      />
      <ToolPageLayout
        title="Compress Image Online"
        description="Reduce image size without losing quality."
        info={toolContent.compress}
        faqs={compressFaqs}
      >
       <ImageToolkit defaultTool="compress" />
      </ToolPageLayout>
    </>
  );
}

export default CompressImage;