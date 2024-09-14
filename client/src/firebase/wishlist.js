import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "./firebase";

export const addToWishlist = async (userId, furnitureId) => {
  const userRef = doc(db, "users", userId);

  console.log("user ID", userId);
  console.log("furnitureId ID", furnitureId);
  

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
