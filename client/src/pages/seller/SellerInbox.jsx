import React, { useState, useEffect, useCallback } from "react";
import search from "../../assets/icons/search.svg";
import { getChatsByShopId } from "../../firebase/chats";
import DisplayAvatar from "../../components/dynamic/DisplayAvatar";
import { formatTimeAgo } from "../../components/globalFunctions";
import { Link } from "react-router-dom";
import DisplayChat from "../../components/dynamic/DisplayChat";
import { getLoggedShopInfo } from "../../firebase/user";
import { useStore } from "../../stores/useStore";

const SellerInbox = () => {
  const { loggedUser } = useStore();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        const fetchedChats = await getChatsByShopId(loggedUser.userId);
        setChats(fetchedChats);

        setSelectedChat(fetchedChats[0]);
      } catch (error) {
        console.error("Error fetching chats:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    if (loggedUser) {
      fetchChats();
    }
  }, [loggedUser]);

  const handleChatSelect = useCallback((chat) => {
    setSelectedChat(chat);
  }, []);

  if (loading) return <div>loading...</div>;

  return (
    <div className="flex flex-row m-5 bg-white h-5/6">
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
                          name={selectedChat.shopperInfo.firstName}
                        />
                        <div className="flex w-full text-sm font-semibold truncate text-arfablack">
                          {`${chat.shopperInfo.firstName} ${chat.shopperInfo.lastName}`}
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
          {selectedChat && <DisplayChat chat={selectedChat} />}
        </div>
      </div>
    </div>
  );
};

export default SellerInbox;
