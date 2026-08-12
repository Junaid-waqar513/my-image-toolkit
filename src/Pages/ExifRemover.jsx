import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ExifRemover from "../Components/ExifRemover";
import SEO from "../seo/SEO";
import { toolSchema, breadcrumbSchema, combineSchemas } from "../seo/schema";

const SITE_URL = "https://project4-ashen-one.vercel.app";

function ExifRemoverPage() {
  return (
    <>
      <SEO
        title="Free EXIF Metadata Remover Online — Remove Image Metadata"
        description="Remove EXIF and hidden metadata, including GPS location, from JPG, PNG and other images online for free. Everything happens in your browser — nothing is uploaded."
        keywords="remove image metadata, remove exif data, exif remover online, strip metadata from jpg, remove gps location from photo"
        canonical={`${SITE_URL}/exif-remover`}
        schema={combineSchemas(
          toolSchema({
            name: "EXIF Metadata Remover",
            description:
              "Remove EXIF and hidden metadata, including GPS location, from images online for free.",
            url: `${SITE_URL}/exif-remover`,
          }),
          breadcrumbSchema("EXIF Metadata Remover", `${SITE_URL}/exif-remover`)
        )}
      />

      <Navbar />
      <ExifRemover />
      <Footer />
    </>
  );
}

export default ExifRemoverPage;