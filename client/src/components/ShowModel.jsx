import React, { useState, useEffect, useRef } from "react";
import arIcon from "../assets/icons/ar.svg";
import { Tooltip } from "flowbite-react";
import QRCodeModal from "./QRCodeModal";
import { useStore } from "../stores/useStore";
import { useParams } from "react-router-dom";
import { CubeTransparentIcon } from "@heroicons/react/20/solid";

function ShowModel({
  path,
  addToCartBtn = false,
  handleAddToCart,
  handleSelectedStockChange = () => {},
}) {
  const modelViewerRef = useRef(null);
  const [variants, setVariants] = useState([]);
  const setDetectedVariants = useStore((state) => state.setDetectedVariants);
  const [initialVariant, setInitialVariant] = useState("");
  const [toggleDimension, setToggleDimension] = useState(true);
  const dimButtons = useRef(Array.from({ length: 11 }, () => useRef(null)));
  const dimLine = useRef(null);
  const updateIsQRCodeOpen = useStore((state) => state.updateIsQRCodeOpen);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;

    const handleLoad = () => {
      const names = modelViewer.availableVariants;
      const variantOptions = names.map((name) => ({
        value: name,
        label: name,
      }));
      setVariants(variantOptions);
      setDetectedVariants(variantOptions);

      if (variantOptions.length > 0) {
        setInitialVariant(variantOptions[0].value);
      }

      const center = modelViewer.getBoundingBoxCenter();
      const size = modelViewer.getDimensions();
      const x2 = size.x / 2;
      const y2 = size.y / 2;
      const z2 = size.z / 2;

      modelViewer.updateHotspot({
        name: "hotspot-dot+X-Y+Z",
        position: `${center.x + x2} ${center.y - y2} ${center.z + z2}`,
      });

      modelViewer.updateHotspot({
        name: "hotspot-dim+X-Y",
        position: `${center.x + x2 * 1.2} ${center.y - y2 * 1.1} ${center.z}`,
      });
      modelViewer.querySelector(
        'button[slot="hotspot-dim+X-Y"]'
      ).textContent = `${(size.z * 100).toFixed(0)} cm`;

      modelViewer.updateHotspot({
        name: "hotspot-dot+X-Y-Z",
        position: `${center.x + x2} ${center.y - y2} ${center.z - z2}`,
      });

      modelViewer.updateHotspot({
        name: "hotspot-dim+X-Z",
        position: `${center.x + x2 * 1.2} ${center.y} ${center.z - z2 * 1.2}`,
      });
      modelViewer.querySelector(
        'button[slot="hotspot-dim+X-Z"]'
      ).textContent = `${(size.y * 100).toFixed(0)} cm`;

      modelViewer.updateHotspot({
        name: "hotspot-dot+X+Y-Z",
        position: `${center.x + x2} ${center.y + y2} ${center.z - z2}`,
      });

      modelViewer.updateHotspot({
        name: "hotspot-dim+Y-Z",
        position: `${center.x} ${center.y + y2 * 1.1} ${center.z - z2 * 1.1}`,
      });
      modelViewer.querySelector(
        'button[slot="hotspot-dim+Y-Z"]'
      ).textContent = `${(size.x * 100).toFixed(0)} cm`;

      modelViewer.updateHotspot({
        name: "hotspot-dot-X+Y-Z",
        position: `${center.x - x2} ${center.y + y2} ${center.z - z2}`,
      });

      modelViewer.updateHotspot({
        name: "hotspot-dim-X-Z",
        position: `${center.x - x2 * 1.2} ${center.y} ${center.z - z2 * 1.2}`,
      });
      modelViewer.querySelector(
        'button[slot="hotspot-dim-X-Z"]'
      ).textContent = `${(size.y * 100).toFixed(0)} cm`;

      modelViewer.updateHotspot({
        name: "hotspot-dot-X-Y-Z",
        position: `${center.x - x2} ${center.y - y2} ${center.z - z2}`,
      });

      modelViewer.updateHotspot({
        name: "hotspot-dim-X-Y",
        position: `${center.x - x2 * 1.2} ${center.y - y2 * 1.1} ${center.z}`,
      });
      modelViewer.querySelector(
        'button[slot="hotspot-dim-X-Y"]'
      ).textContent = `${(size.z * 100).toFixed(0)} cm`;

      modelViewer.updateHotspot({
        name: "hotspot-dot-X-Y+Z",
        position: `${center.x - x2} ${center.y - y2} ${center.z + z2}`,
      });

      renderSVG();
    };

    const drawLine = (svgLine, dotHotspot1, dotHotspot2, dimensionHotspot) => {
      if (dotHotspot1 && dotHotspot2) {
        svgLine.setAttribute("x1", dotHotspot1.canvasPosition.x);
        svgLine.setAttribute("y1", dotHotspot1.canvasPosition.y);
        svgLine.setAttribute("x2", dotHotspot2.canvasPosition.x);
        svgLine.setAttribute("y2", dotHotspot2.canvasPosition.y);

        if (dimensionHotspot && !dimensionHotspot.facingCamera) {
          svgLine.classList.add("hide");
        } else {
          svgLine.classList.remove("hide");
        }
      }
    };

    const renderSVG = () => {
      const dimLines = modelViewer.querySelectorAll("line");
      drawLine(
        dimLines[0],
        modelViewer.queryHotspot("hotspot-dot+X-Y+Z"),
        modelViewer.queryHotspot("hotspot-dot+X-Y-Z"),
        modelViewer.queryHotspot("hotspot-dim+X-Y")
      );
      drawLine(
        dimLines[1],
        modelViewer.queryHotspot("hotspot-dot+X-Y-Z"),
        modelViewer.queryHotspot("hotspot-dot+X+Y-Z"),
        modelViewer.queryHotspot("hotspot-dim+X-Z")
      );
      drawLine(
        dimLines[2],
        modelViewer.queryHotspot("hotspot-dot+X+Y-Z"),
        modelViewer.queryHotspot("hotspot-dot-X+Y-Z")
      ); // always visible
      drawLine(
        dimLines[3],
        modelViewer.queryHotspot("hotspot-dot-X+Y-Z"),
        modelViewer.queryHotspot("hotspot-dot-X-Y-Z"),
        modelViewer.queryHotspot("hotspot-dim-X-Z")
      );
      drawLine(
        dimLines[4],
        modelViewer.queryHotspot("hotspot-dot-X-Y-Z"),
        modelViewer.queryHotspot("hotspot-dot-X-Y+Z"),
        modelViewer.queryHotspot("hotspot-dim-X-Y")
      );
    };

    modelViewer.addEventListener("load", handleLoad);
    modelViewer.addEventListener("camera-change", renderSVG);

    return () => {
      modelViewer.removeEventListener("load", handleLoad);
      modelViewer.removeEventListener("camera-change", renderSVG);
    };
  }, []);

  const showDimension = () => {
    const modelViewer = modelViewerRef.current;
    if (modelViewer) {
      setToggleDimension(!toggleDimension);

      if (toggleDimension) {
        Array.from(modelViewer.querySelectorAll(".dimensionLine")).forEach(
          (line) => {
            line.classList.add("hideDimension");
          }
        );
        Array.from(modelViewer.querySelectorAll(".dim")).forEach((line) => {
          line.classList.add("hideDimension");
        });
        Array.from(modelViewer.querySelectorAll(".dot")).forEach((line) => {
          line.classList.add("hideDimension");
        });
      } else {
        Array.from(modelViewer.querySelectorAll(".dimensionLine")).forEach(
          (line) => {
            line.classList.remove("hideDimension");
          }
        );
        Array.from(modelViewer.querySelectorAll(".dim")).forEach((line) => {
          line.classList.remove("hideDimension");
        });
        Array.from(modelViewer.querySelectorAll(".dot")).forEach((line) => {
          line.classList.remove("hideDimension");
        });
      }
    }
  };

  const handleVariantChange = (event) => {
    const variantName =
      event.target.value === "default" ? null : event.target.value;
    modelViewerRef.current.variantName = variantName;
    setInitialVariant(variantName);
    if (handleSelectedStockChange) {
      handleSelectedStockChange(variantName);
    }
  };

  const handleArClick = () => {
    const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

    if (!isMobileDevice) {
      updateIsQRCodeOpen(true);
    } else {
      modelViewerRef.current.activateAR();
    }
  };

  const handleBtnClick = () => {
    if (handleAddToCart) {
      handleAddToCart(initialVariant);
    }
  };

  return (
    <>
      <model-viewer
        class="model"
        ar
        ar-modes="webxr scene-viewer quick-look"
        loading="eager"
        camera-controls
        touch-action="pan-y"
        auto-rotate
        src={path}
        ar-scale="fixed"
        shadow-intensity="1"
        camera-orbit="0deg 90deg 2.9m"
        ref={modelViewerRef}
      >
        <button slot="ar-button" className="hidden"></button>

        <button
          slot="hotspot-dot+X-Y+Z"
          className="dot"
          data-position="1 -1 1"
          data-normal="1 0 0"
          ref={dimButtons[0]}
        ></button>
        <button
          slot="hotspot-dim+X-Y"
          className="dim"
          data-position="1 -1 0"
          data-normal="1 0 0"
          ref={dimButtons[1]}
        ></button>
        <button
          slot="hotspot-dot+X-Y-Z"
          className="dot"
          data-position="1 -1 -1"
          data-normal="1 0 0"
          ref={dimButtons[2]}
        ></button>
        <button
          slot="hotspot-dim+X-Z"
          className="dim"
          data-position="1 0 -1"
          data-normal="1 0 0"
          ref={dimButtons[3]}
        ></button>
        <button
          slot="hotspot-dot+X+Y-Z"
          className="dot"
          data-position="1 1 -1"
          data-normal="0 1 0"
          ref={dimButtons[4]}
        ></button>
        <button
          slot="hotspot-dim+Y-Z"
          className="dim"
          data-position="0 -1 -1"
          data-normal="0 1 0"
          ref={dimButtons[5]}
        ></button>
        <button
          slot="hotspot-dot-X+Y-Z"
          className="dot"
          data-position="-1 1 -1"
          data-normal="0 1 0"
          ref={dimButtons[6]}
        ></button>
        <button
          slot="hotspot-dim-X-Z"
          className="dim"
          data-position="-1 0 -1"
          data-normal="-1 0 0"
          ref={dimButtons[7]}
        ></button>
        <button
          slot="hotspot-dot-X-Y-Z"
          className="dot"
          data-position="-1 -1 -1"
          data-normal="-1 0 0"
          ref={dimButtons[8]}
        ></button>
        <button
          slot="hotspot-dim-X-Y"
          className="dim"
          data-position="-1 -1 0"
          data-normal="-1 0 0"
          ref={dimButtons[9]}
        ></button>
        <button
          slot="hotspot-dot-X-Y+Z"
          className="dot"
          data-position="-1 -1 1"
          data-normal="-1 0 0"
          ref={dimButtons[10]}
        ></button>
        <svg
          id="dimLines"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          className="dimensionLineContainer"
          ref={dimLine}
        >
          <line className="dimensionLine"></line>
          <line className="dimensionLine"></line>
          <line className="dimensionLine"></line>
          <line className="dimensionLine"></line>
          <line className="dimensionLine"></line>
        </svg>
      </model-viewer>
      <div className="flex items-center justify-between mx-auto my-2 text-sm controls">
        {variants.length != 0 ? (
          <div className="flex items-center">
            <span>Variant:</span>
            <select
              id="variant"
              onChange={handleVariantChange}
              value={initialVariant}
              className="text-sm text-center border-none focus:border-transparent border-t-transparent border-x-transparent focus:ring-transparent focus:outline-none"
            >
              {variants.map((variant, index) => (
                <option key={index} value={variant.value}>
                  {variant.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="flex items-center mt-9"></div>
        )}

        <div className="flex items-center gap-2">
          <label htmlFor="show-dimensions">Dimensions:</label>
          <input
            id="show-dimensions"
            type="checkbox"
            checked={toggleDimension}
            onChange={showDimension}
            className="w-4 h-4 border-gray-300 rounded text-arfagreen focus:ring-arfagreen"
          ></input>
        </div>
      </div>
      {!addToCartBtn ? (
        <button
          className="absolute flex items-center justify-center p-2 transform -translate-x-1/2 border border-gray-300 rounded-full shadow-sm bottom-4 left-1/2"
          onClick={() => {
            handleArClick();
          }}
        >
          <CubeTransparentIcon className="w-5 h-5 text-black"></CubeTransparentIcon>
        </button>
      ) : (
        <div
          className="text-white cursor-pointer bg-arfagreen mt-4 w-fit mx-auto sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center"
          onClick={handleBtnClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#ffffff"
            className="w-4 h-4 -ms-2 me-2"
            id="Outline"
            viewBox="0 0 24 24"
            width="512"
            height="512"
          >
            <path d="M22.713,4.077A2.993,2.993,0,0,0,20.41,3H4.242L4.2,2.649A3,3,0,0,0,1.222,0H1A1,1,0,0,0,1,2h.222a1,1,0,0,1,.993.883l1.376,11.7A5,5,0,0,0,8.557,19H19a1,1,0,0,0,0-2H8.557a3,3,0,0,1-2.82-2h11.92a5,5,0,0,0,4.921-4.113l.785-4.354A2.994,2.994,0,0,0,22.713,4.077ZM21.4,6.178l-.786,4.354A3,3,0,0,1,17.657,13H5.419L4.478,5H20.41A1,1,0,0,1,21.4,6.178Z" />
            <circle cx="7" cy="22" r="2" />
            <circle cx="17" cy="22" r="2" />
          </svg>
          Add to cart
        </div>
      )}

      <QRCodeModal></QRCodeModal>
    </>
  );
}

export default ShowModel;
