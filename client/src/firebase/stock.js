import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // Ensure you have the correct Firebase setup

export const getStocks = async (furnitureId) => {
  try {
    const stocksCollection = collection(
      db,
      "furnitures",
      furnitureId,
      "stocks"
    );

    const stockSnapshot = await getDocs(stocksCollection);

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
