import {
    Dialog,
    Transition,
    TransitionChild,
    DialogTitle,
    DialogPanel,
} from "@headlessui/react";
import React, { Fragment } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

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
                                    Update Status {orderId} {status}
                                </DialogTitle>
                                <div className="mt-2">
                                    <Tracking />
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


const Tracking = () => {
    return (
        <section class="bg-white antialiased">
            <div class="mx-auto max-w-screen-xl 2xl:px-0">
                <div class="lg:flex lg:gap-8">
                    <div class="grow sm:mt-8 lg:mt-0">
                        <div class="space-y-6 rounded-lg bg-white p-4">
                            <ol class="relative ms-3 border-s border-gray-200 dark:border-gray-700">
                                <li class="mb-10 ms-6">
                                    <span class="absolute -start-3 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                                        <ShoppingCartIcon className="text-green-400 w-4 h-4" />
                                    </span>
                                    <p class="mb-0.5 text-sm font-medium text-gray-900 dark:text-white">Estimated delivery in 24 Nov 2023</p>
                                    <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Products delivered</p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
