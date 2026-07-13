import { useState } from "react";

import Controls from "./Controls";
import ResizeControls from "./ResizeControls";
import ConvertControls from "./ConvertControls";
import RotateControls from "./RotateControls";
import FlipControls from "./FlipControls";
import FilterControls from "./FilterControls";
import WatermarkControls from "./WatermarkControls";
import BatchProcessControls from "./BatchProcessControls";

function ToolkitControls({
  defaultTab = "compress",
  ...props
}) {

  const [activeTab, setActiveTab] =
  useState(defaultTab);
  return (

    <div className="card shadow-lg border-0 rounded-4 mb-5">

      <div className="card-header bg-white">

        <ul className="nav nav-pills justify-content-center flex-wrap">

          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "compress"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("compress")
              }
            >
              📦 Compress
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "resize"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("resize")
              }
            >
              📏 Resize
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "convert"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("convert")
              }
            >
              🔄 Convert
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "edit"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("edit")
              }
            >
              ✂️ Edit
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "effects"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("effects")
              }
            >
              🎨 Effects
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "batch"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("batch")
              }
            >
              ⚡ Batch
            </button>
          </li>

        </ul>

      </div>

      <div className="card-body">

        {activeTab === "compress" && (
          <Controls
            quality={props.quality}
            setQuality={props.setQuality}
            onCompress={props.onCompress}
            loading={props.loading}
          />
        )}

        {activeTab === "resize" && (
          <ResizeControls
            width={props.width}
            setWidth={props.setWidth}
            height={props.height}
            setHeight={props.setHeight}
            onResize={props.onResize}
            loading={props.loading}
          />
        )}

        {activeTab === "convert" && (
          <ConvertControls
            format={props.format}
            setFormat={props.setFormat}
            onConvert={props.onConvert}
            loading={props.loading}
          />
        )}

        {activeTab === "edit" && (
          <>
            <RotateControls
              onRotate={props.onRotate}
              loading={props.loading}
            />

            <FlipControls
              onFlip={props.onFlip}
              loading={props.loading}
            />
          </>
        )}

        {activeTab === "effects" && (
          <>
            <FilterControls
              brightness={props.brightness}
              setBrightness={props.setBrightness}
              contrast={props.contrast}
              setContrast={props.setContrast}
              saturation={props.saturation}
              setSaturation={props.setSaturation}
              blur={props.blur}
              setBlur={props.setBlur}
              grayscale={props.grayscale}
              setGrayscale={props.setGrayscale}
              sepia={props.sepia}
              setSepia={props.setSepia}
              onApply={props.onApply}
              loading={props.loading}
            />

            <WatermarkControls
              watermarkText={props.watermarkText}
              setWatermarkText={
                props.setWatermarkText
              }
              onWatermark={props.onWatermark}
              loading={props.loading}
            />
          </>
        )}

        {activeTab === "batch" && (
          <BatchProcessControls
            batchResize={props.batchResize}
            setBatchResize={props.setBatchResize}

            batchCompress={props.batchCompress}
            setBatchCompress={props.setBatchCompress}

            batchConvert={props.batchConvert}
            setBatchConvert={props.setBatchConvert}

            batchWatermark={props.batchWatermark}
            setBatchWatermark={
              props.setBatchWatermark
            }

            onBatchProcess={
              props.onBatchProcess
            }

            loading={props.loading}
          />
        )}

      </div>

    </div>

  );
}

export default ToolkitControls;