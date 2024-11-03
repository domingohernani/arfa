import React, { useEffect, useState } from "react";
import HotspotCard from "../../components/dynamic/HotspotCard";
import { formatToPeso } from "../../components/globalFunctions";
import toast from "react-hot-toast";
import { Tooltip } from "flowbite-react";
import {
  QuestionMarkCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { saveImageHotspotData, getImageHotspotData } from "../../firebase/shop";
import { useStore } from "../../stores/useStore";
import imageHotspot from "../../assets/images/image-hotspot.svg";
import { ImageHotspotExplain } from "../../components/modals/ImageHotspotExplain";

const SellerImageHotspot = () => {
  const [isMarkMode, setIsMarkMode] = useState(true);
  const [hotspots, setHotspots] = useState([]);
  const [tempHotspot, setTempHotspot] = useState({ top: "0%", left: "0%" });
  const [visibleContent, setVisibleContent] = useState(null);
  const [isHoveringHotspot, setIsHoveringHotspot] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const { loggedUser } = useStore();
  const [isHelpModal, setHelpModal] = useState(false);

  // Fetch existing hotspot data on component mount
  useEffect(() => {
    const fetchHotspotData = async () => {
      const result = await getImageHotspotData(loggedUser.userId);
      if (result.success && result.data) {
        setUploadedImage(result.data.imageUrl); // Set the uploaded image URL
        setHotspots(result.data.hotspots); // Set the existing hotspots
      } else {
        console.log(result.message || result.error);
      }
    };

    fetchHotspotData();
  }, [loggedUser.userId]);

  // Handle image upload and generate preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result); // Set image preview
      };
      reader.readAsDataURL(file);
      setHotspots([]); // Reset hotspots if a new image is uploaded
    }
  };

  const handleMouseMove = (e) => {
    if (isMarkMode && !isHoveringHotspot && uploadedImage) {
      const rect = e.target.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setTempHotspot({ top: `${y}%`, left: `${x}%` });
    }
  };

  // Add a new hotspot in mark mode
  const handleClick = () => {
    if (isMarkMode && !isHoveringHotspot) {
      setIsModalOpen(true);
    }
  };

  const handleSaveCard = (furniture) => {
    const isAlreadyMarked = hotspots.some(
      (hotspot) => hotspot.furniture.id === furniture.id
    );

    if (isAlreadyMarked) {
      toast.error("This furniture is already marked as a hotspot.");
      return;
    }

    setHotspots((prevHotspots) => [
      ...prevHotspots,
      {
        id: prevHotspots.length + 1,
        top: tempHotspot.top,
        left: tempHotspot.left,
        furniture,
      },
    ]);

    setIsModalOpen(false);
  };

  const handleHotspotClick = (id) => {
    if (!isMarkMode) {
      const updatedHotspots = hotspots.filter((hotspot) => hotspot.id !== id);
      setHotspots(updatedHotspots);

      if (updatedHotspots.length === 0) {
        setIsHoveringHotspot(false);
      }
    }
  };

  const handleMouseEnter = (content) => {
    setVisibleContent(content);
    setIsHoveringHotspot(true);
  };

  const handleMouseLeave = () => {
    setVisibleContent(null);
    setIsHoveringHotspot(false);
  };

  const handleHotspotSave = async () => {
    if (!uploadedImage) {
      toast.error("Please upload an image before saving hotspots.");
      return;
    }

    if (hotspots.length === 0) {
      toast.error("Please add at least one hotspot marker before saving.");
      return;
    }

    try {
      const file = document.querySelector('input[type="file"]').files[0];
      const result = await saveImageHotspotData(
        loggedUser.userId,
        file,
        hotspots,
        uploadedImage
      );

      if (result.success) {
        toast.success("Hotspot data saved successfully!");
        console.log("Image URL:", result.imageUrl);
      } else {
        toast.error(`Failed to save: ${result.error}`);
      }
    } catch (error) {
      console.error("Error saving hotspots:", error);
      toast.error("Failed to save hotspots.");
    }
  };

  const handleCloseHelp = () => {
    setHelpModal(false);
  };

  return (
    <section className="p-5">
      <ImageHotspotExplain close={handleCloseHelp} isOpen={isHelpModal} />
      {/* Image Upload Section */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center justify-between w-fit">
            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-900">
              Upload an Image
              <Tooltip content="Upload a photo that displays the products you want to showcase">
                <QuestionMarkCircleIcon
                  className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                  aria-hidden="true"
                />
              </Tooltip>
            </label>
          </div>
          <input
            type="file"
            onChange={handleImageUpload}
            className={`block w-min pr-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-arfagreen focus:border-arfagreen cursor-pointer`}
            accept=".jpg, .jpeg, .png"
          />
        </div>
        <div
          className="flex items-center gap-2 underline cursor-pointer text-arfablack"
          onClick={() => {
            setHelpModal(true);
          }}
        >
          <span>Help</span>
          <InformationCircleIcon className="w-4 h-4" />
        </div>
      </div>

      {/* Preview Section */}
      {uploadedImage ? (
        <>
          <section className="flex items-center gap-2 mb-4">
            <section className="flex items-center gap-2 border border-gray-300 rounded-md bg-arfagray w-fit">
              <button
                title="Use to mark the furniture"
                onClick={() => setIsMarkMode(true)}
                className={`flex items-center justify-center gap-1 px-2 py-2 text-sm font-medium text-center border ${
                  isMarkMode ? "bg-gray-200" : "hover:bg-gray-200"
                } text-arfablack`}
              >
                {/* Pencil icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="512"
                  height="512"
                  className="w-4 h-4"
                >
                  <path d="M24,23c0,.55-.45,1-1,1H5c-.55,0-1-.45-1-1s.45-1,1-1H23c.55,0,1,.45,1,1ZM3.41,20l-1.71,1.71c-.2,.2-.45,.29-.71,.29s-.51-.1-.71-.29c-.39-.39-.39-1.02,0-1.41l1.71-1.71v-4.35c0-1.71,.73-3.34,2.01-4.48L14.17,1.1c1.77-1.54,4.46-1.44,6.12,.22l.39,.39c1.66,1.66,1.76,4.36,.22,6.13l-8.65,10.14c-1.15,1.29-2.78,2.02-4.49,2.02H3.41Zm4.35-2c.25,0,.5-.03,.75-.08l-4.43-4.43c-.05,.24-.08,.49-.08,.75v3.76h3.76Zm-2.44-6.73c-.11,.1-.2,.22-.3,.33l5.38,5.38c.12-.1,.24-.2,.35-.32L19.38,6.53c.86-.99,.81-2.49-.11-3.41l-.39-.39c-.92-.92-2.42-.98-3.41-.12L5.32,11.27Z" />
                </svg>
              </button>
              <button
                title="Use to delete the marker"
                onClick={() => setIsMarkMode(false)}
                className={`flex items-center justify-center gap-1 px-2 py-2 text-sm font-medium text-center border ${
                  !isMarkMode ? "bg-gray-200" : "hover:bg-gray-200"
                } text-arfablack`}
              >
                {/* Trash icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="512"
                  height="512"
                  className="w-4 h-4"
                >
                  <path d="m23,21h-8.633l8.174-8.205c1.939-1.946,1.939-5.113,0-7.06l-3.254-3.265c-.945-.948-2.203-1.47-3.541-1.47s-2.597.522-3.54,1.468L1.459,13.175c-1.939,1.946-1.939,5.113,0,7.059l1.583,1.589c.745.748,1.777,1.177,2.834,1.177h17.124c.553,0,1-.448,1-1s-.447-1-1-1ZM13.62,3.882c.567-.569,1.322-.882,2.126-.882s1.558.313,2.125.882l3.254,3.265c1.163,1.167,1.163,3.068,0,4.236l-4.97,4.989-7.509-7.534,4.974-4.955Zm-7.744,17.118c-.536,0-1.039-.209-1.417-.588l-1.584-1.589c-1.163-1.167-1.163-3.067-.002-4.232l4.357-4.341,7.514,7.54-3.199,3.211h-5.669Z" />
                </svg>
              </button>
            </section>
            <div className="flex justify-between">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-arfagreen hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-opacity-75"
                onClick={handleHotspotSave}
              >
                Save
              </button>
            </div>
          </section>

          <section className="flex flex-col w-full gap-4 lg:flex-row">
            {/* Image with Hotspot Marking */}
            <div
              className="border"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "800px",
              }}
              onMouseMove={handleMouseMove}
              onClick={handleClick}
            >
              <img
                src={uploadedImage}
                alt="Uploaded Preview"
                style={{ width: "100%" }}
              />

              {/* Render Hotspots */}
              {hotspots.map((hotspot) => (
                <div
                  // title={`Click this cicle to visit '${visibleContent?.name}'`}
                  className="flex items-center justify-center bg-gray-600 border-2 border-gray-700"
                  key={hotspot.id}
                  style={{
                    position: "absolute",
                    top: hotspot.top,
                    left: hotspot.left,
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseEnter={() => handleMouseEnter(hotspot.furniture)}
                  onMouseLeave={handleMouseLeave}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleHotspotClick(hotspot.id);
                  }}
                >
                  <div className="w-3 h-3 bg-white rounded-full opacity-100"></div>

                  {/* Tooltip positioned above the hotspot */}
                  {visibleContent &&
                    visibleContent.id === hotspot.furniture.id && (
                      <div
                        className="text-sm text-black bg-white opacity-100"
                        style={{
                          position: "absolute",
                          bottom: "100%",
                          left: "50%",
                          transform: "translate(-50%, -10px)",
                          padding: "10px",
                          borderRadius: "5px",
                          width: "200px",
                          marginBottom: "5px",
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                          zIndex: 10,
                        }}
                      >
                        <div
                          className="overflow-hidden font-medium text-arfagreen whitespace-nowrap text-ellipsis"
                          style={{ maxWidth: "200px" }}
                        >
                          {visibleContent.name}
                        </div>
                        <div
                          className="overflow-hidden text-xs whitespace-nowrap text-ellipsis"
                          style={{ maxWidth: "200px" }}
                        >
                          {visibleContent.description}
                        </div>
                        <div className="text-xl font-semibold">
                          {visibleContent.isSale
                            ? formatToPeso(visibleContent.discountedPrice)
                            : formatToPeso(visibleContent.price)}
                        </div>
                      </div>
                    )}
                </div>
              ))}

              {/* Temporary Hotspot Preview */}
              {!isHoveringHotspot && isMarkMode && (
                <div
                  style={{
                    position: "absolute",
                    top: tempHotspot.top,
                    left: tempHotspot.left,
                    width: "20px",
                    height: "20px",
                    backgroundColor: "blue",
                    borderRadius: "50%",
                    opacity: 0.5,
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>

            {/* Preview section of marked furnitures */}
            <div className="flex flex-col flex-1">
              {hotspots.map((hotspot) => (
                <div key={hotspot.id} className="flex flex-col gap-1 ">
                  <div
                    className="overflow-hidden font-medium text-arfagreen whitespace-nowrap text-ellipsis"
                    style={{ maxWidth: "400px" }}
                  >
                    {hotspot.furniture.name}
                  </div>
                  <div className="text-sm" style={{ maxWidth: "400px" }}>
                    {hotspot.furniture.id}
                  </div>
                  <div
                    className="overflow-hidden text-sm whitespace-nowrap text-ellipsis"
                    style={{ maxWidth: "500px" }}
                  >
                    {hotspot.furniture.description}
                  </div>
                  <div className="text-xl font-semibold">
                    {hotspot.furniture.isSale
                      ? formatToPeso(hotspot.furniture.discountedPrice)
                      : formatToPeso(hotspot.furniture.price)}
                  </div>
                  <hr className="my-4 border-t border-gray-300 border-dashed" />
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <p className="text-sm text-gray-600">
          Please upload an image to start marking hotspots.
        </p>
      )}
    </section>
  );
};

export default SellerImageHotspot;
