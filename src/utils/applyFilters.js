export const applyFilters = (
  file,
  {
    brightness,
    contrast,
    saturation,
    blur,
    grayscale,
    sepia,
  }
) => {

  return new Promise((resolve, reject) => {

    const image = new Image();

    const imageURL =
      URL.createObjectURL(file);

    image.src = imageURL;

    image.onload = () => {

      try {

        const canvas =
          document.createElement("canvas");

        canvas.width =
          image.width;

        canvas.height =
          image.height;

        const context =
          canvas.getContext("2d");

        context.filter = `
          brightness(${brightness}%)
          contrast(${contrast}%)
          saturate(${saturation}%)
          blur(${blur}px)
          grayscale(${grayscale}%)
          sepia(${sepia}%)
        `;

        context.drawImage(
          image,
          0,
          0
        );

        canvas.toBlob(

          (blob) => {

            URL.revokeObjectURL(
              imageURL
            );

            if (!blob) {

              reject(
                new Error(
                  "Filter processing failed."
                )
              );

              return;

            }

            const filteredFile =
              new File(

                [blob],

                `filtered-${file.name}`,

                {
                  type: file.type,
                }

              );

            resolve(filteredFile);

          },

          file.type,

          0.95

        );

      }

      catch (error) {

        URL.revokeObjectURL(
          imageURL
        );

        reject(error);

      }

    };

    image.onerror = () => {

      URL.revokeObjectURL(
        imageURL
      );

      reject(
        new Error(
          "Unable to load image."
        )
      );

    };

  });

};