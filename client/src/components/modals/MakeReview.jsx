import React, { useState, useEffect, Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from "@headlessui/react";
import { writeReview, getReview, updateReview } from "../../firebase/furniture";
import { auth } from "../../firebase/firebase";
import toast from "react-hot-toast";

export const MakeReview = ({ isOpen, close, furnitureId }) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEdit, setIsEdit] = useState(false); // Check if it's an edit mode
  const [reviewId, setReviewId] = useState(null); // Store the review ID
  const userId = auth.currentUser.uid;

  useEffect(() => {
    const fetchReview = async () => {
      if (isOpen) {
        try {
          const existingReview = await getReview(furnitureId, userId);

          if (existingReview) {
            setRating(existingReview.rating);
            setTitle(existingReview.title);
            setDescription(existingReview.description);
            setReviewId(existingReview.id); // Save the review ID for updates
            setIsEdit(true); // Enable edit mode
          } else {
            // Reset to default if no review is found
            setRating(0);
            setTitle("");
            setDescription("");
            setReviewId(null);
            setIsEdit(false);
          }
        } catch (error) {
          console.error("Error fetching review:", error);
        }
      }
    };

    fetchReview();
  }, [isOpen, furnitureId, userId]);

  const handleCancel = () => {
    close();
  };

  const handleSubmit = async () => {
    if (!rating || !title || !description) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    try {
      if (isEdit) {
        await updateReview(furnitureId, reviewId, {
          rating,
          title,
          description,
        });
        toast.success("Review updated successfully!");
      } else {
        await writeReview(furnitureId, {
          rating,
          title,
          description,
          userId,
        });
        toast.success("Review submitted successfully!");
      }
      close();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  const handleStarClick = (index) => {
    setRating(index);
  };

  const ratingMessages = [
    "I don't like it",
    "I don't like it much",
    "It's okay",
    "I like it!",
    "I like it very much!",
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
              <DialogPanel className="w-full max-w-2xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {isEdit ? "Edit Your Review" : "Write a Review"}
                </DialogTitle>

                {/* Star Rating Section */}
                <div className="mt-4">
                  <div className="flex items-center space-x-2">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        onClick={() => handleStarClick(index + 1)}
                        className={`cursor-pointer ${
                          rating >= index + 1
                            ? "text-arfagreen"
                            : "text-gray-300"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>
                    ))}
                  </div>
                  {/* Rating Message */}
                  {rating > 0 && (
                    <p className="mt-2 text-sm font-medium text-arfagreen">
                      {ratingMessages[rating - 1]}
                    </p>
                  )}
                </div>

                {/* Review Title */}
                <div className="mt-4">
                  <label
                    htmlFor="review-title"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Review Title
                  </label>
                  <input
                    type="text"
                    id="review-title"
                    placeholder="Enter a title for your review"
                    className="block w-full p-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-arfagreen focus:border-arfagreen"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Review Description */}
                <div className="mt-4">
                  <label
                    htmlFor="review-description"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Description
                  </label>
                  <textarea
                    id="review-description"
                    rows="4"
                    placeholder="Share your thoughts about the product"
                    className="block w-full p-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-arfagreen focus:border-arfagreen"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end mt-6">
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
                    className="px-4 py-2 ml-2 text-sm font-medium text-white rounded-lg bg-arfagreen hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    {isEdit ? "Edit" : "Submit"}
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
