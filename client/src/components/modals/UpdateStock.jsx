import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from "@headlessui/react";
import React, { Fragment, useState } from "react";
import inventory from "../../assets/images/inventory.svg";
import { useEffect } from "react";
import { addStock } from "../../firebase/stock";

export const UpdateStock = ({
  id,
  currentStock,
  isOpen,
  close,
  updateResultMessage,
}) => {
  const [stock, setStock] = useState(currentStock);
  const [updateDateTime, setUpdateDateTime] = useState("");

  const handleConfirmBtn = async () => {
    let stockValue = parseInt(stock);
    let newQuantity = stockValue;
    let quantityChanged = stockValue - currentStock;

    let result = "";
    if (stock) {
      result = await addStock(id, newQuantity, currentStock, quantityChanged);
    }
    if (updateResultMessage && stock) {
      if (result) {
        updateResultMessage("Stock updated successfully", true);
      } else {
        updateResultMessage(
          "Error updating stock. Something went wrong",
          false
        );
      }
    }
    close();
  };

  const handleCancel = () => {
    close();
  };

  const handleUpdateDateTimeChange = (dateTime) => {
    setUpdateDateTime(dateTime);
  };

  const handleStockChange = (value) => {
    const numbers = "0123456789";
    if (
      value.split("").every((char) => numbers.includes(char)) ||
      value === ""
    ) {
      setStock(value);
    }
  };

  useEffect(() => {
    const currentDateTime = new Date();

    const year = currentDateTime.getFullYear();
    const month = String(currentDateTime.getMonth() + 1).padStart(2, "0");
    const day = String(currentDateTime.getDate()).padStart(2, "0");
    const hours = String(currentDateTime.getHours()).padStart(2, "0");
    const minutes = String(currentDateTime.getMinutes()).padStart(2, "0");

    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

    setUpdateDateTime(formattedDateTime);
  }, []);

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
                    src={inventory}
                    alt="Update Inventory"
                    className="w-auto mx-auto h-72"
                  />
                  Update Stock
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Update your stock to ensure accurate levels. Changes will
                    reflect immediately in your product listing
                  </p>
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="quantity"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Quantity
                  </label>
                  <input
                    type="text"
                    id="quantity"
                    value={stock}
                    onChange={(e) => handleStockChange(e.target.value)}
                    placeholder="Update stock level"
                    className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="updateDateTime"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Update Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    id="updateDateTime"
                    value={updateDateTime}
                    onChange={(e) => handleUpdateDateTimeChange(e.target.value)} // Updated handler for datetime change
                    placeholder="Select update date and time"
                    className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-arfagreen hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-opacity-75"
                    onClick={handleConfirmBtn}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-opacity-75"
                    onClick={handleCancel}
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
