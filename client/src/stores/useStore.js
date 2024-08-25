import { create } from "zustand";
import { furnitureBrowsing } from "./store/furnitureBrowsing";
import { furnitures } from "./store/furnitures";
import { orders } from "./store/orders";
import { transactions } from "./store/transactions";

export const useStore = create((...a) => ({
  ...furnitureBrowsing(...a),
  ...furnitures(...a),
  ...orders(...a),
  ...transactions(...a),
}));
