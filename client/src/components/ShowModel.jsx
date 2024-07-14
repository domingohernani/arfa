import React, { useState, useEffect, useRef } from "react";

function ShowModel({ path }) {
  const modelViewerRef = useRef(null);
  const varaintRef = useRef(null);
  const [variants, setVariants] = useState([]);
  const [initialVariant, setInitialVariant] = useState(null);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;

    const handleLoad = () => {
      const names = modelViewer.availableVariants;
      const variantOptions = names.map((name) => ({
        value: name,
        label: name,
      }));
      setVariants(variantOptions);
    };

    modelViewer.addEventListener("load", handleLoad);

    return () => {
      modelViewer.removeEventListener("load", handleLoad);
    };
  }, []);

  const handleVariantChange = (event) => {
    const variantName =
      event.target.value === "default" ? null : event.target.value;
    modelViewerRef.current.variantName = variantName;
  };

  return (
    <>
      <model-viewer
        id="chair"
        ar
        ar-modes="webxr scene-viewer quick-look"
        loading="eager"
        camera-controls
        touch-action="pan-y"
        auto-rotate
        src={path}
        shadow-intensity="1"
        camera-orbit="0deg 90deg 2.9m"
        ref={modelViewerRef}
      ></model-viewer>
      <div className="mx-auto my-2 text-sm controls">
        <div className="flex items-center">
          <span>Variant:</span>
          <select
            id="variant"
            onChange={handleVariantChange}
            value={initialVariant}
            ref={varaintRef}
            className="text-sm text-center border-b border-b-gray-300 focus:border-b-gray-300 focus:border-t-transparent focus:border-x-transparent border-t-transparent border-x-transparent focus:ring-transparent focus:outline-none"
          >
            {variants.map((variant, index) => (
              <option key={index} value={variant.value}>
                {variant.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

export default ShowModel;
