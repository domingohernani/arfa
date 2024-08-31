import React, { useState, useEffect, memo } from "react";
import { fetchMessages } from "../../firebase/chats";
import DisplayAvatar from "./DisplayAvatar";
import { formatTimeAgo, formatTimestamp } from "../globalFunctions";

const DisplayShopperChats = memo(({ chat }) => {
  const shopper = chat.shopperInfo;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getImages = async () => {
      setLoading(true);
      try {
        const fetchedMessages = await fetchMessages(chat.id);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Error fetching messages ", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    getImages();
  }, [chat]);

  if (loading) return <div>loading...</div>;

  return (
    <>
      <div className="flex flex-row items-center justify-between flex-none p-5 border-b">
        <div className="flex flex-row items-center gap-3 space-y-1">
          {/* {shopper.profileUrl && (
            <DisplayAvatar
              url={shopper.profileUrl}
              className="w-10 h-10"
              name={chat.shopperInfo.firstName}
            ></DisplayAvatar>
          )}
          <div className="font-semibold">
            {`${shopper.firstName} ${shopper.lastName}`}
          </div> */}
        </div>
      </div>

      <div className="flex flex-col flex-auto gap-3 p-5 overflow-y-auto">
        {messages.map((message, index) => {
          // const position = message.senderId === shopper.id;
          const position = true;
          return (
            <div
              className={`flex ${
                position ? "mr-auto" : "ml-auto"
              } flex-row gap-2 space-x-2 space-x-reverse w-fit max-w-80`}
              key={index}
            >
              {position && (
                <DisplayAvatar
                  url={""}
                  className={"w-8 h-8"}
                  name={"Testing"}
                ></DisplayAvatar>
              )}

              <div className="flex flex-col items-end">
                <div className="p-5 text-sm bg-gray-200 rounded">
                  {message.text}
                </div>
                <div className="text-sm text-gray-600">
                  {formatTimeAgo(message.timestamp)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-11/12 mx-auto mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows="1"
            className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write a comment..."
            required
          ></textarea>
        </div>
        <div className="flex flex-row-reverse items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-arfagreen rounded-lg"
          >
            Send
          </button>
          <div className="flex space-x-1 ps-0 rtl:space-x-reverse sm:ps-2">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 12 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                />
              </svg>
              <span className="sr-only">Attach file</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
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
          </div>
        </div>
      </div>
    </>
  );
});

export default DisplayShopperChats;
