import ToolPageLayout from "../Layout/ToolPageLayout";
import ImageToolkit from "../ImageToolkit";
import SEO from "../seo/SEO";
import { toolSchema, breadcrumbSchema, combineSchemas } from "../seo/schema";

function BatchProcess() {
  return (
    <>
      <SEO
        title="Batch Image Processing Online Free | ImageToolkit"
        description="Resize, compress and convert multiple images at once, online and free. Process entire batches in your browser and download as a ZIP."
        keywords="batch image processing, bulk image resizer, bulk image compressor, process multiple images online"
        canonical="https://project4-ashen-one.vercel.app/batch-process"
        schema={combineSchemas(
          toolSchema({
            name: "Batch Image Processor",
            description:
              "Resize, compress and convert multiple images at once, online and free.",
            url: "https://project4-ashen-one.vercel.app/batch-process",
          }),
          breadcrumbSchema(
            "Batch Processing",
            "https://project4-ashen-one.vercel.app/batch-process"
          )
        )}
      />
      <ToolPageLayout
        title="Batch Image Processing"
        description="Resize, compress and convert multiple images."
      >
        <ImageToolkit defaultTool="batch" />
      </ToolPageLayout>
    </>
  );
}

export default BatchProcess;