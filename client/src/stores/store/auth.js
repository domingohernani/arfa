export const auth = (set) => ({
  loggedUser: {},
  setLoggedUser: (data) => set({ loggedUser: data }),
  logoutUser: () => set({ loggedUser: {} }),
});
