// Stub used only during build-time prerendering (see scripts/prerender.mjs).
// The real package is browser-only; it's never called while rendering
// static HTML, so a no-op is safe.
export default function imageCompression() {
  throw new Error("browser-image-compression is a client-only stub during SSR");
}
