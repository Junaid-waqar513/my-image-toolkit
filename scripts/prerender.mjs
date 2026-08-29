// Prerenders every route to a static .html file after `vite build`.
//
// Why: this app is a client-rendered React SPA (Vite + react-router-dom).
// Crawlers that don't execute JavaScript (and even Google, on its first
// indexing pass) only ever see the bare index.html shell. This script uses
// Vite's own SSR transform (no headless browser required) to render each
// route's real HTML — including the per-page <title>, meta tags, canonical
// link, and JSON-LD from src/seo/SEO.jsx — and writes it to a matching
// static file. Vercel serves these static files directly when they exist,
// so crawlers get real content on the very first response. The client-side
// bundle then hydrates on top of it exactly as before.
//
// Run automatically as part of `npm run build` (see package.json).

import { createServer } from "vite";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";

const root = path.dirname(fileURLToPath(import.meta.url)) + "/..";
const distDir = path.join(root, "dist");

async function getRoutes(vite) {
  const staticRoutes = [
    "/",
    "/compress-image",
    "/resize-image",
    "/convert-image",
    "/crop-image",
    "/rotate-image",
    "/flip-image",
    "/watermark-image",
    "/batch-process",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/image-health-checker",
    "/exif-remover",
    "/image-to-pdf",
    "/seo-keyword-checker",
    "/blog",
  ];

  // Pull blog slugs straight from the data file so this list never drifts
  // out of sync with sitemap.xml or the actual blog content.
  const { blogPosts } = await vite.ssrLoadModule("/src/data/blogPosts.js");
  const blogRoutes = blogPosts.map((p) => `/blog/${p.slug}`);

  return [...staticRoutes, ...blogRoutes];
}

function routeToFilePath(route) {
  if (route === "/") return path.join(distDir, "index.html");
  return path.join(distDir, `${route.replace(/^\//, "")}.html`);
}

async function main() {
  const stubsDir = path.join(root, "scripts", "ssr-stubs");
  const vite = await createServer({
    root,
    server: { middlewareMode: true },
    appType: "custom",
    // Several deps used inside components (file-saver, jszip, jspdf,
    // browser-image-compression, exifr, react-dropzone, react-easy-crop,
    // react-compare-image) are either CommonJS with messy interop, or touch
    // browser-only APIs at import/render time. None of them are ever
    // actually exercised while producing static HTML — the real work they
    // do only happens inside click handlers or canvas rendering — so we
    // swap them for tiny inert stubs (scripts/ssr-stubs/) just for this
    // prerender pass. This does not affect the real client bundle at all.
    resolve: {
      alias: {
        "file-saver": path.join(stubsDir, "file-saver.js"),
        jszip: path.join(stubsDir, "jszip.js"),
        jspdf: path.join(stubsDir, "jspdf.js"),
        "browser-image-compression": path.join(
          stubsDir,
          "browser-image-compression.js"
        ),
        exifr: path.join(stubsDir, "exifr.js"),
        "react-dropzone": path.join(stubsDir, "react-dropzone.js"),
        "react-easy-crop": path.join(stubsDir, "react-easy-crop.js"),
        "react-compare-image": path.join(stubsDir, "react-compare-image.js"),
      },
    },
  });

  const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");
  const template = await fs.readFile(path.join(distDir, "index.html"), "utf-8");

  // Strip the static default <title> and <meta name="description"> so
  // each prerendered page ships only its own unique tags (avoids duplicate
  // <title>/<meta> elements once we inject the per-route head tags below).
  const strippedTemplate = template
    .replace(/<title>.*?<\/title>\s*/is, "")
    .replace(/<meta\s+name=["']description["'][^>]*>\s*/i, "");

  const routes = await getRoutes(vite);
  let ok = 0;

  for (const route of routes) {
    try {
      let { appHtml } = render(route);

      // react-helmet-async (React 19 mode) renders <title>/<meta>/<link>/
      // <script> tags directly inline at the start of appHtml, wherever
      // <SEO/> sits in the tree, rather than via context extraction (see
      // the note in src/entry-server.jsx). Pull that leading run out and
      // use it as this route's real <head> content, then strip it from
      // the body markup so it isn't duplicated inside #root.
      const leadingHeadTags =
        appHtml.match(
          /^(?:\s|<title>.*?<\/title>|<meta[^>]*\/?>|<link[^>]*\/?>|<script[^>]*>.*?<\/script>)+/is
        )?.[0] ?? "";
      const headHtml = leadingHeadTags.trim();
      appHtml = appHtml.slice(leadingHeadTags.length);

      if (!headHtml) {
        console.warn(`⚠ ${route}: no <head> tags found — check <SEO/> is rendering on this page`);
      }

      const html = strippedTemplate
        .replace("</head>", `${headHtml}\n</head>`)
        .replace(
          '<div id="root"></div>',
          `<div id="root">${appHtml}</div>`
        );

      const filePath = routeToFilePath(route);
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, html);
      ok++;
    } catch (err) {
      console.error(`✗ Failed to prerender ${route}:`, err.message);
    }
  }

  await vite.close();
  console.log(`✓ Prerendered ${ok}/${routes.length} routes to /dist`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
