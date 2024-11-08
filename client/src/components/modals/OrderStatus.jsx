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
import { updateOrderStatus } from "../../firebase/orders";
import { UploadPOD } from "./UploadPOD";
import toast from "react-hot-toast";

const statusFlowOptions = {
    pickup: [
        { status: "Placed", icon: ShoppingCartIcon, description: "The customer has successfully placed the order." },
        { status: "Confirmed", icon: CheckCircleIcon, description: "The seller has confirmed the order and processed the payment." },
        { status: "Ready", icon: TruckIcon, description: "The order is ready for pick-up and is waiting for the customer to collect." },
        { status: "Picked-up", icon: ArrowUpTrayIcon, description: "The customer picked up the order directly from the store." },
    ],
    delivery: [
        { status: "Placed", icon: ShoppingCartIcon, description: "The customer has successfully placed the order." },
        { status: "Confirmed", icon: CheckCircleIcon, description: "The seller has confirmed the order and processed the payment." },
        { status: "Preparing", icon: CogIcon, description: "The seller is preparing the order, including packing or assembling the furniture." },
        { status: "Ready", icon: TruckIcon, description: "The order is ready to be delivered and is waiting for the delivery schedule." },
        { status: "Out for Delivery", icon: TruckIcon, description: "The order is on its way to the customer." },
        { status: "Delivered", icon: HomeIcon, description: "The furniture has been delivered to the customer, and the order is now considered completed." },
    ]
};

const getNextStatus = (currentStatus, statusFlow) => {
    const currentIndex = statusFlow.findIndex((s) => s.status === currentStatus);
    if (currentIndex === -1 || currentIndex === statusFlow.length - 1) {
        return null;
    }
    return statusFlow[currentIndex + 1].status;
};

export const OrderStatus = ({ refreshPage, isOpen, close, orderId, status, onDelivery, statusTimestamps, isOrderPage }) => {
    const statusFlow = onDelivery ? statusFlowOptions.delivery : statusFlowOptions.pickup;
    const [isUploadPOD, setIsUploadPOD] = useState(false);
    const [imagePOD, setImagePOD] = useState(null);
    const [imagePODPreview, setPODPreview] = useState("");

    const nextStatus = getNextStatus(status, statusFlow);

    const handleUpdateStatus = async () => {
        if (status === "Picked-up" || status === "Delivered") {
            toast.info("No further updates allowed.");
            return;
        }

        try {
            if (((nextStatus === "Delivered" && onDelivery) || (nextStatus === "Picked-up")) && !imagePOD) {
                setIsUploadPOD(true);
                return;
            }
            if (nextStatus) {
                await updateOrderStatus(orderId, nextStatus);
                if (refreshPage) {
                    refreshPage();
                }
                toast.success(`Order status updated to: ${nextStatus}`);
                console.log(`Order ${orderId} status updated to: ${nextStatus}`);
            } else {
                toast.info("No further status to update.");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update order status. Please try again.");
        }
        close();
    }
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
    }

    return (
        <>
            <UploadPOD close={handleClosePOD} isOpen={isUploadPOD} upload={handleImagePOD} onDelivery={onDelivery} />
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
                                    <p className="text-sm text-gray-500 mt-1">
                                        {isOrderPage
                                            ? "Review the current order status and select the next stage in the process. This will help keep both the customer and the delivery team updated on the progress of the order."
                                            : "This is a record of the completed stages in the order process, providing a history of updates for this transaction."}
                                    </p>
                                    <div>
                                        <Tracking currentStatus={status} statusFlow={statusFlow} statusTimestamps={statusTimestamps} previewPODUrl={imagePODPreview} />
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-arfagreen hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-opacity-75"
                                            onClick={handleUpdateStatus}
                                        >
                                            {nextStatus ? `Next: ${nextStatus}` : "No further updates"}
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

const Tracking = ({ currentStatus, statusFlow, statusTimestamps, previewPODUrl }) => {
    const currentIndex = statusFlow.findIndex((s) => s.status === currentStatus);
    const statusesToShow = statusFlow.slice(0, currentIndex + 1).reverse();

    return (
        <section className="bg-white antialiased">
            <div className="mx-auto max-w-screen-xl 2xl:px-0">
                <div className="lg:flex h-96 overflow-y-auto lg:gap-8">
                    <div className="grow sm:mt-8 lg:mt-0">
                        {
                            previewPODUrl && <section>
                                <p className="text-sm text-arfablack">
                                    Proof of Delivery
                                </p>
                                <img src={previewPODUrl} alt="Image Preview" className="w-full h-auto" />
                            </section>
                        }
                        <div className="space-y-6 rounded-lg bg-white p-4">
                            <ol className="relative ms-3 border-s border-gray-200 dark:border-gray-700">
                                {statusesToShow.map((item, index) => (
                                    <li key={index} className="mb-10 ms-6">
                                        <span className={`absolute -start-3 flex h-7 ${item.status === currentStatus ? "bg-arfagreen" : "bg-gray-100"} w-7 items-center justify-center rounded-full `}>
                                            <item.icon className={` w-4 h-4 ${item.status === currentStatus ? "text-white" : "text-green-400"}`} />
                                        </span>
                                        <p className={`mb-0.5 text-sm ${item.status === currentStatus ? "font-medium text-arfagreen" : "font-normal text-gray-900"}`}>
                                            {item.status}
                                        </p>
                                        <p className={`text-sm  ${item.status === currentStatus ? "text-arfablack font-medium" : "text-gray-500 font-normal"}`}>
                                            {item.description}
                                        </p>
                                        {statusTimestamps && statusTimestamps[item.status] && (
                                            <p className="text-xs text-gray-400 mt-1">
                                                Updated on: {new Date(statusTimestamps[item.status].seconds * 1000).toLocaleString()}
                                            </p>
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
