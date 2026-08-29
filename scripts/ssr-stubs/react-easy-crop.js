// Stub used only during build-time prerendering (see scripts/prerender.mjs).
// Rendered as a JSX element (<Cropper />), so it must be a real component.
// It's purely an interactive canvas-cropping widget — safe to render as an
// empty placeholder for the static HTML pass.
export default function Cropper() {
  return null;
}
