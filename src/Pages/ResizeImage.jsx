import ToolPageLayout from "../Layout/ToolPageLayout";
import App from "../ImageToolkit";
import SEO from "../seo/SEO";
import { toolContent } from "../data/toolContent";
import { toolSchema, breadcrumbSchema, faqSchema, combineSchemas } from "../seo/schema";

const resizeFaqs = [
  {
    question: "Does resizing keep the original aspect ratio automatically?",
    answer:
      "No — width and height are set independently, so if you enter dimensions that don't match your original image's ratio, the result will stretch or squash. To keep the original proportions, calculate the second dimension yourself (new height = new width × original height ÷ original width). For a square result from a non-square photo, use Crop Image first, which crops to a square, then resize to your exact pixel dimensions.",
  },
  {
    question: "Can I make an image larger than its original size?",
    answer:
      "Yes, technically — but resizing up doesn't add real detail. The tool interpolates (estimates) new pixels between the existing ones, so enlarging a small image will look softer or blurrier than a photo actually taken at that resolution. It works fine for modest increases; doubling or tripling the original size will show visible softness.",
  },
  {
    question: "What resolution should I use for a website vs. printing?",
    answer:
      "Web images only need to match their actual display size — a banner shown at 1200px wide gains nothing from being uploaded at 4000px, just slower page loads. Printing is different: it's measured in DPI (dots per inch), not just pixels, so a photo printed at 8×10 inches needs roughly 2400×3000px at 300 DPI to look sharp.",
  },
  {
    question: "Does resizing recompress the image, even if I don't change the format?",
    answer:
      "Yes. Resizing redraws the image onto a canvas at the new dimensions and re-encodes it, so JPEG and WEBP outputs go through their compression step again even if you keep the same format and don't touch a quality setting. This is unavoidable — there's no way to resize pixel dimensions without regenerating the file.",
  },
];

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
          ),
          faqSchema(resizeFaqs)
        )}
      />
      <ToolPageLayout
        title="Resize Image"
        description="Resize images for websites, social media and printing."
        info={toolContent.resize}
        faqs={resizeFaqs}
      >
        <App defaultTool="resize" />
      </ToolPageLayout>
    </>
  );
}

export default ResizeImage;