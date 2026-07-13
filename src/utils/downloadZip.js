import JSZip from "jszip";
import { saveAs } from "file-saver";

export const downloadZip = async (
  files,
  zipName
) => {
  const zip = new JSZip();

  files.forEach((file) => {
    zip.file(
      file.name,
      file
    );
  });

  const content =
    await zip.generateAsync({
      type: "blob",
    });

  saveAs(
    content,
    `${zipName}.zip`
  );
};