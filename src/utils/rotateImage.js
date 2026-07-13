export const rotateImage = (
  file,
  angle
) => {

  return new Promise((resolve, reject) => {

    const image = new Image();

    const imageURL =
      URL.createObjectURL(file);

    image.src = imageURL;

    image.onload = () => {

      try {

        const radians =
          angle * Math.PI / 180;

        const sin =
          Math.abs(Math.sin(radians));

        const cos =
          Math.abs(Math.cos(radians));

        const canvas =
          document.createElement("canvas");

        const newWidth =
          image.width * cos +
          image.height * sin;

        const newHeight =
          image.width * sin +
          image.height * cos;

        canvas.width =
          Math.round(newWidth);

        canvas.height =
          Math.round(newHeight);

        const context =
          canvas.getContext("2d");

        context.translate(

          canvas.width / 2,

          canvas.height / 2

        );

        context.rotate(radians);

        context.drawImage(

          image,

          -image.width / 2,

          -image.height / 2

        );

        canvas.toBlob(

          (blob) => {

            URL.revokeObjectURL(
              imageURL
            );

            if (!blob) {

              reject(
                new Error(
                  "Rotation failed."
                )
              );

              return;

            }

            const rotatedFile =
              new File(

                [blob],

                `rotated-${file.name}`,

                {
                  type: file.type,
                }

              );

            resolve(rotatedFile);

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