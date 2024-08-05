import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// Function to fetch all documents from a collection
export const fetchFurnitureCollection = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const dataList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return dataList;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};
