export const resizeImage = (
  file,
  width,
  height,
  format = "image/jpeg",
  quality = 0.9
) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const imageURL = URL.createObjectURL(file);

    image.src = imageURL;

    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");

        context.drawImage(
          image,
          0,
          0,
          width,
          height
        );

        canvas.toBlob(
          (blob) => {

            URL.revokeObjectURL(imageURL);

            if (!blob) {
              reject(new Error("Unable to resize image."));
              return;
            }

            const fileName =
              file.name.substring(
                0,
                file.name.lastIndexOf(".")
              ) || "image";

            const resizedFile = new File(
              [blob],
              `resized-${fileName}.${format.split("/")[1]}`,
              {
                type: format,
              }
            );

            resolve(resizedFile);

          },
          format,
          quality
        );

      } catch (error) {
        URL.revokeObjectURL(imageURL);
        reject(error);
      }
    };

    image.onerror = () => {
      URL.revokeObjectURL(imageURL);
      reject(new Error("Failed to load image."));
    };
  });
};