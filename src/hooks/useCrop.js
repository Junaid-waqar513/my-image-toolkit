import { useState } from "react";
import { cropImage } from "../utils/cropImage";

export default function useCrop() {

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [crop, setCrop] =
    useState({
      x: 0,
      y: 0,
    });

  const [zoom, setZoom] =
    useState(1);

  const [croppedImage,
    setCroppedImage] =
    useState(null);

  const [

    croppedAreaPixels,

    setCroppedAreaPixels,

  ] = useState(null);

  const onCropComplete = (

    croppedArea,

    croppedAreaPixels

  ) => {

    setCroppedAreaPixels(

      croppedAreaPixels

    );

  };

  const handleCrop = async () => {

    if (

      !selectedImage ||

      !croppedAreaPixels

    )

      return;

    const cropped =
      await cropImage(

        selectedImage,

        croppedAreaPixels

      );

    setCroppedImage(cropped);

  };

  return {

    selectedImage,

    setSelectedImage,

    crop,

    setCrop,

    zoom,

    setZoom,

    croppedImage,

    setCroppedImage,

    onCropComplete,

    handleCrop,

  };

}