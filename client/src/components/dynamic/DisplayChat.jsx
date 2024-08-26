import React, { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { fetchMessages } from "../../firebase/chats";

const DisplayChat = () => {
  const chatId = useParams().id;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMessages = async () => {
      setLoading(true);
      try {
        const messages = await fetchMessages(chatId);
      } catch (error) {
        console.error("Error fetching message ", error);
      } finally {
        setLoading(false);
      }
    };
    loadMessages();
  }, [chatId]); // Make sure to include 'chatId' in the dependency array

  if (loading) return <div>loading..</div>;

  return (
    <>
      <div className="flex flex-row items-center justify-between flex-none h-12 p-5 border-b">
        <div className="flex flex-col space-y-1">
          <div className="font-semibold">Hello</div>
        </div>
      </div>

      <div
        className="flex-auto p-5 space-y-4 overflow-y-auto"
        style={{
          backgroundImage:
            "url(https://static.intercomassets.com/ember/assets/images/messenger-backgrounds/background-1-99a36524645be823aabcd0e673cb47f8.png)",
        }}
      >
        <div className="flex flex-row space-x-2">
          <svg
            className="flex-none w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>

          <div className="flex flex-col">
            <div className="p-5 text-sm bg-gray-200 rounded">
              Some message text
            </div>
            <div className="text-sm text-gray-600">4hr ago</div>
          </div>
        </div>
        <div className="flex flex-row space-x-2 space-x-reverse">
          <svg
            className="flex-none w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>

          <div className="flex flex-col">
            <div className="p-5 text-sm bg-blue-100 rounded">
              Some message text
            </div>
            <div className="text-sm text-gray-600">5hr ago</div>
          </div>
        </div>
      </div>

      <div className="w-11/12 mx-auto mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows="4"
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
};

export default DisplayChat;
