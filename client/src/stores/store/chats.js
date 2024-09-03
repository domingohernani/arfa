export const chats = (set) => ({
  chats: [],
  setChats: (data) => set({ chats: data }),  // Correctly set the 'chats' property
  selectedChat: {},
  setSelectedChat: (data) => set({ selectedChat: data }),
});