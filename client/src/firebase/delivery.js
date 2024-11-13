import { db } from "./firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

export const getDeliveryFee = async (shopId, userRegion) => {
  try {
    const deliveryRef = doc(db, `shops/${shopId}/delivery`, userRegion);
    const deliverySnapshot = await getDoc(deliveryRef);

    if (deliverySnapshot.exists()) {
      const deliveryData = deliverySnapshot.data();

      if (deliveryData.doDeliver) {
        return deliveryData.isFreeDelivery ? 0 : deliveryData.price;
      } else {
        return null;
      }
    } else {
      console.warn("Delivery data not found for this region.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching delivery fee:", error);
    return null;
  }
};

export const updateCartQuantity = async (
  userId,
  furnitureId,
  variant,
  sellerId,
  newQuantity
) => {
  try {
    const userCartRef = doc(db, "users", userId);
    const userDoc = await getDoc(userCartRef);

    if (userDoc.exists()) {
      const cartItems = userDoc.data().cart || [];

      // Find the item in the cart
      const itemToUpdate = cartItems.find(
        (item) =>
          item.furnitureId === furnitureId &&
          item.variant === variant &&
          item.sellerId === sellerId
      );

      if (itemToUpdate) {
        // Remove the old item
        await updateDoc(userCartRef, {
          cart: arrayRemove(itemToUpdate),
        });

        // Add the updated item with the new quantity
        const updatedItem = {
          ...itemToUpdate,
          quantity: newQuantity,
        };

        await updateDoc(userCartRef, {
          cart: arrayUnion(updatedItem),
        });
      } else {
        console.error("Item not found in the cart.");
      }
    } else {
      console.error("User document does not exist.");
    }
  } catch (error) {
    console.error("Error updating cart quantity:", error);
  }
};
