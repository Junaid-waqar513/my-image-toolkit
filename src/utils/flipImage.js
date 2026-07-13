export const flipImage = (
  file,
  direction
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

        // ======================
        // Horizontal Flip
        // ======================

        if (direction === "horizontal") {

          context.translate(
            image.width,
            0
          );

          context.scale(-1, 1);

        }

        // ======================
        // Vertical Flip
        // ======================

        if (direction === "vertical") {

          context.translate(
            0,
            image.height
          );

          context.scale(1, -1);

        }

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
                  "Flip failed."
                )
              );

              return;

            }

            const flippedFile =
              new File(

                [blob],

                `flipped-${file.name}`,

                {
                  type: file.type,
                }

              );

            resolve(flippedFile);

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