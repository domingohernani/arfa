import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export const notifNewStock = async (furnitureId, furnitureName) => {
  try {
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

    const randomNotification =
      notificationOptions[
        Math.floor(Math.random() * notificationOptions.length)
      ];

    const { title, message } = randomNotification;

    const notificationsRef = collection(
      db,
      `furnitures/${furnitureId}/notifications`
    );

    // Add the notification document
    await addDoc(notificationsRef, {
      title,
      message,
      furnitureId,
      furnitureName,
      type: "stock",
      timestamp: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error adding notification:", error);
    return false;
  }
};

export const getNotifNewStock = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
      throw new Error("User not found");
    }

    const cart = userDocSnapshot.data().cart || [];
    const notifications = [];

    for (const item of cart) {
      const furnitureId = item.furnitureId;

      const notificationsRef = collection(
        db,
        `furnitures/${furnitureId}/notifications`
      );
      const notificationsSnapshot = await getDocs(notificationsRef);

      notificationsSnapshot.forEach((notifDoc) => {
        notifications.push({
          id: notifDoc.id,
          furnitureId,
          ...notifDoc.data(),
        });
      });
    }

    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};
