import React, { useState, useEffect, Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from "@headlessui/react";
import { PlusIcon, MinusIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";
import { fetchFurnitureById } from "../../firebase/furniture";
import { startChat } from "../../firebase/chats";
import { auth } from "../../firebase/firebase";

export const AddChat = ({ isOpen, close, furnitureId, sellerId }) => {
  const [furnitureData, setFurnitureData] = useState(null);
  const [includeFurniture, setIncludeFurniture] = useState(true);
  const [messageText, setMessageText] = useState(""); // State to track the textarea value

  useEffect(() => {
    const fetchData = async () => {
      if (furnitureId) {
        const data = await fetchFurnitureById("furnitures", furnitureId);
        setFurnitureData(data);

        // Initialize messageText if includeFurniture is true
        if (includeFurniture && data) {
          setMessageText(
            `Hello, I would like to ask about ${data.name}, ID: ${data.id}. `
          );
        }
      }
    };

    fetchData();
  }, [furnitureId]);

  const handleToggle = () => {
    setIncludeFurniture((prev) => {
      const newValue = !prev;

      // Update messageText based on includeFurniture
      if (newValue && furnitureData) {
        setMessageText(
          `Hello, I would like to ask about ${furnitureData.name}, ID: ${furnitureData.id}. `
        );
      } else if (!newValue) {
        setMessageText(""); // Clear the messageText when toggling off
      }

      return newValue;
    });
  };
  const handleSubmit = async () => {
    if (!furnitureData) {
      toast.error("Furniture data not loaded.");
      return;
    }

    if (!messageText.trim()) {
      toast.error("Please enter a message");
      return;
    }

    try {
      const data = {
        shopId: sellerId,
        shopperId: auth.currentUser.uid,
        messageText: messageText.trim(),
      };
      const result = await startChat(data);
      if (result) {
        toast.success("Chat started successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to start chat. Please try again.");
    }
    close();
  };

  const handleCancel = () => {
    close();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
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
              <DialogPanel className="w-full max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {furnitureData
                    ? includeFurniture
                      ? `Chat about: ${furnitureData.name}`
                      : "Start a chat"
                    : "Loading furniture details..."}
                </DialogTitle>

                {furnitureData && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">
                          {furnitureData.name}
                        </span>{" "}
                        in the chat.
                      </p>
                      <button
                        type="button"
                        onClick={handleToggle}
                        className="flex items-center p-2 text-sm bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
                        aria-label={
                          includeFurniture
                            ? "Remove furniture from message"
                            : "Add furniture to message"
                        }
                      >
                        {includeFurniture ? (
                          <MinusIcon className="w-5 h-5 text-red-500" />
                        ) : (
                          <PlusIcon className="w-5 h-5 text-green-500" />
                        )}
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-gray-700">
                      {includeFurniture
                        ? "Furniture will be included."
                        : "Furniture will not be included."}
                    </p>
                  </div>
                )}

                <div className="mt-4">
                  <label
                    htmlFor="chat-message"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Message
                  </label>
                  <textarea
                    id="chat-message"
                    placeholder="Type your message here..."
                    rows="4"
                    className="block w-full p-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-arfagreen focus:border-arfagreen"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)} // Track the value
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end mt-6 space-x-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-arfagreen hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Send
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
