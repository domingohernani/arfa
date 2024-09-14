import React, { useState, useEffect, useCallback } from "react";
import search from "../../assets/icons/search.svg";
import { getChatsByShopId } from "../../firebase/chats";
import DisplayAvatar from "../../components/dynamic/DisplayAvatar";
import { formatTimeAgo } from "../../components/globalFunctions";
import DisplayChat from "../../components/dynamic/DisplayChat";
import { useStore } from "../../stores/useStore";
import noResult from "../../assets/images/no-result.png";

const PreviewChat = ({ isYou, text, image, video }) => {
  if (text.length > 0) {
    return (
      <div className="flex-grow text-xs text-gray-500 truncate">
        {isYou ? "You:" : ""} {text}
      </div>
    );
  } else if (image) {
    return (
      <div className="flex-grow text-xs text-gray-500 truncate">
        {isYou ? "You: " : ""}
        Sent an image
      </div>
    );
  } else if (video) {
    return (
      <div className="flex-grow text-xs text-gray-500 truncate">
        {isYou ? "You: " : ""}
        Sent a video
      </div>
    );
  } else {
    return <div className="flex-grow text-xs text-gray-500 truncate">---</div>;
  }
};

const SellerInbox = () => {
  const { loggedUser } = useStore();
  const { chats, setChats } = useStore();
  const { selectedChat, setSelectedChat } = useStore();
  const [loading, setLoading] = useState(false);
  const [mobileViewChat, setMobileViewChat] = useState(false);

  useEffect(() => {
    let unsubscribe;

    const fetchChats = () => {
      try {
        setLoading(true);

        unsubscribe = getChatsByShopId(loggedUser.userId, (chats) => {
          setChats(chats);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error fetching chats:", error);
        setLoading(false);
      }
    };

    if (loggedUser) {
      fetchChats();
    }

    // Clean up the listener on unmount or when loggedUser changes
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [setChats, setSelectedChat]);

  useEffect(() => {
    if (chats.length > 0) {
      setSelectedChat(chats[0]);
    }
  }, []);

  const handleChatSelect = useCallback((chat) => {
    setSelectedChat(chat);
    setMobileViewChat(true);
  }, []);

  if (loading && chats.length < 1) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex-row hidden m-5 border lg:flex">
        <div className="flex flex-row flex-auto rounded-tl-xl">
          <div className="flex flex-col w-1/5 bg-white">
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
                          ? "p-3 space-y-2 bg-gray-100 border-l-2 border-arfagreen"
                          : "p-3 space-y-2 border-l-2 border-transparent hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex flex-row items-center space-x-2">
                        <div className="flex items-center flex-1 gap-2">
                          <DisplayAvatar
                            url={chat.shopperInfo.profileUrl}
                            className="w-10 h-10"
                            name={chat.shopperInfo.firstName}
                          />
                          <div className="flex w-full text-sm font-medium truncate text-arfablack">
                            {`${chat.shopperInfo.firstName} ${chat.shopperInfo.lastName}`}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatTimeAgo(chat.lastMessageTimestamp)}
                        </div>
                      </div>

                      <div className="flex flex-row items-center space-x-1">
                        {(chat.lastMessage ||
                          chat.imageUrl ||
                          chat.videoUrl) && (
                          <PreviewChat
                            isYou={chat.shopId == chat.senderId}
                            text={chat.lastMessage}
                            image={chat.imageUrl}
                            video={chat.videoUrl}
                          />
                        )}
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col flex-1 w-3/5 bg-white border-l">
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
        <div className="flex flex-col w-full pt-3 bg-white lg:hidden">
          <div className="flex flex-col gap-6 px-2 md:px-5">
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
                          url={chat.shopperInfo.profileUrl}
                          className="w-10 h-10"
                          name={chat.shopperInfo.firstName}
                        />
                        <div className="flex w-full text-sm font-medium truncate text-arfablack">
                          {`${chat.shopperInfo.firstName} ${chat.shopperInfo.lastName}`}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatTimeAgo(chat.lastMessageTimestamp)}
                      </div>
                    </div>

                    <div className="flex flex-row items-center space-x-1">
                      {(chat.lastMessage || chat.imageUrl || chat.videoUrl) && (
                        <PreviewChat
                          isYou={chat.shopId == chat.senderId}
                          text={chat.lastMessage}
                          image={chat.imageUrl}
                          video={chat.videoUrl}
                        />
                      )}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      )}

      {mobileViewChat && (
        <div className="flex flex-col flex-1 w-full px-3 bg-white border lg:hidden">
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

export default SellerInbox;
