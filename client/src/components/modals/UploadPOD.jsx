import React, { useState, useRef, Fragment } from "react";
import { Tooltip } from "flowbite-react";
import { Dialog, Transition, DialogTitle, DialogPanel, TransitionChild } from "@headlessui/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

export const UploadPOD = ({ isOpen, close, upload, onDelivery }) => {
    const [image, setImage] = useState(null);
    const [imagePOD, setImagePOD] = useState(null);
    const inputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePOD(file);
            console.log(file);
            setImage(URL.createObjectURL(file));
        }
    };

    const handleClearImage = () => {
        setImage(null);
        setImagePOD(null);
        inputRef.current.value = null;
    };

    const handleSubmit = () => {
        if (upload) {
            upload(imagePOD)
            close();
        }
    }

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
                            <DialogPanel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
                                <DialogTitle
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    {
                                        onDelivery ? "Upload Proof of Delivery" : "Upload Pick-Up Confirmation"
                                    }

                                </DialogTitle>
                                <p className="text-sm text-gray-500 mt-1">
                                    {onDelivery
                                        ? "Please upload a photo as proof of delivery. Accepted formats are JPG, PNG, or GIF."
                                        : "Please upload a photo as pick-up confirmation. Accepted formats are JPG, PNG, or GIF."
                                    }
                                </p>
                                <div className="mt-4">
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="pod"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Upload Image
                                        </label>
                                        <Tooltip content="Accepted formats: JPG, JPEG or PNG Only">
                                            <QuestionMarkCircleIcon
                                                className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                        </Tooltip>
                                    </div>
                                    <input
                                        ref={inputRef}
                                        type="file"
                                        id="pod"
                                        className="block w-full pr-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-arfagreen focus:border-arfagreen"
                                        onChange={handleImageChange}
                                        accept=".jpg, .jpeg, .png"
                                    />
                                    {image && (
                                        <div className="mt-4">
                                            <img
                                                src={image}
                                                alt="Proof of Delivery Preview"
                                                className="w-full h-auto rounded-lg shadow-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleClearImage}
                                                className="mt-2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
                                            >
                                                Remove Image
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-between mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-arfagreen hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-opacity-75"
                                        onClick={handleSubmit} // Replace with your submit logic
                                    >
                                        Submit
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
