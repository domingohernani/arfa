import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from "@headlessui/react";
import React, { Fragment, useState } from "react";
import deleteImg from "../../assets/images/delete-product.jpg";

export const DeleteMultipleProductModal = ({
  isOpen,
  close,
  name,
  deleteProduct,
}) => {
  const [inputValue, setInputValue] = useState(""); // Track input value

  const handleConfirmBtn = async () => {
    if (deleteProduct) {
      deleteProduct();
    }
    close();
  };

  const handleCancelBtn = () => {
    close();
    setInputValue(""); // Reset input when cancel is clicked
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
                  className="text-lg font-medium leading-6 text-center text-gray-900"
                >
                  <img
                    src={deleteImg}
                    alt="Delete Product"
                    className="w-auto mx-auto h-72"
                  />
                  Are you sure you want to delete{" "}
                  <span className="underline">{name || "these items"}?</span>
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm leading-relaxed text-center text-gray-500">
                    This action cannot be undone. Please confirm if you want to
                    proceed with deleting the selected items. Once deleted,
                    these items will be permanently removed from your inventory.
                  </p>
                </div>

                {/* Input Field */}
                <div className="mt-4">
                  <label
                    htmlFor="confirmation-text"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Type{" "}
                    <span className="font-semibold">"Delete Products"</span> to
                    confirm
                  </label>
                  <input
                    type="text"
                    id="confirmation-text"
                    className="block w-full p-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-arfagreen focus:border-arfagreen"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>

                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    className={`inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md ${
                      inputValue === "Delete Products"
                        ? "bg-arfagreen hover:bg-green-600"
                        : "bg-gray-300 cursor-not-allowed"
                    } focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-opacity-75`}
                    onClick={handleConfirmBtn}
                    disabled={inputValue !== "Delete Products"} // Disable unless correct text is entered
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-opacity-75"
                    onClick={handleCancelBtn}
                  >
                    Cancel
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
