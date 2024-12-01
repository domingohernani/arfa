import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export const addCancellation = async (orderId, reason) => {
  try {
    const cancellationRef = await addDoc(collection(db, "cancellations"), {
      orderId,
      reason,
      date: serverTimestamp(),
    });

    return cancellationRef.id;
  } catch (error) {
    console.error("Error adding cancellation:", error);
    throw new Error("Failed to add cancellation.");
  }
};
