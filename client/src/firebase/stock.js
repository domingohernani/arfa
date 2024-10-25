import {
  collection,
  getDocs,
  query,
  orderBy,
  Timestamp,
  addDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

export const getStocks = async (furnitureId) => {
  try {
    // First, get the furniture document to retrieve the variant information
    const furnitureDocRef = doc(db, "furnitures", furnitureId);
    const furnitureDocSnapshot = await getDoc(furnitureDocRef);

    if (!furnitureDocSnapshot.exists()) {
      throw new Error("Furniture document not found");
    }

    // Get the variant(s) from the furniture document
    const furnitureData = furnitureDocSnapshot.data();
    const variants = furnitureData.variants || []; // Assuming 'variants' is a field in the furniture document

    // Then, get the stock data from the stocks subcollection
    const stocksCollection = collection(
      db,
      "furnitures",
      furnitureId,
      "stocks"
    );
    const stocksQuery = query(stocksCollection, orderBy("updatedAt", "desc"));
    const stockSnapshot = await getDocs(stocksQuery);

    // Map stock data without joining the variants
    const stockList = stockSnapshot.docs.map((doc) => ({
      id: furnitureId,
      ...doc.data(), // Include stock data as is
    }));

    // Return both the stocks and variants as separate values
    return {
      stocks: stockList,
      variants, // Return variants as a separate array
    };
  } catch (error) {
    console.error("Error fetching stocks and variants: ", error);
    throw new Error("Failed to fetch stocks and variants");
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
