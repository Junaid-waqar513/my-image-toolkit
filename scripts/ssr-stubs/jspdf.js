// Stub used only during build-time prerendering (see scripts/prerender.mjs).
export class jsPDF {
  constructor() {
    throw new Error("jspdf is a client-only stub during SSR");
  }
}
