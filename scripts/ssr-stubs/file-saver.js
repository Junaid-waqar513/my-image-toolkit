// Stub used only during build-time prerendering (see scripts/prerender.mjs).
export function saveAs() {
  throw new Error("file-saver is a client-only stub during SSR");
}
export default { saveAs };
