import { useState } from "react";
import toast from "react-hot-toast";

export const CustomHoverCopyCell = ({ value }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleCellClick = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const handleCopyClick = async () => {
    if (isVisible) {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(value);
          toast.success(`Copied "${value}" to clipboard!`);
        } else {
          toast.error("Clipboard API is not available in this browser.");
        }
      } catch (err) {
        toast.error("Failed to copy.");
      }
    }
  };

  return (
    <>
      <div
        className="relative"
        onClick={handleCellClick}
        onMouseLeave={handleMouseLeave}
      >
        <span>{value}</span>
        <div
          className={`absolute top-0 left-0 z-50 p-2 text-xs text-white bg-gray-800 rounded shadow-lg cursor-pointer w-fit transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleCopyClick}
        >
          {`Copy`}
        </div>
      </div>
    </>
  );
};
