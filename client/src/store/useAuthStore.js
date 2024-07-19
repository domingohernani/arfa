import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  signOut: () => set({ user: null }),
}));

export default useAuthStore;
