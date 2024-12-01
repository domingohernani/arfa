import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";

// Function to fetch the most recent tax document
export const getTax = async () => {
  try {
    const taxCollection = collection(db, "tax");
    const taxQuery = query(
      taxCollection,
      orderBy("updatedAt", "desc"),
      limit(1)
    );
    const querySnapshot = await getDocs(taxQuery);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } else {
      throw new Error("No tax documents found.");
    }
  } catch (error) {
    console.error("Error fetching the most recent tax document:", error);
    throw error;
  }
};

export const getCommissionRate = async () => {
  try {
    const commissionCollection = collection(db, "commission-rate");
    const commissionQuery = query(
      commissionCollection,
      orderBy("updatedAt", "desc"),
      limit(1)
    );
    const querySnapshot = await getDocs(commissionQuery);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } else {
      throw new Error("No commission rate documents found.");
    }
  } catch (error) {
    console.error(
      "Error fetching the most recent commission rate document:",
      error
    );
    throw error;
  }
};
