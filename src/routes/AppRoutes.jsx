import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home";
import PageLoader from "../Components/PageLoader";

const CompressImage = lazy(() => import("../Pages/CompressImage"));
const ResizeImage = lazy(() => import("../Pages/ResizeImage"));
const ConvertImage = lazy(() => import("../Pages/ConvertImage"));
const CropImage = lazy(() => import("../Pages/CropImage"));
const RotateImage = lazy(() => import("../Pages/RotateImage"));
const FlipImage = lazy(() => import("../Pages/FlipImage"));
const WatermarkImage = lazy(() => import("../Pages/WatermarkImage"));
const BatchProcess = lazy(() => import("../Pages/BatchProcess"));

const About = lazy(() => import("../Pages/About"));
const Contact = lazy(() => import("../Pages/Contact"));
const PrivacyPolicy = lazy(() => import("../Pages/PrivacyPolicy"));
const Terms = lazy(() => import("../Pages/Terms"));

const BlogList = lazy(() => import("../Pages/Blog/BlogList"));
const BlogPost = lazy(() => import("../Pages/Blog/BlogPost"));

const NotFound = lazy(() => import("../Pages/NotFound"));

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/compress-image"
        element={<CompressImage />}
      />

      <Route
        path="/resize-image"
        element={<ResizeImage />}
      />

      <Route
        path="/convert-image"
        element={<ConvertImage />}
      />

      <Route
        path="/crop-image"
        element={<CropImage />}
      />

      <Route
        path="/rotate-image"
        element={<RotateImage />}
      />

      <Route
        path="/flip-image"
        element={<FlipImage />}
      />

      <Route
        path="/watermark-image"
        element={<WatermarkImage />}
      />

      <Route
        path="/batch-process"
        element={<BatchProcess />}
      />

      <Route
        path="/about"
        element={<About />}
      />

      <Route
        path="/contact"
        element={<Contact />}
      />

      <Route
        path="/privacy-policy"
        element={<PrivacyPolicy />}
      />

      <Route
        path="/terms"
        element={<Terms />}
      />

      <Route
        path="/blog"
        element={<BlogList />}
      />

      <Route
        path="/blog/:slug"
        element={<BlogPost />}
      />

      <Route
        path="*"
        element={<NotFound />}
      />

      </Routes>
    </Suspense>
  );
}

export default AppRoutes;