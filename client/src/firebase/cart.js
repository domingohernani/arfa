import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "./firebase";

export const addToCart = async (userId, furnitureId, variant) => {
  const userRef = doc(db, "users", userId);

  try {
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const cart = userData.cart || [];

      const isDuplicate = cart.some(
        (item) => item.furnitureId === furnitureId && item.variant === variant
      );

      if (isDuplicate) {
        return { success: true, isDuplicate: true };
      } else {
        await updateDoc(userRef, {
          cart: arrayUnion({ furnitureId, variant }),
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
