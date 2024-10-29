import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const getShopInfo = async (shopId) => {
  try {
    const shopRef = doc(db, "shops", shopId);
    const shopDoc = await getDoc(shopRef);

    if (shopDoc.exists()) {
      return shopDoc.data();
    } else {
      console.error("No such shop document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching shop information:", error);
    return null;
  }
};

export const getDelivery = async (shopId) => {
  try {
    const deliveryCollectionRef = collection(db, "shops", shopId, "delivery");

    const deliverySnapshot = await getDocs(deliveryCollectionRef);

    const deliveryData = deliverySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return deliveryData;
  } catch (error) {
    console.error("Error fetching delivery subcollection:", error);
    throw new Error("Failed to fetch delivery data");
  }
};

export const updateDeliveryFee = async (
  shopId,
  location,
  price,
  doDeliver,
  isFreeDelivery
) => {
  try {
    const deliveryDocRef = doc(db, "shops", shopId, "delivery", location);
    const deliveryDocSnap = await getDoc(deliveryDocRef);

    if (deliveryDocSnap.exists()) {
      await setDoc(
        deliveryDocRef,
        {
          location,
          price,
          doDeliver,
          isFreeDelivery,
        },
        { merge: true }
      );
    } else {
      await setDoc(deliveryDocRef, {
        location,
        price,
        doDeliver,
        isFreeDelivery,
      });
    }

    return {
      isSuccess: true,
      message: "Delivery document updated or created successfully.",
    };
  } catch (error) {
    console.error("Error updating or creating delivery document: ", error);
    return {
      isSuccess: false,
      message: "Failed to update or create delivery document.",
    };
  }
};
