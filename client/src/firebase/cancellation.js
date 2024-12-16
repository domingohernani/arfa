import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";

export const addCancellation = async (orderId, reason) => {
  try {
    const cancellationRef = await addDoc(collection(db, "cancellations"), {
      orderId,
      reason,
      date: serverTimestamp(),
    });

    const orderDocRef = doc(db, "orders", orderId);
    const timestampField = `statusTimestamps.Cancelled`;

    await updateDoc(orderDocRef, {
      orderStatus: "Cancelled",
      [timestampField]: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: "pending",
    });

    console.log("Order cancelled and status updated successfully.");
    return cancellationRef.id;
  } catch (error) {
    console.error("Error adding cancellation or updating order status:", error);
    throw new Error("Failed to add cancellation or update order status.");
  }
};

export const getCancellations = async (orderId) => {
  try {
    const cancellationsRef = collection(db, "cancellations");
    const q = query(cancellationsRef, where("orderId", "==", orderId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error("Error fetching cancellations:", error);
    throw new Error("Failed to fetch cancellations.");
  }
};
