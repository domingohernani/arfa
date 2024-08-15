import React, { useState, useEffect, useRef } from "react";
import arIcon from "../assets/icons/ar.svg";
import QRCodeModal from "./QRCodeModal";
import { useStore } from "../stores/useStore";
import { useNavigate, useParams } from "react-router-dom";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/20/solid";
import filter from "../assets/icons/filter.svg";
import { get3DModelUrl } from "../firebase/models";

function ShowMultiModel({ data }) {
  const modelViewerRef = useRef(null);
  const [variants, setVariants] = useState([]);
  const [initialVariant, setInitialVariant] = useState("");
  const [toggleDimension, setToggleDimension] = useState(true);
  const dimButtons = useRef(Array.from({ length: 11 }, () => useRef(null)));
  const dimLine = useRef(null);
  const updateIsQRCodeOpen = useStore((state) => state.updateIsQRCodeOpen);
  const [openBar, setOpenBar] = useState(false);
  const [modelUrls, setModelUrls] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const goAr = () => {
    handleArClick();
  };

  useEffect(() => {
    const modelViewer = modelViewerRef.current;

    const handleLoad = () => {
      const names = modelViewer.availableVariants;
      const variantOptions = names.map((name) => ({
        value: name,
        label: name,
      }));
      setVariants(variantOptions);

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

  useEffect(() => {
    const fetchModelUrls = async () => {
      try {
        const fetchPromises = data.map(async (furniture) => {
          return await get3DModelUrl(furniture.modelUrl);
        });
        const results = await Promise.all(fetchPromises);
        setModelUrls(results);
        modelViewerRef.current.src = results[0];
        setSelectedItem(data[0]);
      } catch (error) {
        console.error("Error fetching model URLs:", error);
      }
    };

    if (data && data.length > 0) {
      fetchModelUrls();
    }
  }, [data]);

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
    event.preventDefault();
    const variantName =
      event.target.value === "default" ? null : event.target.value;
    modelViewerRef.current.variantName = variantName;
    setInitialVariant(variantName);
  };

  const handleArClick = () => {
    const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
    if (!isMobileDevice) {
      updateIsQRCodeOpen(true);
    } else {
      modelViewerRef.current.activateAR();
    }
  };

  return (
    <>
      <div className="relative h-96">
        <model-viewer
          class="model"
          ar
          ar-modes="webxr scene-viewer quick-look"
          loading="eager"
          camera-controls
          touch-action="pan-y"
          auto-rotate
          src="https://firebasestorage.googleapis.com/v0/b/aria-16a4d.appspot.com/o/models%2Fsofa.glb?alt=media&token=9c363de4-5eff-4c0a-9622-b96f340cce3c"
          shadow-intensity="1"
          camera-orbit="0deg 90deg 2.9m"
          ref={modelViewerRef}
        >
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

          {!openBar && (
            <div
              className="absolute top-0 flex flex-col items-start gap-4 p-1 m-3 bg-white rounded-md cursor-pointer w-fit"
              onClick={() => {
                setOpenBar(!openBar);
              }}
            >
              <img src={filter} aria-hidden="true" className="w-5 h-5 " />
              <span className="text-sm">{selectedItem.name}</span>
            </div>
          )}

          <div
            className={`absolute top-0 left-0 z-50 flex bg-white opacity-70 flex-col w-3/4 h-full p-4 transform transition-transform duration-300 ${
              openBar ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-between">
              <div className="font-semibold">Furnitures</div>
              <div
                className="flex items-center justify-center p-1 rounded-md cursor-pointer w-fit"
                onClick={() => {
                  setOpenBar(!openBar);
                }}
              >
                <XMarkIcon className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              {data.map((item, index) => {
                return (
                  <p
                    className="text-sm truncate cursor-pointer"
                    key={index}
                    onClick={() => {
                      modelViewerRef.current.src = modelUrls[index];
                      setSelectedItem(data[index]);
                      setOpenBar(false);
                    }}
                  >
                    {item.name}
                  </p>
                );
              })}
            </div>
            <hr className="my-4 border-t border-dashed" />
            <div className="flex flex-col items-start justify-center gap-4 text-sm basis-1/5 controls">
              {variants.length !== 0 ? (
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
                />
              </div>
            </div>
          </div>
        </model-viewer>
        <div className="flex justify-end ">
          <button
            className="p-1 border border-gray-300 rounded-full shadow-sm"
            onClick={goAr}
          >
            <img src={arIcon} alt="ar" className="w-7 h-7" />
          </button>
        </div>
        <QRCodeModal></QRCodeModal>
      </div>
    </>
  );
}

export default ShowMultiModel;
