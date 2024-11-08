import { collection, getDoc, getDocs, doc, query, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export const fetchOrdersByShopId = async (filters = []) => {
  try {
    const ordersCollection = collection(db, "orders");

    let ordersQuery = ordersCollection;

    // Apply filters if provided
    if (filters.length > 0) {
      ordersQuery = query(ordersCollection, ...filters);
    }

    const ordersSnapshot = await getDocs(ordersQuery);

    const ordersList = await Promise.all(
      ordersSnapshot.docs.map(async (orderDoc) => {
        const shopperId = orderDoc.data().shopperId;
        const shopperDocRef = doc(db, "users", shopperId);
        const shopperDocSnap = await getDoc(shopperDocRef);
        const shopperData = shopperDocSnap.exists()
          ? shopperDocSnap.data()
          : null;
        const orderData = orderDoc.data();

        const createdAt = orderData.createdAt;
        let createdAtDate = "";
        let createdAtDateTime = "";

        if (createdAt && createdAt.seconds) {
          const date = new Date(
            createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000
          );
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");
          const hours = date.getHours().toString().padStart(2, "0");
          const minutes = date.getMinutes().toString().padStart(2, "0");
          const seconds = date.getSeconds().toString().padStart(2, "0");

          // Format as yyyy-mm-dd
          createdAtDate = `${year}-${month}-${day}`;

          // Format as yyyy-mm-ddThh:mm:ss for datetime-local input
          createdAtDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        }

        return {
          id: orderDoc.id,
          ...orderData,
          shopper: shopperData,
          createdAtDate,
          createdAtDateTime,
        };
      })
    );
    return ordersList;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

export const getOrderById = async (orderId) => {
  try {
    // Reference to the specific order document by ID
    const orderRef = doc(db, "orders", orderId);

    // Fetch the document
    const orderSnapshot = await getDoc(orderRef);

    if (orderSnapshot.exists()) {
      // Document data found
      const orderData = orderSnapshot.data();
      return { ...orderData, id: orderId };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching order:", error);
  }
};


export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const orderDocRef = doc(db, "orders", orderId);

    // Create a field path for the new status timestamp
    const timestampField = `statusTimestamps.${newStatus}`;

    await updateDoc(orderDocRef, {
      orderStatus: newStatus,
      [timestampField]: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Error updating order status:", error);
    return false;
  }
}