// Generates a full favicon + PWA icon set from a single source image,
// entirely in the browser via canvas. No server, no upload.

// Resize a loaded HTMLImageElement to an exact square canvas of `size`px,
// center-cropping if the source isn't square, and return a PNG Blob.
export function resizeToSquarePng(image, size) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  const sourceSize = Math.min(image.naturalWidth, image.naturalHeight);
  const sx = (image.naturalWidth - sourceSize) / 2;
  const sy = (image.naturalHeight - sourceSize) / 2;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(image, sx, sy, sourceSize, sourceSize, 0, 0, size, size);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/png");
  });
}

// Builds a valid .ico file by embedding one or more PNG images directly in
// an ICO container (the "PNG-in-ICO" format supported by Windows Vista+
// and every modern browser). This avoids having to hand-roll raw BMP pixel
// encoding, which is far more error-prone than reusing the PNG bytes we
// already have from canvas.toBlob().
export async function buildIco(pngBlobs) {
  const buffers = await Promise.all(
    pngBlobs.map((b) => b.blob.arrayBuffer())
  );

  const count = buffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = dirEntrySize * count;

  let dataOffset = headerSize + dirSize;
  const totalSize =
    dataOffset + buffers.reduce((sum, buf) => sum + buf.byteLength, 0);

  const out = new Uint8Array(totalSize);
  const view = new DataView(out.buffer);

  // ICONDIR header
  view.setUint16(0, 0, true); // reserved
  view.setUint16(2, 1, true); // type: 1 = icon
  view.setUint16(4, count, true); // image count

  let entryOffset = headerSize;
  let dataPos = dataOffset;

  pngBlobs.forEach(({ size }, i) => {
    const buf = buffers[i];

    // ICONDIRENTRY — width/height of 0 means 256px per the ICO spec
    view.setUint8(entryOffset, size >= 256 ? 0 : size); // width
    view.setUint8(entryOffset + 1, size >= 256 ? 0 : size); // height
    view.setUint8(entryOffset + 2, 0); // color palette
    view.setUint8(entryOffset + 3, 0); // reserved
    view.setUint16(entryOffset + 4, 1, true); // color planes
    view.setUint16(entryOffset + 6, 32, true); // bits per pixel
    view.setUint32(entryOffset + 8, buf.byteLength, true); // size of image data
    view.setUint32(entryOffset + 12, dataPos, true); // offset of image data

    out.set(new Uint8Array(buf), dataPos);

    dataPos += buf.byteLength;
    entryOffset += dirEntrySize;
  });

  return new Blob([out], { type: "image/x-icon" });
}

export function buildWebManifest(name, shortName) {
  return JSON.stringify(
    {
      name,
      short_name: shortName,
      icons: [
        { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      theme_color: "#0f172a",
      background_color: "#ffffff",
      display: "standalone",
    },
    null,
    2
  );
}

export function buildHtmlSnippet() {
  return `<!-- Add these inside your <head> tag -->
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="#0f172a" />
`;
}
