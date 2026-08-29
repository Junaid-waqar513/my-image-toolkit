// Stub used only during build-time prerendering (see scripts/prerender.mjs).
export default class JSZip {
  constructor() {
    throw new Error("jszip is a client-only stub during SSR");
  }
}
