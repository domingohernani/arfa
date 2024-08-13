import React, { useEffect, useState } from "react";
import { useStore } from "../stores/useStore";
import { Modal } from "flowbite-react";
import QRCode from "qrcode";

const QRCodeModal = () => {
  const isQRCodeOpen = useStore((state) => state.isQRCodeOpen);
  const updateIsQRCodeOpen = useStore((state) => state.updateIsQRCodeOpen);

  const [qrcodeSrc, setQrcodeSrc] = useState("");

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const currentUrl = `${window.location.origin}${window.location.pathname}${window.location.search}${window.location.hash}/open-ar`;
        const qrCode = await QRCode.toDataURL(currentUrl);
        setQrcodeSrc(qrCode);
      } catch (error) {
        console.error("Failed to generate QR code:", error);
      }
    };

    generateQRCode();
  }, [window.location]);

  const handleClose = () => updateIsQRCodeOpen(false);

  return (
    <Modal
      show={isQRCodeOpen}
      size="2xl"
      popup
      onClose={handleClose}
      position="center"
    >
      <Modal.Body>
        <div className="flex items-center h-80">
          <div className="flex flex-col gap-1 pl-5 basis-3/6">
            <h3 className="text-base font-bold font-mediumtext-gray-900 dark:text-white">
              Unlock Augmented Reality!
            </h3>
            <p className="text-sm">
              Scan this QR code to experience immersive AR content. Make sure
              you're in a well-lit area with ample space for the best
              experience.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center text-sm font-medium text-gray-500 bg-white hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
            >
              Cancel
            </button>
          </div>
          {qrcodeSrc ? (
            <div className="flex items-center justify-center w-1/2 bg-red-300">
              <img src={qrcodeSrc} alt="QR Code" className="w-full h-full " />
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <p>QR Code Unavailable</p>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default QRCodeModal;
