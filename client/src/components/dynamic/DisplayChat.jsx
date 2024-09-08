import React, { useState, useEffect, memo, useRef, useCallback } from "react";
import {
  fetchMessages,
  sendMessage,
  updateTypingStatus,
} from "../../firebase/chats";
import DisplayAvatar from "./DisplayAvatar";
import { formatTimeAgo, formatTimestamp } from "../globalFunctions";
import toast, { Toaster } from "react-hot-toast";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db, storage } from "../../firebase/firebase"; // Ensure storage is imported from Firebase
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import required storage functions
import {
  ChevronLeftIcon,
  XMarkIcon,
  ArrowsPointingOutIcon,
  VideoCameraIcon,
} from "@heroicons/react/16/solid";
import Typing from "../Typing";
import VideoPlayer from "./VideoPlayer";
import PictureFullScreen from "./PictureFullScreen";

const DisplayChat = memo(({ chat, setBackButton }) => {
  const messenger = chat.shopperInfo || chat.shopInfo;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  // For image input
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const imageInputRef = useRef(null);
  // For video input
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const videoInputRef = useRef(null);

  const [isFullScreen, setFullScreen] = useState(false);
  const [fullScreenUrl, setFullScreenUrl] = useState("");

  const [isSellerType, setIsSellerTyping] = useState(false);
  const [isShopperType, setIsShopperTyping] = useState(false);

  useEffect(() => {
    if (!chat.id) return;

    // Fetch messages in real-time
    const getMessagesRealtime = () => {
      const q = query(
        collection(db, "chats", chat.id, "messages"),
        orderBy("timestamp", "asc")
      );

      const unsubscribeMessages = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);
      });
      return () => unsubscribeMessages();
    };

    // Fetch typing status in real-time
    const getTypingStatusRealtime = () => {
      const docRef = doc(db, "chats", chat.id);
      const unsubscribeTypingStatus = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setIsSellerTyping(data.isSellerTyping);
          setIsShopperTyping(data.isShopperTyping);
        }
      });
      return () => unsubscribeTypingStatus();
    };

    const unsubscribeMessages = getMessagesRealtime();
    const unsubscribeTypingStatus = getTypingStatusRealtime();
    return () => {
      unsubscribeMessages();
      unsubscribeTypingStatus();
    };
  }, [chat.id]);

  useEffect(() => {
    const scrollToBottomSmooth = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollTo({
          top: messagesEndRef.current.scrollHeight,
        });
      }
    };

    scrollToBottomSmooth();
  }, [messages]);

  useEffect(() => {
    if (!chat?.id) return;

    const handleBeforeUnload = (event) => {
      // Use a quick fire-and-forget Firestore update
      updateTypingStatus(
        chat.id,
        chat.shopperInfo ? "seller" : "shopper",
        false
      );
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [chat?.id]);

  const handleSendMessage = useCallback(async () => {
    if (message.trim().length === 0 && !imageFile) {
      toast.error(
        "Your message is empty. Please enter a message or select an image before sending."
      );
      return;
    }

    try {
      let imageUrl = null;
      let videoUrl = null;

      // If there is an image file
      if (imageFile) {
        const imageRef = ref(
          storage,
          `chats/images/${chat.id}/${Date.now()}_${imageFile.name}`
        );
        const snapshot = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref); // Get the download URL after uploading
      }
      // If there is a video file
      if (videoFile) {
        const videoRef = ref(
          storage,
          `chats/videos/${chat.id}/${Date.now()}_${videoFile.name}`
        );
        const snapshot = await uploadBytes(videoRef, videoFile);
        videoUrl = await getDownloadURL(snapshot.ref); // Get the download URL after uploading
      }

      // Send the message with text, image, and video (if available)
      const result = await sendMessage(
        chat.id,
        message.trim(),
        imageUrl,
        videoUrl
      );

      // Clear the input field and image, video preview
      setMessage("");
      setImagePreview(null);
      setImageFile(null);
      setVideoPreview(null);
      setVideoFile(null);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send the message. Please try again.");
    }
  }, [message, imageFile, chat.id]);

  const handleVideoIconClick = () => {
    videoInputRef.current.click();
  };

  const handleImageIconClick = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleVideoChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoPreview(videoURL);
      setVideoFile(file);
    }
  }, []);

  const handleBackButton = useCallback(() => {
    setBackButton(false);
  }, [setBackButton]);

  const handleTypingStatus = async (value) => {
    try {
      await updateTypingStatus(
        chat.id,
        chat.shopperInfo ? "seller" : "shopper",
        value
      );
    } catch (error) {
      console.error("Error updating typing status :", error);
    }
  };

  if (!chat.id) {
    return <div>Select an convo</div>;
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between flex-none px-5 py-2 border-b bg-arfagray">
        <div className="flex items-center justify-between w-full">
          {messenger && (
            <div className="flex flex-row items-center gap-3">
              <DisplayAvatar
                url={messenger.profileUrl || messenger.logo}
                className="w-10 h-10"
                name={messenger.firstName || messenger.name}
              ></DisplayAvatar>

              <div className="text-sm font-medium">
                {messenger.firstName && messenger.lastName
                  ? messenger.firstName + " " + messenger.lastName
                  : messenger.name}
              </div>
            </div>
          )}

          {setBackButton ? (
            <ChevronLeftIcon
              className="w-5 h-5 cursor-pointer"
              onClick={handleBackButton}
            />
          ) : null}
        </div>
      </div>
      <section className="flex flex-col items-stretch justify-between h-full">
        <div
          className="flex flex-col flex-auto gap-3 p-5 overflow-y-auto "
          ref={messagesEndRef}
          style={{ height: "68vh" }}
        >
          {messages.map((message, index) => {
            const position =
              message.senderId === messenger.userId ||
              message.senderId === messenger.id;

            return (
              <div
                className={`flex ${
                  position ? "mr-auto" : "ml-auto"
                } flex-row gap-2 space-x-2 space-x-reverse w-fit max-w-80`}
                key={index}
              >
                {position && (
                  <DisplayAvatar
                    url={messenger.profileUrl || messenger.logo}
                    className={"w-8 h-8"}
                    name={chat.firstName || chat.name}
                  ></DisplayAvatar>
                )}

                <div className="flex flex-col items-end">
                  <div
                    className={`p-3 text-sm ${
                      position ? "bg-gray-200" : "bg-arfagray border"
                    } rounded lg:p-4 gap-3 flex flex-col`}
                  >
                    {message.text && <div>{message.text}</div>}
                    {message.imageUrl && (
                      <div className="relative group">
                        <img
                          src={message.imageUrl}
                          alt="Sent image"
                          className="w-full h-auto border rounded"
                        />
                        <ArrowsPointingOutIcon
                          className="absolute hidden w-5 h-5 text-white cursor-pointer bottom-2 right-2 group-hover:block"
                          onClick={() => {
                            setFullScreenUrl(message.imageUrl);
                            setFullScreen(true);
                          }}
                        />
                      </div>
                    )}
                    {message.videoUrl && <VideoPlayer url={message.videoUrl} />}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatTimeAgo(message.timestamp)}
                  </div>
                </div>
              </div>
            );
          })}
          {isShopperType && chat.shopperInfo && (
            <div className="flex">
              <DisplayAvatar
                url={messenger.profileUrl || messenger.logo}
                className={"w-8 h-8"}
                name={chat.firstName || chat.name}
              ></DisplayAvatar>
              <Typing />
            </div>
          )}
          {isSellerType && chat.shopInfo && (
            <div className="flex">
              <DisplayAvatar
                url={messenger.profileUrl || messenger.logo}
                className={"w-8 h-8"}
                name={chat.firstName || chat.name}
              ></DisplayAvatar>
              <Typing />
            </div>
          )}
        </div>
        <div className="w-11/12 mx-auto mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <textarea
              id="message"
              rows="1"
              className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Write a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => handleTypingStatus(true)}
              onBlur={() => handleTypingStatus(false)}
            ></textarea>

            <section className="flex items-end gap-3">
              {/* Image preview */}
              {imagePreview && (
                <div className="relative w-fit">
                  <img
                    src={imagePreview}
                    alt="Selected"
                    className="object-cover w-auto h-24 border"
                  />
                  <XMarkIcon
                    className="absolute w-5 h-5 text-gray-600 cursor-pointer top-1 right-1"
                    onClick={() => {
                      setImagePreview(null);
                      setImageFile(null);
                    }}
                  />
                </div>
              )}
              {/* Video preview */}
              {videoPreview && (
                <div className="relative w-28">
                  <VideoPlayer url={videoPreview} />
                  <XMarkIcon
                    className="absolute w-5 h-5 text-gray-600 cursor-pointer top-1 right-1"
                    onClick={() => {
                      setVideoFile(null);
                      setVideoPreview(null);
                    }}
                  />
                </div>
              )}
            </section>
          </div>
          <div className="flex flex-row-reverse items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-arfagreen rounded-lg"
              onClick={handleSendMessage}
            >
              Send
            </button>
            <div className="flex space-x-1 ps-0 rtl:space-x-reverse sm:ps-2">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                onClick={handleImageIconClick}
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
                <span className="sr-only">Upload image</span>
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
                onClick={handleVideoIconClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
                </svg>

                <span className="sr-only">Upload video</span>
              </button>

              <input
                type="file"
                accept="image/*"
                ref={imageInputRef}
                className="hidden"
                onChange={handleImageChange}
              />

              <input
                type="file"
                accept="video/*"
                ref={videoInputRef}
                className="hidden"
                onChange={handleVideoChange}
              />
            </div>
          </div>
        </div>
      </section>

      <Toaster />
      {isFullScreen && (
        <PictureFullScreen imageUrl={fullScreenUrl} setState={setFullScreen} />
      )}
    </>
  );
});

export default DisplayChat;
