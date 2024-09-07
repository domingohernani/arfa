import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";

const PictureFullScreen = ({ imageUrl, setState }) => {
  const [isVisible, setIsVisible] = useState(false);

  const onClose = () => {
    setIsVisible(false);
    setTimeout(() => setState(false), 300); // Delay closing to match the transition duration
  };

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10); // Ensure transition runs on mount
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <img
        src={imageUrl}
        alt="Full screen view"
        className="max-w-full max-h-full"
      />
      <XMarkIcon
        onClick={onClose}
        className="absolute w-6 h-6 text-xl text-white cursor-pointer top-4 right-4"
      />
    </div>
  );
};

export default PictureFullScreen;
