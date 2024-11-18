import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import hooks for routing
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
        {isYou ? "You: " : ""} Sent an image
      </div>
    );
  } else if (video) {
    return (
      <div className="flex-grow text-xs text-gray-500 truncate">
        {isYou ? "You: " : ""} Sent a video
      </div>
    );
  } else {
    return <div className="flex-grow text-xs text-gray-500 truncate">---</div>;
  }
};

const SellerInbox = () => {
  const { id } = useParams(); // Get dynamic route parameter
  const navigate = useNavigate(); // Navigate programmatically
  const { loggedUser } = useStore();
  const { chats, setChats } = useStore();
  const { selectedChat, setSelectedChat } = useStore();
  const [loading, setLoading] = useState(false);
  const [mobileViewChat, setMobileViewChat] = useState(false);
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const [filteredChats, setFilteredChats] = useState(chats); // State for filtered chats

  useEffect(() => {
    let unsubscribe;

    const fetchChats = () => {
      try {
        setLoading(true);
        unsubscribe = getChatsByShopId(loggedUser.userId, (chats) => {
          setChats(chats);
          setFilteredChats(chats); // Initialize filteredChats with fetched chats
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

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [loggedUser, setChats]);

  // Update selected chat based on route param `id`
  useEffect(() => {
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
    if (!id && chats.length > 0) {
      navigate(`/seller-page/inbox/${chats[0].id}`);
    }
  }, [id, chats, navigate]);

  const handleChatSelect = useCallback(
    (chat) => {
      navigate(`/seller-page/inbox/${chat.id}`); // Update URL to include chat ID
      setMobileViewChat(true);
    },
    [navigate]
  );

  const handleSearch = () => {
    const lowerCaseInput = searchInput.toLowerCase();
    const results = chats.filter((chat) => {
      const fullName =
        `${chat.shopperInfo.firstName} ${chat.shopperInfo.lastName}`.toLowerCase();
      return (
        chat.shopperInfo.firstName.toLowerCase().includes(lowerCaseInput) ||
        chat.shopperInfo.lastName.toLowerCase().includes(lowerCaseInput) ||
        fullName.includes(lowerCaseInput)
      );
    });
    setFilteredChats(results);
  };

  if (loading && chats.length < 1) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex-row hidden m-5 border lg:flex">
        <div className="flex flex-row flex-auto rounded-tl-xl">
          <div className="flex flex-col bg-white max-w-60">
            <div className="flex flex-col gap-6 px-2 pt-5 md:px-5">
              <div className="relative">
                <img
                  src={search}
                  alt="Search"
                  className="absolute top-0 w-3 h-full cursor-pointer right-2"
                  onClick={handleSearch} // Trigger search on click
                />
                <input
                  type="text"
                  className="w-full py-2 pl-2 text-sm border border-gray-200 pr-7 focus:outline-none focus:border-arfagreen focus:ring-0 focus:ring-arfagreen focus:bg-white"
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
              </div>
            </div>

            <div className="flex-auto mt-5 overflow-y-auto">
              {filteredChats.map((chat, index) => {
                const isActive = chat.id === selectedChat?.id;
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
                            isYou={chat.shopId === chat.senderId}
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

          <div className="flex flex-col flex-1 bg-white border-l">
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
        <div className="flex flex-col w-full pt-3 bg-white lg:hidden">
          <div className="flex flex-col gap-6 px-2 md:px-5">
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

          <div className="flex-auto mt-5 overflow-y-auto">
            {filteredChats.map((chat, index) => {
              const isActive = chat.id === selectedChat?.id;
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
                          isYou={chat.shopId === chat.senderId}
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

export default SellerInbox;
