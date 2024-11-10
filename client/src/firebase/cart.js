import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "./firebase";

export const addToCart = async (
  userId,
  furnitureId,
  variant,
  sellerId,
  quantity
) => {
  const userRef = doc(db, "users", userId);

  try {
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const cart = userData.cart || [];

      const isDuplicate = cart.some(
        (item) =>
          item.furnitureId === furnitureId &&
          item.variant === variant &&
          item.sellerId === sellerId
      );

      if (isDuplicate) {
        return { success: true, isDuplicate: true };
      } else {
        await updateDoc(userRef, {
          cart: arrayUnion({ furnitureId, variant, sellerId, quantity }),
        });
        return { success: true, isDuplicate: false };
      }
    } else {
      console.error("User document does not exist.");
      return { success: false, isDuplicate: false };
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    return { success: false, isDuplicate: false };
  }
};

export const removeFromCart = async (
  userId,
  furnitureId,
  variant,
  sellerId
) => {
  const userRef = doc(db, "users", userId);

  try {
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const cart = userData.cart || [];

      // Filter out the item that matches the provided furnitureId, variant, and sellerId
      const updatedCart = cart.filter(
        (item) =>
          !(
            item.furnitureId === furnitureId &&
            item.variant === variant &&
            item.sellerId === sellerId
          )
      );

      if (updatedCart.length !== cart.length) {
        await updateDoc(userRef, { cart: updatedCart });
        return { success: true, isRemoved: true };
      } else {
        return {
          success: true,
          isRemoved: false,
          message: "Item not in cart.",
        };
      }
    } else {
      console.error("User document does not exist.");
      return { success: false, isRemoved: false };
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return { success: false, isRemoved: false };
  }
};
