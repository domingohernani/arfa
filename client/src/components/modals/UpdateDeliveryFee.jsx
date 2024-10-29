import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from "@headlessui/react";
import React, { Fragment, useState } from "react";
import deliveryImg from "../../assets/images/delivery.svg";
import { updateDeliveryFee } from "../../firebase/shop";
import { Tooltip } from "flowbite-react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

export const UpdateDeliveryFee = ({
  shopId,
  location,
  fee,
  freeDelivery,
  delivery,
  isOpen,
  close,
  updateResultMessage,
}) => {
  const [price, setPrice] = useState(fee);
  const [isFreeDelivery, setIsFreeDelivery] = useState(freeDelivery);
  const [doDeliver, setDoDeliver] = useState(delivery);

  const handlePriceChange = (value) => {
    const numbers = "0123456789";
    if (
      value.split("").every((char) => numbers.includes(char)) ||
      value === ""
    ) {
      setPrice(value);
    }
  };

  const handleConfirmBtn = async () => {
    const { message, isSuccess } = await updateDeliveryFee(
      shopId,
      location,
      parseInt(price),
      doDeliver,
      isFreeDelivery
    );

    if (!delivery && !isFreeDelivery && parseInt(price) === 0) {
      updateResultMessage("The fee amount must be greater than zero.", false);
      return;
    }

    if (updateResultMessage && isSuccess) {
      updateResultMessage(message, isSuccess);
      close();
    }
  };

  const handleCancel = () => {
    close();
  };

  const handleFreeDeliveryChange = (e) => {
    setIsFreeDelivery(e.target.checked);
    if (e.target.checked) {
      setPrice(0);
    }
  };

  const handleDoDeliverChange = (e) => {
    setDoDeliver(e.target.checked);
    if (!e.target.checked) {
      setIsFreeDelivery(false);
      setPrice(0);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment} className="z-40">
      <Dialog as="div" className="relative z-10" onClose={close}>
        <TransitionChild as="div">
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <TransitionChild
              as="div"
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
                    src={deliveryImg}
                    alt="Update Inventory"
                    className="w-auto mx-auto h-72"
                  />
                  Update Fee for {location}
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Set or adjust your delivery fees to match current shipping
                    costs for each region. This will help ensure accurate
                    charges for your customers.
                  </p>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="doDeliver"
                    checked={doDeliver}
                    onChange={handleDoDeliverChange}
                    className="w-4 h-4 border-gray-300 rounded text-arfagreen focus:ring-arfagreen"
                  />
                  <label
                    className="flex-1 min-w-0 ml-3 text-gray-500"
                    htmlFor="doDeliver"
                  >
                    Delivery Available
                  </label>
                  <Tooltip content="Enable if delivery is available for this location; otherwise, only pickup is offered.">
                    <QuestionMarkCircleIcon
                      className="w-4 h-4 ml-1 text-gray-300 cursor-pointer hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Tooltip>
                </div>

                {doDeliver && !isFreeDelivery && (
                  <div>
                    <label
                      htmlFor="fee"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Fee
                    </label>
                    <input
                      type="text"
                      id="fee"
                      value={price}
                      onChange={(e) => handlePriceChange(e.target.value)}
                      placeholder="Update delivery fee"
                      className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                    />
                  </div>
                )}

                {doDeliver && (
                  <div className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      id="isFree"
                      checked={isFreeDelivery}
                      onChange={handleFreeDeliveryChange}
                      className="w-4 h-4 border-gray-300 rounded text-arfagreen focus:ring-arfagreen"
                    />
                    <label
                      className="flex-1 min-w-0 ml-3 text-gray-500"
                      htmlFor="isFree"
                    >
                      Free delivery
                    </label>
                    <Tooltip content="Enable if this location offers free delivery">
                      <QuestionMarkCircleIcon
                        className="w-4 h-4 ml-1 text-gray-300 cursor-pointer hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Tooltip>
                  </div>
                )}

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
