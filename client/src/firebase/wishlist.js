import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "./firebase";

export const addToWishlist = async (userId, furnitureId) => {
  const userRef = doc(db, "users", userId);

  try {
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const wishlist = userData.wishlist || [];
      const isDuplicate = wishlist.includes(furnitureId);

      if (isDuplicate) {
        return { success: true, isDuplicate: true };
      } else {
        await updateDoc(userRef, {
          wishlist: arrayUnion(furnitureId),
        });
        return { success: true, isDuplicate: false };
      }
    } else {
      console.error("User document does not exist.");
      return { success: false, isDuplicate: false };
    }
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return { success: false, isDuplicate: false };
  }
};

export const removeFromWishlist = async (userId, furnitureId) => {
  const userRef = doc(db, "users", userId);

  try {
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const wishlist = userData.wishlist || [];
      const isInWishlist = wishlist.includes(furnitureId);

      if (isInWishlist) {
        await updateDoc(userRef, {
          wishlist: arrayRemove(furnitureId),
        });
        return { success: true, isRemoved: true };
      } else {
        return {
          success: true,
          isRemoved: false,
          message: "Item not in wishlist.",
        };
      }
    } else {
      console.error("User document does not exist.");
      return { success: false, isRemoved: false };
    }
  } catch (error) {
    console.error("Error removing item from wishlist:", error);
    return { success: false, isRemoved: false };
  }
};

