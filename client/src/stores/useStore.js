import { create } from "zustand";
import { furnitureBrowsing } from "./store/furnitureBrowsing";
import { furnitures } from "./store/furnitures";
import { orders } from "./store/orders";
import { transactions } from "./store/transactions";
import { chats } from "./store/chats";
import { auth } from "./store/auth";
import { shops } from "./store/shops";

export const useStore = create((...a) => ({
  ...furnitureBrowsing(...a),
  ...furnitures(...a),
  ...orders(...a),
  ...transactions(...a),
  ...chats(...a),
  ...auth(...a),
  ...shops(...a),
}));
