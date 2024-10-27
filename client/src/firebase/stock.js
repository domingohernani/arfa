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
    const furnitureDocRef = doc(db, "furnitures", furnitureId);
    const furnitureDocSnapshot = await getDoc(furnitureDocRef);

    if (!furnitureDocSnapshot.exists()) {
      throw new Error("Furniture document not found");
    }

    const furnitureData = furnitureDocSnapshot.data();
    const variants = furnitureData.variants || [];

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

    return {
      stocks: stockList,
      variants,
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
  quantityChanged,
  selectedVariant
) => {
  try {
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
      variant: selectedVariant,
    });

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
