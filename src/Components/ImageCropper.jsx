import Cropper from "react-easy-crop";

function ImageCropper({
  image,
  crop,
  setCrop,
  zoom,
  setZoom,
  onCropComplete,
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "400px",
      }}
    >
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={1}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
      />
    </div>
  );
}

export default ImageCropper;