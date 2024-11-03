import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from "@headlessui/react";
import React, { Fragment } from "react";
import imageHotspot from "../../assets/images/image-hotspot.svg";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";

export const ImageHotspotExplain = ({ isOpen, close }) => {
  const handleClose = () => {
    close();
  };

  return (
    <Transition appear show={isOpen} as={Fragment} className="z-40">
      <Dialog as="div" className="relative z-10" onClose={close}>
        <TransitionChild as={Fragment}>
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
                <img
                  src={imageHotspot}
                  alt="Image Tracking"
                  className="w-full rounded-xl"
                />
                <div className="mt-2">
                  <p className="text-sm leading-relaxed text-gray-500">
                    With this image hotspot feature, you can highlight specific
                    products within a single image. Start by uploading an image
                    that showcases your products. Then, in "Mark" mode, click on
                    any area of the image to add hotspot markers for individual
                    items. Each hotspot marker allows you to display product
                    details like name, description, and price. When you're
                    ready, save the hotspots, and your customers will see these
                    markers interactively, making it easier for them to explore
                    and learn about your products directly on the image. This
                    feature enhances the shopping experience by visually
                    engaging customers with your offerings
                  </p>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-arfagreen hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-opacity-75"
                    onClick={handleClose}
                  >
                    <span>Ok, got it!</span>
                    <HandThumbUpIcon className="w-4 h-4" />
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
