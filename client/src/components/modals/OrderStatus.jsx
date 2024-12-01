import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from "@headlessui/react";
import React, { Fragment, useState } from "react";
import {
  ShoppingCartIcon,
  CheckCircleIcon,
  CogIcon,
  TruckIcon,
  HomeIcon,
  XCircleIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { updateOrderStatus, uploadPOD } from "../../firebase/orders";
import { UploadPOD } from "./UploadPOD";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { getCancellations } from "../../firebase/cancellation";

const statusFlowOptions = {
  pickup: [
    {
      status: "Placed",
      icon: ShoppingCartIcon,
      description: "The customer has successfully placed the order.",
    },
    {
      status: "Cancelled",
      icon: XCircleIcon,
      description: "The order has been cancelled and will not proceed further.",
    },
    {
      status: "Confirmed",
      icon: CheckCircleIcon,
      description:
        "The seller has confirmed the order and processed the payment.",
    },
    {
      status: "Ready",
      icon: TruckIcon,
      description:
        "The order is ready for pick-up and is waiting for the customer to collect.",
    },
    {
      status: "Picked-up",
      icon: ArrowUpTrayIcon,
      description: "The customer picked up the order directly from the store.",
    },
  ],
  delivery: [
    {
      status: "Placed",
      icon: ShoppingCartIcon,
      description: "The customer has successfully placed the order.",
    },
    {
      status: "Cancelled",
      icon: XCircleIcon,
      description: "The order has been cancelled and will not proceed further.",
    },
    {
      status: "Confirmed",
      icon: CheckCircleIcon,
      description:
        "The seller has confirmed the order and processed the payment.",
    },
    {
      status: "Preparing",
      icon: CogIcon,
      description:
        "The seller is preparing the order, including packing or assembling the furniture.",
    },
    {
      status: "Ready",
      icon: TruckIcon,
      description:
        "The order is ready to be delivered and is waiting for the delivery schedule.",
    },
    {
      status: "Out for Delivery",
      icon: TruckIcon,
      description: "The order is on its way to the customer.",
    },
    {
      status: "Delivered",
      icon: HomeIcon,
      description:
        "The furniture has been delivered to the customer, and the order is now considered completed.",
    },
  ],
};

const getNextStatus = (currentStatus, statusFlow) => {
  const currentIndex = statusFlow.findIndex((s) => s.status === currentStatus);
  if (currentIndex === -1 || currentIndex === statusFlow.length - 1) {
    return null;
  }

  let step = 1;
  if (currentStatus === "Placed") {
    step = 2;
  }

  return statusFlow[currentIndex + step].status;
};

export const OrderStatus = ({
  refreshPage,
  isOpen,
  close,
  orderId,
  status,
  onDelivery,
  statusTimestamps,
  isOrderPage,
  podUrl = "",
}) => {
  const statusFlow = onDelivery
    ? statusFlowOptions.delivery
    : statusFlowOptions.pickup;
  const [isUploadPOD, setIsUploadPOD] = useState(false);
  const [imagePOD, setImagePOD] = useState(null);
  const [imagePODPreview, setPODPreview] = useState("");
  const [cancellations, setCancellations] = useState([]);

  const nextStatus = getNextStatus(status, statusFlow);

  const handleUpdateStatus = async () => {
    // Prevent updates if the current status is not allowed for transitions
    if (
      status === "Picked-up" ||
      status === "Delivered" ||
      status === "Cancelled"
    ) {
      toast.error("No further updates allowed.");
      return;
    }

    try {
      // Ensure "Cancelled" cannot be the next status
      if (nextStatus === "Cancelled") {
        toast.error("Cannot update the status to 'Cancelled'.");
        return;
      }

      // Check for Proof of Delivery (POD) if required
      if (
        ((nextStatus === "Delivered" && onDelivery) ||
          nextStatus === "Picked-up") &&
        !imagePOD
      ) {
        setIsUploadPOD(true);
        return;
      }

      // Update the status if there's a valid next step
      if (nextStatus) {
        if (nextStatus === "Delivered" || nextStatus === "Picked-up") {
          await uploadPOD(orderId, imagePOD);
        }
        await updateOrderStatus(orderId, nextStatus);

        if (refreshPage) {
          refreshPage();
        }

        toast.success(`Order status updated to: ${nextStatus}`);
      } else {
        toast.error("No further status to update.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update order status. Please try again.");
    }

    close();
  };
  const handleImagePOD = (file) => {
    if (file) {
      setPODPreview(URL.createObjectURL(file));
      setImagePOD(file);
    }
  };

  const handleCancel = () => {
    close();
  };

  const handleClosePOD = () => {
    setIsUploadPOD(false);
  };

  useEffect(() => {
    const fetchCancellations = async () => {
      try {
        const data = await getCancellations(orderId);
        setCancellations(data);
      } catch (error) {
        console.error("Error fetching cancellations:", error);
      }
    };

    if (orderId) {
      fetchCancellations();
    }
  }, [orderId]);

  return (
    <>
      <UploadPOD
        close={handleClosePOD}
        isOpen={isUploadPOD}
        upload={handleImagePOD}
        onDelivery={onDelivery}
      />
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
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {isOrderPage ? "Update Status" : "Order Status Logs"}
                  </DialogTitle>
                  <p className="mt-1 text-sm text-gray-500">
                    {isOrderPage
                      ? "Review the current order status and select the next stage in the process. This will help keep both the customer and the delivery team updated on the progress of the order."
                      : "This is a record of the completed stages in the order process, providing a history of updates for this transaction."}
                  </p>
                  <div>
                    <Tracking
                      currentStatus={status}
                      statusFlow={statusFlow}
                      statusTimestamps={statusTimestamps}
                      previewPODUrl={imagePODPreview}
                      podUrl={podUrl}
                      onDelivery={onDelivery}
                      cancellations={cancellations}
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-arfagreen hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-opacity-75"
                      onClick={handleUpdateStatus}
                    >
                      {status === "Cancelled" || !nextStatus
                        ? "No further updates"
                        : `Next: ${nextStatus}`}
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
    </>
  );
};

const Tracking = ({
  currentStatus,
  statusFlow,
  statusTimestamps,
  previewPODUrl,
  podUrl,
  onDelivery,
  cancellations,
}) => {
  const currentIndex = statusFlow.findIndex((s) => s.status === currentStatus);
  const statusesToShow = statusFlow.slice(0, currentIndex + 1).reverse();

  return (
    <section className="antialiased bg-white">
      <div className="max-w-screen-xl mx-auto 2xl:px-0">
        <div className="overflow-y-auto lg:flex h-96 lg:gap-8">
          <div className="grow sm:mt-8 lg:mt-0">
            {previewPODUrl && (
              <section>
                <p className="text-sm text-arfablack">
                  Proof of {onDelivery ? "Delivery" : "Pick-up"}
                </p>
                <img
                  src={previewPODUrl}
                  alt="Image Preview"
                  className="w-full h-auto"
                />
              </section>
            )}
            {podUrl && (
              <section>
                <a
                  className="mb-2 text-sm underline text-arfablack"
                  href={podUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Proof of {onDelivery ? "Delivery" : "Pick-up"}
                </a>
                <img
                  src={podUrl}
                  alt="Image Preview"
                  className="w-full h-auto"
                />
              </section>
            )}

            <div className="p-4 space-y-6 bg-white rounded-lg">
              <ol className="relative border-gray-200 ms-3 border-s dark:border-gray-700">
                {statusesToShow.map((item, index) => {
                  if (item.status !== "Cancelled") {
                    return (
                      <li key={index} className="mb-10 ms-6">
                        <span
                          className={`absolute -start-3 flex h-7 ${
                            item.status === currentStatus
                              ? "bg-arfagreen"
                              : "bg-gray-100"
                          } w-7 items-center justify-center rounded-full `}
                        >
                          <item.icon
                            className={` w-4 h-4 ${
                              item.status === currentStatus
                                ? "text-white"
                                : "text-green-400"
                            }`}
                          />
                        </span>
                        <p
                          className={`mb-0.5 text-sm ${
                            item.status === currentStatus
                              ? "font-medium text-arfagreen"
                              : "font-normal text-gray-900"
                          }`}
                        >
                          {item.status}
                        </p>
                        <p
                          className={`text-sm  ${
                            item.status === currentStatus
                              ? "text-arfablack font-medium"
                              : "text-gray-500 font-normal"
                          }`}
                        >
                          {item.description}
                        </p>
                        {statusTimestamps && statusTimestamps[item.status] && (
                          <p className="mt-1 text-xs text-gray-400">
                            Updated on:{" "}
                            {new Date(
                              statusTimestamps[item.status].seconds * 1000
                            ).toLocaleString()}
                          </p>
                        )}
                      </li>
                    );
                  } else if (currentStatus === "Cancelled") {
                    return (
                      <li key={index} className="mb-10 ms-6">
                        <span
                          className={`absolute -start-3 flex h-7 ${
                            item.status === currentStatus
                              ? "bg-arfagreen"
                              : "bg-gray-100"
                          } w-7 items-center justify-center rounded-full `}
                        >
                          <item.icon
                            className={` w-4 h-4 ${
                              item.status === currentStatus
                                ? "text-white"
                                : "text-green-400"
                            }`}
                          />
                        </span>
                        <p
                          className={`mb-0.5 text-sm ${
                            item.status === currentStatus
                              ? "font-medium text-arfagreen"
                              : "font-normal text-gray-900"
                          }`}
                        >
                          {item.status}
                        </p>
                        <p
                          className={`text-sm  ${
                            item.status === currentStatus
                              ? "text-arfablack font-medium"
                              : "text-gray-500 font-normal"
                          }`}
                        >
                          {item.description}
                        </p>
                        {cancellations && cancellations.reason && (
                          <p className={`text-sm text-black font-medium`}>
                            • Reason/s:{" "}
                            {cancellations.reason.map(
                              (reason, index) =>
                                `"${reason}"${
                                  index !== cancellations.reason.length - 1
                                    ? ", "
                                    : ""
                                }`
                            )}
                          </p>
                        )}
                        {statusTimestamps && statusTimestamps[item.status] && (
                          <p className="mt-1 text-xs text-gray-400">
                            Updated on:{" "}
                            {new Date(
                              statusTimestamps[item.status].seconds * 1000
                            ).toLocaleString()}
                          </p>
                        )}
                      </li>
                    );
                  }
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
