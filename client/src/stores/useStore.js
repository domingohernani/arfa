import { create } from "zustand";
import { furnitureBrowsing } from "./store/furnitureBrowsing";

export const useStore = create((...a) => ({
  ...furnitureBrowsing(...a),
}));
