import {
    Dialog,
    Transition,
    TransitionChild,
    DialogTitle,
    DialogPanel,
} from "@headlessui/react";
import React, { Fragment } from "react";
import {
    ShoppingCartIcon,
    CheckCircleIcon,
    CogIcon,
    TruckIcon,
    HomeIcon,
    XCircleIcon,
    ArrowUpTrayIcon,
    ArrowPathIcon
} from "@heroicons/react/24/outline";

const statusFlow = [
    { status: "Placed", icon: ShoppingCartIcon, description: "The customer has successfully placed the order." },
    { status: "Confirmed", icon: CheckCircleIcon, description: "The seller has confirmed the order and processed the payment." },
    { status: "Preparing for Delivery", icon: CogIcon, description: "The seller is preparing the order, including packing or assembling the furniture." },
    { status: "Ready for Delivery", icon: TruckIcon, description: "The order is ready to be delivered and is waiting for the delivery schedule." },
    { status: "Out for Delivery", icon: TruckIcon, description: "The order is on its way to the customer." },
    { status: "Delivered", icon: HomeIcon, description: "The furniture has been delivered to the customer, and the order is now considered completed." },
    { status: "Picked-up", icon: ArrowUpTrayIcon, description: "The customer picked up the order directly from the store." },
    { status: "Cancelled", icon: XCircleIcon, description: "The order was canceled by either the customer or the seller before delivery." },
];

export const OrderStatus = ({ isOpen, close, orderId, status }) => {
    const handleUpdateStatus = () => {
        close();
        try {
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
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
                                <DialogTitle
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Update Status
                                </DialogTitle>
                                <div className="mt-2">
                                    <Tracking currentStatus={status} />
                                </div>
                                <div className="flex justify-between mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-arfagreen hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-opacity-75"
                                        onClick={handleUpdateStatus}
                                    >
                                        Update
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

const Tracking = ({ currentStatus }) => {
    const currentIndex = statusFlow.findIndex((s) => s.status === currentStatus);
    const statusesToShow = statusFlow.slice(0, currentIndex + 1).reverse();


    return (
        <section className="bg-white antialiased">
            <div className="mx-auto max-w-screen-xl 2xl:px-0">
                <div className="lg:flex h-96 overflow-y-scroll lg:gap-8">
                    <div className="grow sm:mt-8 lg:mt-0">
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
