import {
  collection,
  getDocs,
  query,
  orderBy,
  Timestamp,
  addDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export const getStocks = async (furnitureId) => {
  try {
    const stocksCollection = collection(
      db,
      "furnitures",
      furnitureId,
      "stocks"
    );

    const stocksQuery = query(stocksCollection, orderBy("updatedAt", "desc"));

    const stockSnapshot = await getDocs(stocksQuery);

    const stockList = stockSnapshot.docs.map((doc) => ({
      id: furnitureId,
      ...doc.data(),
    }));

    return stockList;
  } catch (error) {
    console.error("Error fetching stocks: ", error);
    throw new Error("Failed to fetch stocks");
  }
};

export const addStock = async (
  furnitureId,
  newQuantity,
  oldQuantity,
  quantityChanged
) => {
  try {
    // Reference to the stocks subcollection for the given furniture ID
    const stocksCollectionRef = collection(
      db,
      "furnitures",
      furnitureId,
      "stocks"
    );

    const updatedAt = Timestamp.now();

    const docRef = await addDoc(stocksCollectionRef, {
      newQuantity,
      oldQuantity,
      quantityAdded: quantityChanged,
      updatedAt,
    });

    console.log("Stock added successfully with ID:", docRef.id);
    return {
      success: true,
      message: "Stock added successfully!",
      id: docRef.id,
    };
  } catch (error) {
    console.error("Error adding stock:", error);
    return { success: false, message: "Failed to add stock", error };
  }
};
