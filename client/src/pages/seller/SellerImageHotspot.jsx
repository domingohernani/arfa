import React, { useState } from "react";
import HotspotCard from "../../components/dynamic/HotspotCard";

const SellerImageHotspot = () => {
  const [isMarkMode, setIsMarkMode] = useState(true);
  const [hotspots, setHotspots] = useState([]);

  const [tempHotspot, setTempHotspot] = useState({ top: "0%", left: "0%" });
  const [visibleContent, setVisibleContent] = useState(null);
  const [isHoveringHotspot, setIsHoveringHotspot] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(true);

  // Update temporary hotspot position on mouse move
  const handleMouseMove = (e) => {
    if (isMarkMode && !isHoveringHotspot) {
      const rect = e.target.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setTempHotspot({ top: `${y}%`, left: `${x}%` });
    }
  };

  // Add a new hotspot in mark mode
  const handleClick = () => {
    if (isMarkMode && !isHoveringHotspot) {
      setHotspots([
        ...hotspots,
        {
          id: hotspots.length + 1,
          top: tempHotspot.top,
          left: tempHotspot.left,
          content: `Hotspot ${hotspots.length + 1} content`,
        },
      ]);
    }
  };

  // Remove a hotspot in erase mode
  const handleHotspotClick = (id) => {
    if (!isMarkMode) {
      const updatedHotspots = hotspots.filter((hotspot) => hotspot.id !== id);
      setHotspots(updatedHotspots);

      // Reset isHoveringHotspot if no hotspots remain
      if (updatedHotspots.length === 0) {
        setIsHoveringHotspot(false);
      }
    }
  };
  // Show content on hover
  const handleMouseEnter = (content) => {
    setVisibleContent(content);
    setIsHoveringHotspot(true);
  };

  const handleMouseLeave = () => {
    setVisibleContent(null);
    setIsHoveringHotspot(false);
  };

  const handleSaveCard = (furniture) => {
    console.log(furniture);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleHotspotSave = () => {
    // log all the hotspot with the furniture object associated with it
  };

  return (
    <section>
      <HotspotCard
        handleSaveCard={handleSaveCard}
        isOpen={isModalOpen}
        close={handleModalClose}
      />
      <section className="flex items-center gap-2">
        <div className="inline">Tools: </div>
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
      </section>

      <section>
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "600px",
            margin: "auto",
          }}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        >
          <img
            src="https://www.urbanconcepts.ph/wp/wp-content/uploads/2024/07/Top-7-Sustainable-Furniture-Materials-for-Your-Home.jpg"
            alt="Background"
            style={{ width: "100%" }}
          />

          {/* Fixed Hotspots */}
          {hotspots.map((hotspot) => (
            <div
              className="bg-lime-500"
              key={hotspot.id}
              style={{
                position: "absolute",
                top: hotspot.top,
                left: hotspot.left,
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                cursor: "pointer",
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={() => handleMouseEnter(hotspot.content)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => {
                e.stopPropagation();
                handleHotspotClick(hotspot.id);
              }}
            />
          ))}

          {/* Moving Hotspot - Show even if no fixed hotspots */}
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

          {/* Tooltip Content */}
          {visibleContent && (
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              {visibleContent}
            </div>
          )}
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-arfagreen hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-opacity-75"
            onClick={handleHotspotSave}
          >
            Save
          </button>
        </div>
      </section>
    </section>
  );
};

export default SellerImageHotspot;
