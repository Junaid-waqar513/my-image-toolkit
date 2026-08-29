// Stub used only during build-time prerendering (see scripts/prerender.mjs).
// Unlike the other SSR stubs, useDropzone() is called during render (not
// inside an event handler), so it needs to return a real, shape-compatible
// object rather than throwing. None of this ever runs in the browser build —
// only during the static HTML pass — so returning inert props is safe.
export function useDropzone() {
  return {
    getRootProps: () => ({}),
    getInputProps: () => ({}),
    isDragActive: false,
    acceptedFiles: [],
    fileRejections: [],
    open: () => {},
  };
}
