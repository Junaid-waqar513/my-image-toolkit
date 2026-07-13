export const convertImage = (
  file,
  format,
 quality = 0.9
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

        context.drawImage(

          image,

          0,

          0,

          image.width,

          image.height

        );

        canvas.toBlob(

          (blob) => {

            URL.revokeObjectURL(
              imageURL
            );

            if (!blob) {

              reject(
                new Error(
                  "Image conversion failed."
                )
              );

              return;

            }

            const fileName =
              file.name.substring(
                0,
                file.name.lastIndexOf(".")
              );

            const convertedFile =
              new File(

                [blob],

                `${fileName}.${format}`,

                {
                  type: `image/${format}`,
                }

              );

            resolve(convertedFile);

          },

          `image/${format}`,

          quality

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