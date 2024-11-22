import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import hooks for routing
import search from "../../assets/icons/search.svg";
import { getChatsByShopperId } from "../../firebase/chats";
import DisplayAvatar from "../../components/dynamic/DisplayAvatar";
import { formatTimeAgo } from "../../components/globalFunctions";
import DisplayChat from "../../components/dynamic/DisplayChat";
import { getUserInfo } from "../../firebase/user";
import { useStore } from "../../stores/useStore";
import noResult from "../../assets/images/no-result.png";
import ProductCard from "../../components/dynamic/ProductCard";
import { AddChat } from "../../components/modals/AddChat";

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

const Inbox = () => {
  const { id, furnitureId, sellerId } = useParams(); // Get dynamic route parameter
  const navigate = useNavigate(); // Navigate programmatically
  const { chats, setChats } = useStore();
  const { selectedChat, setSelectedChat } = useStore();
  const [loading, setLoading] = useState(false);
  const [mobileViewChat, setMobileViewChat] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredChats, setFilteredChats] = useState(chats);
  const [isAddChatModal, setAddChatModal] = useState(false);
  const [backUpFurnitureId, setBackUpFurnitureId] = useState("");
  const [backUpSellerId, setBackUpSellerId] = useState("");

  useEffect(() => {
    let unsubscribe;

    const fetchChats = async () => {
      try {
        setLoading(true);
        const loggedUser = await getUserInfo();
        unsubscribe = getChatsByShopperId(loggedUser.id, (chats) => {
          setChats(chats);
          setFilteredChats(chats); // Initialize filteredChats with fetched chats
          setLoading(false);
        });
      } catch (error) {
        error("Error fetching chats:", error);
        setLoading(false);
      }
    };

    fetchChats();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [setChats]);

  // Update selected chat based on route param `id`
  useEffect(() => {
    if (sellerId && furnitureId && chats) {
      const matchingChat = chats.find((chat) => chat.shopId === sellerId);

      if (matchingChat) {
        navigate(`/profile/inbox/${matchingChat.id}`);
        setBackUpFurnitureId(furnitureId);
        setBackUpSellerId(sellerId);
      } else {
        setBackUpFurnitureId(furnitureId);
        setBackUpSellerId(sellerId);
      }
      setAddChatModal(true);
      return;
    }

    if (id && chats.length > 0) {
      const chat = chats.find((chat) => chat.id === id);
      if (chat) {
        setSelectedChat(chat);
      } else {
        setSelectedChat(null);
      }
    }
  }, [id, chats, setSelectedChat]);

  // Automatically select the first chat if no route param is provided
  useEffect(() => {
    if (!id && chats.length > 0 && !furnitureId && !sellerId) {
      navigate(`/profile/inbox/${chats[0].id}`);
    }
  }, [id, chats, navigate]);

  const handleChatSelect = useCallback(
    (chat) => {
      navigate(`/profile/inbox/${chat.id}`); // Update URL to include chat ID
      setMobileViewChat(true);
    },
    [navigate]
  );

  const handleSearch = () => {
    const lowerCaseInput = searchInput.toLowerCase();
    const results = chats.filter((chat) => {
      const shopName = chat.shopInfo.name.toLowerCase();
      return shopName.includes(lowerCaseInput);
    });
    setFilteredChats(results);
  };

  const handleAddChatClose = () => {
    setAddChatModal(false);
  };

  if (loading && chats.length < 1) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* <ProductCard></ProductCard> */}
      {isAddChatModal && (
        <AddChat
          close={handleAddChatClose}
          isOpen={isAddChatModal}
          furnitureId={backUpFurnitureId}
          sellerId={backUpSellerId}
        />
      )}
      <div className="flex-row hidden h-screen m-5 border lg:flex">
        <div className="flex flex-row flex-auto rounded-tl-xl">
          <div className="flex flex-col bg-white max-w-60">
            <div className="flex flex-col gap-6 px-2 pt-5 md:px-5">
              <div className="relative">
                <input
                  type="text"
                  className="w-full py-2 text-sm border border-gray-200 px-7 focus:outline-none focus:border-arfagreen focus:ring-0 focus:ring-arfagreen focus:bg-white"
                  placeholder="Search..."
                  value={searchInput}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchInput(value);
                    if (value === "") {
                      setFilteredChats(chats);
                    }
                  }}
                />
                <img
                  src={search}
                  alt="Search"
                  className="absolute top-0 w-3 h-full cursor-pointer left-2"
                  onClick={handleSearch} // Trigger search on click
                />
              </div>
            </div>

            <div className="flex-auto mt-5 overflow-y-auto">
              {filteredChats.map((chat, index) => {
                const isActive = chat.id === selectedChat?.id;
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
                        {(chat.lastMessage ||
                          chat.imageUrl ||
                          chat.videoUrl) && (
                          <PreviewChat
                            isYou={chat.shopperId == chat.senderId}
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

          <div className="flex flex-col flex-1 w-3/5 border-l">
            {filteredChats.length > 0 ? (
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
          {/* Search Bar */}
          <div className="flex flex-col gap-6 px-2 pt-5 md:px-5">
            <div className="relative">
              <input
                type="text"
                className="w-full py-2 text-sm border border-gray-200 px-7 focus:outline-none focus:border-arfagreen focus:ring-0 focus:ring-arfagreen focus:bg-white"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchInput(value);
                  if (value === "") {
                    setFilteredChats(chats);
                  }
                }}
              />
              <img
                src={search}
                alt="Search"
                className="absolute top-0 w-3 h-full cursor-pointer left-2"
                onClick={handleSearch}
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-auto mt-5 overflow-y-auto">
            {filteredChats.map((chat, index) => {
              const isActive = chat.id === selectedChat?.id; // Ensure safe access to `selectedChat`
              return (
                <section
                  className="cursor-pointer"
                  key={index}
                  onClick={() => handleChatSelect(chat)}
                >
                  <div
                    className={`${
                      isActive
                        ? "p-3 space-y-2 border-l-2 border-arfagreen bg-gray-100"
                        : "p-3 space-y-2 border-l-2 border-transparent hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex flex-row items-center space-x-2">
                      <DisplayAvatar
                        url={chat.shopInfo.logo}
                        className="w-10 h-10"
                        name={chat.shopInfo.name}
                      />
                      <div className="flex w-full text-sm font-medium truncate text-arfablack">
                        {chat.shopInfo.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatTimeAgo(chat.lastMessageTimestamp)}
                      </div>
                    </div>

                    <div className="flex flex-row items-center space-x-1">
                      {(chat.lastMessage || chat.imageUrl || chat.videoUrl) && (
                        <PreviewChat
                          isYou={chat.shopperId === chat.senderId}
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
        <div className="flex flex-col flex-1 w-full px-3 border lg:hidden">
          {/* Chat Display */}
          {filteredChats.length > 0 ? (
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
