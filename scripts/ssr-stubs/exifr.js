// Stub used only during build-time prerendering (see scripts/prerender.mjs).
const exifr = new Proxy(
  {},
  {
    get() {
      return () => {
        throw new Error("exifr is a client-only stub during SSR");
      };
    },
  }
);
export default exifr;
