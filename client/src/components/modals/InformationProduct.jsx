import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from "@headlessui/react";
import React, { Fragment } from "react";
import {
  ChatBubbleLeftEllipsisIcon,
  ShareIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";

export const InformationProduct = ({ isOpen, close }) => {
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
              <DialogPanel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Information About Icons
                </DialogTitle>

                <div className="mt-4">
                  <div className="flex items-start gap-3">
                    <ChatBubbleLeftEllipsisIcon className="w-6 h-6 " />
                    <p className="text-sm text-gray-600">
                      <strong>Start a Message:</strong> Use this icon to start a
                      conversation with the seller directly.
                    </p>
                  </div>

                  <div className="flex items-start gap-3 mt-4">
                    <ShareIcon className="w-6 h-6 " />
                    <p className="text-sm text-gray-600">
                      <strong>Share Link:</strong> Click this icon to share the
                      link to this product with others.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-arfagreen hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-opacity-75"
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
