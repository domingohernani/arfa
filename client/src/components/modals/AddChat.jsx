import React, { useState, useEffect, Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from "@headlessui/react";
import toast from "react-hot-toast";

export const AddChat = ({ isOpen, close, furnitureId, sellerId }) => {
  const handleSubmit = async () => {};

  const handleCancel = () => {
    close();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
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
              <DialogPanel className="w-full max-w-2xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {furnitureId} : ${sellerId}
                </DialogTitle>

                {/* Action Buttons */}
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 py-2 ml-2 text-sm font-medium text-white rounded-lg bg-arfagreen hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Submit
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
