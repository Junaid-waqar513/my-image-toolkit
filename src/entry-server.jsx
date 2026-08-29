/* eslint-disable react-refresh/only-export-components */
// Build-time SSR entry (see scripts/prerender.mjs) — never hot-reloaded in
// dev, so the fast-refresh component/export-shape rule doesn't apply here.
import React from "react";
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router-dom/server.js";
import { Routes, Route } from "react-router-dom";

// Statically (non-lazy) imported pages, used ONLY for prerendering.
// The client bundle still uses React.lazy() in src/routes/AppRoutes.jsx
// for code-splitting — this file exists purely so renderToString can
// produce fully-resolved HTML synchronously instead of a loading skeleton.
import Home from "./Pages/Home";
import CompressImage from "./Pages/CompressImage";
import ResizeImage from "./Pages/ResizeImage";
import ConvertImage from "./Pages/ConvertImage";
import CropImage from "./Pages/CropImage";
import RotateImage from "./Pages/RotateImage";
import FlipImage from "./Pages/FlipImage";
import WatermarkImage from "./Pages/WatermarkImage";
import BatchProcess from "./Pages/BatchProcess";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Terms from "./Pages/Terms";
import BlogList from "./Pages/Blog/BlogList";
import BlogPost from "./Pages/Blog/BlogPost";
import ImageHealthChecker from "./Pages/ImageHealthChecker";
import ExifRemover from "./Pages/ExifRemover";
import ImageToPDF from "./Pages/ImageToPDF";
import SeoKeywordChecker from "./Pages/SeoKeywordChecker";
import NotFound from "./Pages/NotFound";

// Mirrors src/routes/AppRoutes.jsx, minus React.lazy(). Using real
// <Routes>/<Route> matching (rather than picking a component by hand) is
// required so hooks like useParams() (e.g. BlogPost's :slug) actually get
// populated from the matched route, not just the raw location.
function PrerenderRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/compress-image" element={<CompressImage />} />
      <Route path="/resize-image" element={<ResizeImage />} />
      <Route path="/convert-image" element={<ConvertImage />} />
      <Route path="/crop-image" element={<CropImage />} />
      <Route path="/rotate-image" element={<RotateImage />} />
      <Route path="/flip-image" element={<FlipImage />} />
      <Route path="/watermark-image" element={<WatermarkImage />} />
      <Route path="/batch-process" element={<BatchProcess />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/image-health-checker" element={<ImageHealthChecker />} />
      <Route path="/exif-remover" element={<ExifRemover />} />
      <Route path="/image-to-pdf" element={<ImageToPDF />} />
      <Route path="/seo-keyword-checker" element={<SeoKeywordChecker />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export function render(url) {
  // NOTE: react-helmet-async v3 detects React 19 and switches strategy —
  // instead of the old context-based extraction (helmetContext.helmet),
  // it renders <title>/<meta>/<link>/<script> tags directly inline in the
  // tree, relying on React 19's native head-hoisting. That hoisting only
  // applies to the streaming SSR renderers, not this synchronous
  // renderToString, so the tags simply appear in-place at the start of
  // appHtml (wherever <SEO/> is rendered in each page). We deliberately do
  // NOT try to use HelmetProvider's context extraction here — it stays
  // empty under React 19. Instead, prerender.mjs pulls that leading run of
  // tags back out of appHtml and uses it as the real <head> content.
  const appHtml = renderToString(
    <StaticRouter location={url}>
      <HelmetProvider>
        <PrerenderRoutes />
      </HelmetProvider>
    </StaticRouter>
  );

  return { appHtml };
}
