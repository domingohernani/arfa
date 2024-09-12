import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from "@headlessui/react";
import React, { Fragment } from "react";
import { doSignOut } from "../../firebase/auth";

export const Logout = ({ isOpen, close }) => {
  const handleLogout = () => {
    close();
    try {
      doSignOut();
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
              <DialogPanel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Confirm Logout
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to log out?
                  </p>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-arfagreen hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-opacity-75"
                    onClick={handleLogout}
                  >
                    Yes, Log out
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
