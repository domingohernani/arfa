import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";

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

export const getNotifNewStock = async (userId) => {
  try {
    const notificationsRef = collection(db, `users/${userId}/notifications`);

    const notificationsSnapshot = await getDocs(notificationsRef);

    const notifications = notificationsSnapshot.docs.map((notifDoc) => ({
      id: notifDoc.id,
      ...notifDoc.data(),
    }));

    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};
