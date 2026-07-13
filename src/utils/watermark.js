export const addWatermark = (
  file,
  watermarkText
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

        // Draw Image

        context.drawImage(
          image,
          0,
          0
        );

        // =========================
        // Watermark
        // =========================

        context.save();

        context.translate(
          image.width / 2,
          image.height / 2
        );

        context.rotate(-0.4);

        const fontSize =
          Math.max(
            24,
            Math.floor(image.width / 10)
          );

        context.font =
          `bold ${fontSize}px Arial`;

        context.textAlign =
          "center";

        context.textBaseline =
          "middle";

        context.fillStyle =
          "rgba(255,255,255,0.25)";

        context.fillText(

          watermarkText,

          0,

          0

        );

        context.restore();

        // =========================
        // Export
        // =========================

        canvas.toBlob(

          (blob) => {

            URL.revokeObjectURL(
              imageURL
            );

            if (!blob) {

              reject(
                new Error(
                  "Watermark failed."
                )
              );

              return;

            }

            const watermarkedFile =
              new File(

                [blob],

                `watermarked-${file.name}`,

                {
                  type: file.type,
                }

              );

            resolve(
              watermarkedFile
            );

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