import {
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  updateDoc,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { auth, db, storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const saveOrder = async (allOrders) => {
  try {
    let batch = writeBatch(db);
    let operationCount = 0;

    const commitBatch = async () => {
      await batch.commit();
      batch = writeBatch(db);
      operationCount = 0;
    };

    for (const order of allOrders) {
      const orderId = doc(collection(db, "orders")).id;
      const orderRef = doc(db, "orders", orderId);

      const orderData = {
        shopId: order.shopId,
        deliveryFee: order.deliveryFee,
        orderTotal: order.orderTotal,
        onDelivery: order.deliveryEnabled,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        modeOfPayment: "",
        orderStatus: "Placed",
        statusTimestamps: {
          Placed: serverTimestamp(),
        },
        shopperId: auth.currentUser?.uid || "",

        orderItems: order.items.map((item) => ({
          id: item.id || "",
          name: item.name,
          price: item.isSale ? item.discountedPrice : item.price,
          quantity: item.quantity,
          totalItemPrice:
            (item.isSale ? item.discountedPrice : item.price) * item.quantity,
          variant: item.selectedVariant || "",
        })),
      };

      batch.set(orderRef, orderData);
      operationCount++;

      if (operationCount >= 500) {
        await commitBatch();
      }
    }

    if (operationCount > 0) {
      await batch.commit();
    }

    return true;
  } catch (error) {
    console.error("Error saving orders to database:", error);
    return false;
  }
};

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
};

export const uploadPOD = async (orderId, file) => {
  if (!file) throw new Error("No file provided for upload.");

  try {
    const storageRef = ref(storage, `orders/${orderId}/${file.name}`);

    const snapshot = await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(snapshot.ref);
    const orderDocRef = doc(db, "orders", orderId);

    await updateDoc(orderDocRef, { proofOfDeliveryUrl: downloadURL });
    return downloadURL;
  } catch (error) {
    console.error("Error uploading Proof of Delivery:", error);
    throw error;
  }
};
