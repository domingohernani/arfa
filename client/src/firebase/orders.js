import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import { db } from "./firebase";

export const fetchOrdersByShopId = async () => {
  try {
    const ordersCollection = collection(db, "orders");
    const ordersSnapshot = await getDocs(ordersCollection);

    const ordersList = await Promise.all(
      ordersSnapshot.docs.map(async (orderDoc) => {
        const shopperId = orderDoc.data().shopperId;
        const shopperDocRef = doc(db, "users", shopperId);
        const shopperDocSnap = await getDoc(shopperDocRef);
        const shopperData = shopperDocSnap.exists()
          ? shopperDocSnap.data()
          : null;
        const orderData = orderDoc.data();

        return {
          id: orderDoc.id,
          ...orderData,
          shopper: shopperData,
        };
      })
    );
    return ordersList;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};
