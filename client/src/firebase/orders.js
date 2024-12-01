import {
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  updateDoc,
  serverTimestamp,
  writeBatch,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { auth, db, storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { notifOrder } from "./notification";

const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/mobile/i.test(ua)) return "Mobile";
  if (/tablet/i.test(ua)) return "Tablet";
  return "Desktop";
};

// Function to get orders based on shopperId and filter
export const getShopperOrders = async (shopperId, filter) => {
  try {
    let ordersQuery;

    if (filter === "All Orders") {
      ordersQuery = query(
        collection(db, "orders"),
        where("shopperId", "==", shopperId),
        orderBy("createdAt", "desc")
      );
    } else if (filter === "In Process") {
      ordersQuery = query(
        collection(db, "orders"),
        where("shopperId", "==", shopperId),
        where("orderStatus", "!=", "Delivered"),
        where("orderStatus", "!=", "Picked-up"),
        orderBy("createdAt", "desc")
      );
    } else if (filter === "Completed") {
      ordersQuery = query(
        collection(db, "orders"),
        where("shopperId", "==", shopperId),
        where("orderStatus", "in", ["Delivered", "Picked-up"]),
        orderBy("createdAt", "desc")
      );
    }

    const querySnapshot = await getDocs(ordersQuery);
    const orders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return orders;
  } catch (error) {
    console.error("Error getting orders: ", error);
    return false;
  }
};

// Function to get the full image URL for each order item
// Function to get the full image URL for each order item
const getFurnitureImageUrl = async (orderItem) => {
  try {
    const furnitureDocRef = doc(db, "furnitures", orderItem.id);
    const furnitureSnapshot = await getDoc(furnitureDocRef);

    if (!furnitureSnapshot.exists()) {
      console.error(`Furniture with id ${orderItem.id} does not exist.`);
      return null;
    }

    const furnitureData = furnitureSnapshot.data();
    let imageUrl = "";

    if (furnitureData.variants && furnitureData.variants.length > 0) {
      // Variants exist, search for the matching variant
      const matchingVariant = furnitureData.variants.find(
        (variant) => variant.name === orderItem.variant
      );

      if (
        matchingVariant &&
        matchingVariant.imagePaths &&
        matchingVariant.imagePaths.length > 0
      ) {
        // Check if the first image path in variant is a full URL
        if (matchingVariant.imagePaths[0].startsWith("http")) {
          imageUrl = matchingVariant.imagePaths[0]; // Use the URL directly
        } else {
          // Construct the path if it's not a full URL
          const imageRef = ref(
            storage,
            `images/${orderItem.id}/${matchingVariant.imagePaths[0]}`
          );
          imageUrl = await getDownloadURL(imageRef); // Get the download URL from Firebase Storage
        }
      } else if (furnitureData.imgPreviewFilename) {
        // If no matching variant image found, fallback to imgPreviewFilename
        const imageRef = ref(
          storage,
          `images/${orderItem.id}/${furnitureData.imgPreviewFilename}`
        );
        imageUrl = await getDownloadURL(imageRef);
      }
    } else if (furnitureData.imgPreviewFilename) {
      // No variants, use imgPreviewFilename
      const imageRef = ref(
        storage,
        `images/${orderItem.id}/${furnitureData.imgPreviewFilename}`
      );
      imageUrl = await getDownloadURL(imageRef);
    }

    return imageUrl;
  } catch (error) {
    console.error("Error fetching furniture data:", error);
    return null;
  }
};

// Function to get the shop name based on shopId
const getShopName = async (shopId) => {
  try {
    const shopDocRef = doc(db, "shops", shopId);
    const shopSnapshot = await getDoc(shopDocRef);

    if (!shopSnapshot.exists()) {
      console.error(`Shop with id ${shopId} does not exist.`);
      return "Unknown Shop";
    }

    const shopData = shopSnapshot.data();

    return shopData.name || "Unnamed Shop";
  } catch (error) {
    console.error("Error fetching shop data:", error);
    return "Unknown Shop";
  }
};

// Main function to process orders, fetch images, and include shop name
const processOrdersWithImagesAndShopNames = async (orders) => {
  const processedOrders = await Promise.all(
    orders.map(async (order) => {
      // Fetch the shop name
      const shopName = await getShopName(order.shopId);

      // Process each order item to include the image URL
      const processedOrderItems = await Promise.all(
        order.orderItems.map(async (orderItem) => {
          const imageUrl = await getFurnitureImageUrl(orderItem);
          return { ...orderItem, imageUrl };
        })
      );

      // Include shop name in the order data
      return { ...order, orderItems: processedOrderItems, shopName };
    })
  );

  return processedOrders;
};

// Update getOrders to use the new processing function
export const getOrders = async (
  shopperId,
  filter,
  lastDoc = null,
  pageSize = 10
) => {
  try {
    let ordersQuery = query(
      collection(db, "orders"),
      where("shopperId", "==", shopperId),
      orderBy("createdAt", "desc"),
      limit(pageSize)
    );

    if (filter === "In Process") {
      ordersQuery = query(
        collection(db, "orders"),
        where("shopperId", "==", shopperId),
        where("orderStatus", "not-in", ["Delivered", "Picked-up", "Cancelled"]),
        orderBy("createdAt", "desc"),
        limit(pageSize)
      );
    } else if (filter === "Completed") {
      ordersQuery = query(
        collection(db, "orders"),
        where("shopperId", "==", shopperId),
        where("orderStatus", "in", ["Delivered", "Picked-up"]),
        orderBy("createdAt", "desc"),
        limit(pageSize)
      );
    } else if (filter === "Cancelled") {
      ordersQuery = query(
        collection(db, "orders"),
        where("shopperId", "==", shopperId),
        where("orderStatus", "==", "Cancelled"),
        orderBy("createdAt", "desc"),
        limit(pageSize)
      );
    }

    if (lastDoc) {
      ordersQuery = query(ordersQuery, startAfter(lastDoc));
    }

    const querySnapshot = await getDocs(ordersQuery);
    const lastVisible =
      querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    const orders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const processedOrders = await processOrdersWithImagesAndShopNames(orders);

    return { orders: processedOrders, lastVisible };
  } catch (error) {
    console.error("Error getting orders:", error);
    throw error;
  }
};

export const saveOrder = async (allOrders) => {
  try {
    let batch = writeBatch(db);
    let operationCount = 0;

    const commitBatch = async () => {
      await batch.commit();
      batch = writeBatch(db);
      operationCount = 0;
    };

    const deviceType = getDeviceType();

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
        refNumber: order.refNumber,
        shopperId: auth.currentUser?.uid || "",
        deviceType,

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

    await notifOrder(orderId, newStatus);
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
