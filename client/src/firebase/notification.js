import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  doc,
  query,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { useInfiniteQuery } from "@tanstack/react-query";

export const notifNewStock = async (furnitureId, furnitureName) => {
  try {
    const usersRef = collection(db, "users");
    const usersSnapshot = await getDocs(usersRef);

    const notificationOptions = [
      {
        title: "New Stock Available!",
        message: `Great news! ${furnitureName} is now back in stock. Hurry before it sells out!`,
      },
      {
        title: "Restocked Item Alert",
        message: `We've just restocked ${furnitureName}. Check it out now!`,
      },
      {
        title: "Fresh Stock Alert",
        message: `More ${furnitureName} just arrived! Grab it while supplies last.`,
      },
      {
        title: "Limited Stock Added",
        message: `Only a few pieces of ${furnitureName} are now available. Don't miss out!`,
      },
      {
        title: "Your Favorite Item is Back",
        message: `The ${furnitureName} you loved is back in stock. Order now!`,
      },
    ];

    for (const userDoc of usersSnapshot.docs) {
      const userId = userDoc.id;
      const userData = userDoc.data();

      const userWishlist = userData.wishlist || []; // Replace "wishlist" with the actual field name
      if (userWishlist.includes(furnitureId)) {
        try {
          const randomNotification =
            notificationOptions[
              Math.floor(Math.random() * notificationOptions.length)
            ];
          const { title, message } = randomNotification;

          const notificationsRef = collection(
            db,
            `users/${userId}/notifications`
          );
          await addDoc(notificationsRef, {
            title,
            message,
            furnitureId,
            furnitureName,
            type: "stock",
            timestamp: serverTimestamp(),
          });
        } catch (error) {
          console.error(`Error adding notification for user ${userId}:`, error);
        }
      }
    }

    console.log("Notifications sent successfully.");
    return true;
  } catch (error) {
    console.error("Error sending notifications:", error);
    return false;
  }
};

const statusNotificationOptions = {
  Placed: {
    icon: "ShoppingCartIcon",
    title: "Order Placed Successfully 🎉",
    message:
      "Your order has been placed successfully. We're getting things started!",
  },
  Confirmed: {
    icon: "CheckCircleIcon",
    title: "Order Confirmed ✅",
    message: "Good news! Your order has been confirmed by the seller.",
  },
  Preparing: {
    icon: "CogIcon",
    title: "Preparing Your Order 🛠️",
    message:
      "Your order is being prepared. Our team is carefully packing or assembling your items.",
  },
  Ready: {
    icon: "TruckIcon",
    title: "Order Ready 🚚",
    message:
      "Your order is ready for pick-up or delivery. Get ready to receive it soon!",
  },
  "Out for Delivery": {
    icon: "TruckIcon",
    title: "Out for Delivery 🚛",
    message: "Your order is on its way. Keep an eye out for our delivery team!",
  },
  Delivered: {
    icon: "HomeIcon",
    title: "Order Delivered 🎁",
    message:
      "Hooray! Your order has been delivered. We hope you love your new items!",
  },
  "Picked-up": {
    icon: "ArrowUpTrayIcon",
    title: "Order Picked Up 🛍️",
    message:
      "Thank you! You have successfully picked up your order from the store.",
  },
};

export const notifOrder = async (orderId, status) => {
  const statusDetails = statusNotificationOptions[status];

  if (!statusDetails) {
    console.error(`Unknown status: "${status}"`);
    return;
  }

  const notification = {
    title: statusDetails.title,
    message: `${statusDetails.message} (Order #${orderId})`,
    icon: statusDetails.icon,
    type: "order",
    orderId,
    timestamp: serverTimestamp(),
  };

  try {
    const orderRef = doc(db, "orders", orderId);
    const notificationsRef = collection(orderRef, "notifications");

    await addDoc(notificationsRef, notification);
    console.log("Notification added to Firestore:", notification);
  } catch (error) {
    console.error("Error adding notification to Firestore:", error);
  }
};

export const getAllNotif = async (userId) => {
  try {
    const userNotificationsRef = collection(
      db,
      `users/${userId}/notifications`
    );
    const userNotificationsSnapshot = await getDocs(userNotificationsRef);

    const userNotifications = userNotificationsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const ordersRef = collection(db, "orders");
    const ordersSnapshot = await getDocs(ordersRef);

    const orderNotifications = [];

    for (const orderDoc of ordersSnapshot.docs) {
      const notificationsRef = collection(
        db,
        `orders/${orderDoc.id}/notifications`
      );
      const notificationsSnapshot = await getDocs(notificationsRef);

      const notifications = notificationsSnapshot.docs.map((doc) => ({
        id: doc.id,
        orderId: orderDoc.id,
        ...doc.data(),
      }));

      orderNotifications.push(...notifications);
    }

    // Combine all notifications
    const combinedNotifications = [...userNotifications, ...orderNotifications];

    // Sort by timestamp (newest first)
    combinedNotifications.sort(
      (a, b) =>
        (b.timestamp?.toMillis?.() || 0) - (a.timestamp?.toMillis?.() || 0)
    );

    return combinedNotifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

export const fetchNotifications = async (
  userId,
  pageSize = 10,
  cursor = null
) => {
  try {
    // Fetch stock notifications with pagination
    const userNotificationsRef = collection(
      db,
      `users/${userId}/notifications`
    );
    let stockNotifQuery = query(
      userNotificationsRef,
      orderBy("timestamp", "desc"),
      limit(pageSize)
    );

    if (cursor) {
      stockNotifQuery = query(
        userNotificationsRef,
        orderBy("timestamp", "desc"),
        startAfter(cursor),
        limit(pageSize)
      );
    }

    const stockSnapshot = await getDocs(stockNotifQuery);

    const stockNotifications = stockSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Fetch order notifications for the user (no pagination applied)
    const ordersRef = collection(db, "orders");
    const ordersSnapshot = await getDocs(ordersRef);

    const orderNotifications = [];

    for (const orderDoc of ordersSnapshot.docs) {
      const notificationsRef = collection(
        db,
        `orders/${orderDoc.id}/notifications`
      );
      const notificationsSnapshot = await getDocs(notificationsRef);

      const notifications = notificationsSnapshot.docs.map((doc) => ({
        id: doc.id,
        orderId: orderDoc.id,
        ...doc.data(),
      }));

      orderNotifications.push(...notifications);
    }

    // Combine stock and order notifications
    const combinedNotifications = [
      ...stockNotifications,
      ...orderNotifications,
    ];

    // Sort by timestamp
    combinedNotifications.sort(
      (a, b) =>
        (b.timestamp?.toMillis?.() || 0) - (a.timestamp?.toMillis?.() || 0)
    );

    return {
      notifications: combinedNotifications,
      lastVisible: stockSnapshot.docs[stockSnapshot.docs.length - 1] || null, // Return cursor for stock notifications
    };
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return { notifications: [], lastVisible: null };
  }
};

export const useNotifications = () => {
  const user = auth.currentUser;

  return useInfiniteQuery({
    queryKey: ["notifications", user?.uid],
    queryFn: ({ pageParam = null }) =>
      fetchNotifications(user?.uid, 10, pageParam), // Fetch 10 notifications per page
    getNextPageParam: (lastPage) => lastPage.lastVisible || null, // Provide cursor for next page
    enabled: !!user, // Enable query only when user is logged in
  });
};
