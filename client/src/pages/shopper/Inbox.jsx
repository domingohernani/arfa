import React, { useState, useEffect, useCallback } from "react";
import search from "../../assets/icons/search.svg";
import { getChatsByShopperId, sendMessage } from "../../firebase/chats";
import DisplayAvatar from "../../components/dynamic/DisplayAvatar";
import { formatTimeAgo } from "../../components/globalFunctions";
import DisplayChat from "../../components/dynamic/DisplayChat";
import { getUserInfo } from "../../firebase/user";
import { useStore } from "../../stores/useStore";
import noResult from "../../assets/images/no-result.png";
import ProductCard from "../../components/dynamic/ProductCard";

const Inbox = () => {
  const { chats, setChats } = useStore();
  const { selectedChat, setSelectedChat } = useStore();
  const [loading, setLoading] = useState(false);
  const [mobileViewChat, setMobileViewChat] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);

        const user = await getUserInfo();

        const unsubscribe = getChatsByShopperId(user.id, (chats) => {
          setChats(chats); // Update the chats state
          setSelectedChat(chats[0]);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching chats:", error);
        setLoading(false);
      } finally {
        setLoading(false); // Stop loading after setting up the listener
      }
    };

    fetchChats();

    // Cleanup function to unsubscribe on component unmount
  }, [setChats, setSelectedChat]);

  const handleChatSelect = useCallback((chat) => {
    setSelectedChat(chat);
    setMobileViewChat(true);
  }, []);

  if (loading && chats.length < 1) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* <ProductCard></ProductCard> */}
      <div className="flex-row hidden h-screen m-5 border lg:flex">
        <div className="flex flex-row flex-auto rounded-tl-xl">
          <div className="flex flex-col w-1/5">
            <div className="flex flex-col gap-6 px-2 pt-5 md:px-5">
              <div className="relative">
                <input
                  type="text"
                  className="w-full py-2 text-sm border border-gray-200 px-7 focus:outline-none focus:border-arfagreen focus:ring-0 focus:ring-arfagreen focus:bg-white"
                  placeholder="Search..."
                  id="catalogSearchbar convoSearchBar"
                />
                <img
                  src={search}
                  alt="Search"
                  className="absolute top-0 w-3 h-full cursor-pointer left-2"
                  width=""
                  height="auto"
                />
              </div>
            </div>

            <div className="flex-auto mt-5 overflow-y-auto">
              {chats.map((chat, index) => {
                const isActive = chat.id === selectedChat.id;
                const shopInfo = chat.shopInfo;
                return (
                  <section
                    className="cursor-pointer"
                    key={index}
                    onClick={() => handleChatSelect(chat)}
                  >
                    <div
                      className={`${
                        isActive
                          ? "p-3 space-y-2 bg-gray-100 border-l-2 border-arfagreen"
                          : "p-3 space-y-2 border-l-2 border-transparent hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex flex-row items-center space-x-2">
                        <div className="flex items-center flex-1 gap-2">
                          <DisplayAvatar
                            url={shopInfo.logo || ""}
                            className="w-10 h-10"
                            name={shopInfo.name || ""}
                          />
                          <div className="flex w-full text-sm font-medium truncate text-arfablack">
                            {shopInfo.name || "Unknown Shop"}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatTimeAgo(chat.lastMessageTimestamp)}
                        </div>
                      </div>

                      <div className="flex flex-row items-center space-x-1">
                        <div className="flex-grow text-xs text-gray-500 truncate">
                          {chat.lastMessage}
                        </div>
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col flex-1 w-3/5 border-l">
            {chats.length > 0 ? (
              selectedChat && <DisplayChat chat={selectedChat} />
            ) : (
              <div className="flex flex-col items-center gap-3 mt-28">
                <img src={noResult} alt="No Result" className="w-64 h-auto" />
                <p className="text-sm">
                  No messages available at the moment. Please check back later.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {!mobileViewChat && (
        <div className="flex flex-col w-full lg:hidden">
          <div className="flex flex-col gap-6 px-2 pt-5 md:px-5">
            <div className="relative">
              <input
                type="text"
                className="w-full py-2 text-sm border border-gray-200 px-7 focus:outline-none focus:border-arfagreen focus:ring-0 focus:ring-arfagreen focus:bg-white"
                placeholder="Search..."
                id="catalogSearchbar convoSearchBar"
              />
              <img
                src={search}
                alt="Search"
                className="absolute top-0 w-3 h-full cursor-pointer left-2"
                width=""
                height="auto"
              />
            </div>
          </div>

          <div className="flex-auto mt-5 overflow-y-auto">
            {chats.map((chat, index) => {
              const isActive = chat.id === selectedChat.id;
              return (
                <section
                  className="cursor-pointer"
                  key={index}
                  onClick={() => handleChatSelect(chat)}
                >
                  <div
                    className={`${
                      isActive
                        ? "p-3 space-y-2  border-l-2 hover:bg-gray-100"
                        : "p-3 space-y-2 border-l-2 border-transparent hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex flex-row items-center space-x-2 ">
                      <div className="flex items-center flex-1 gap-2">
                        <DisplayAvatar
                          url={chat.shopInfo.logo}
                          className="w-10 h-10"
                          name={chat.shopInfo.name}
                        />
                        <div className="flex w-full text-sm font-medium truncate text-arfablack">
                          {chat.shopInfo.name}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatTimeAgo(chat.lastMessageTimestamp)}
                      </div>
                    </div>

                    <div className="flex flex-row items-center space-x-1">
                      <div className="flex-grow text-xs text-gray-500 truncate">
                        {chat.lastMessage}
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      )}

      {mobileViewChat && (
        <div className="flex flex-col flex-1 w-full px-3 border lg:hidden">
          {chats.length > 0 ? (
            selectedChat && (
              <DisplayChat
                chat={selectedChat}
                setBackButton={setMobileViewChat}
              />
            )
          ) : (
            <div className="flex flex-col items-center gap-3 mt-28">
              <img src={noResult} alt="No Result" className="w-64 h-auto" />
              <p className="text-sm">
                No messages available at the moment. Please check back later.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Inbox;
