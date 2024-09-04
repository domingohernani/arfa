export const auth = (set) => ({
  loggedUser: {},
  setLoggedUser: (data) => set({ loggedUser: data }),

  profileUrl: {},
  setProfileUrl: (data) => set({ profileUrl: data }),

  logoutUser: () => set({ loggedUser: {} }),
});
