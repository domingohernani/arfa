import React, { useState, Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from "@headlessui/react";

const CancelOrder = ({ isOpen, close, orderId, onCancelOrder }) => {
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [customReason, setCustomReason] = useState(""); // State for custom reason

  const handleCancel = () => {
    close();
  };

  const handleSubmit = async () => {
    if (selectedReasons.length === 0 && !customReason.trim()) {
      alert("Please provide at least one reason for cancellation.");
      return;
    }

    const reasonsArray = [...selectedReasons];
    if (customReason.trim()) {
      reasonsArray.push(customReason.trim());
    }

    if (onCancelOrder) {
      onCancelOrder(orderId, reasonsArray);
    }
    close();
  };

  const handleCheckboxChange = (reason) => {
    setSelectedReasons(
      (prev) =>
        prev.includes(reason)
          ? prev.filter((r) => r !== reason) // Remove if already selected
          : [...prev, reason] // Add if not selected
    );
  };

  const cancellationReasons = [
    "Changed my mind",
    "Found a better deal",
    "Incorrect order details",
    "Product no longer needed",
  ];

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
              <DialogPanel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Cancel Order
                </DialogTitle>

                <div className="mt-4">
                  <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside">
                    <li>
                      Are you sure you want to cancel this order? This action
                      cannot be undone.
                    </li>
                    <li>
                      Refunds are typically processed within 1-3 business days
                      after cancellation.
                    </li>
                  </ul>
                </div>

                {/* Reasons for Cancellation */}
                <div className="mt-4">
                  <p className="block mb-2 text-sm font-medium text-gray-900">
                    Reasons for Cancellation
                  </p>
                  <div className="space-y-2">
                    {cancellationReasons.map((reason, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`reason-${index}`}
                          className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                          checked={selectedReasons.includes(reason)}
                          onChange={() => handleCheckboxChange(reason)}
                        />
                        <label
                          htmlFor={`reason-${index}`}
                          className="ml-2 text-sm font-medium text-gray-900"
                        >
                          {reason}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Custom Reason */}
                <div className="mt-4">
                  <label
                    htmlFor="custom-reason"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Additional Reason (Optional)
                  </label>
                  <input
                    type="text"
                    id="custom-reason"
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    placeholder="e.g., Delivery delay, etc."
                    className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                  >
                    No, Keep Order
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 py-2 ml-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Yes, Cancel Order
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

export default CancelOrder;
