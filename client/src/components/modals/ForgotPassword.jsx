import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from "@headlessui/react";
import React, { Fragment, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { doPasswordChange, doPasswordReset } from "../../firebase/auth";

export const ForgotPassword = ({ isOpen, close }) => {
  const [email, setEmail] = useState("");

  const handleCancel = () => {
    close();
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email is empty
    if (!email) {
      toast.error("Email is required!");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    const result = await doPasswordReset(email);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <Toaster />
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
                    Password Reset
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Please enter your email address to reset your password.
                    </p>
                  </div>
                  <div className="mb-4">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="eg: harrypottah@gmail.com"
                      className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-arfagreen hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-opacity-75"
                      onClick={handlePasswordReset}
                    >
                      Send
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
