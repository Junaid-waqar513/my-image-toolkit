import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./App.css";

const rootEl = document.getElementById("root");

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

// If this page was served as one of our prerendered static .html files
// (see scripts/prerender.mjs), #root already contains real markup — use
// hydrateRoot so React reuses it instead of wiping it out and re-rendering
// from scratch (avoids a flash of empty content and a hydration warning).
// Routes with no prerendered file (rare/edge cases) fall through to the
// normal createRoot render, exactly as before.
if (rootEl.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootEl, app);
} else {
  ReactDOM.createRoot(rootEl).render(app);
}