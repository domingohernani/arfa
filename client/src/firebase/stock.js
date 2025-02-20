import {
  collection,
  getDocs,
  query,
  orderBy,
  Timestamp,
  addDoc,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { notifNewStock } from "./notification";

export const getStocks = async (furnitureId) => {
  try {
    const furnitureDocRef = doc(db, "furnitures", furnitureId);
    const furnitureDocSnapshot = await getDoc(furnitureDocRef);

    if (!furnitureDocSnapshot.exists()) {
      throw new Error("Furniture document not found");
    }

    const furnitureData = furnitureDocSnapshot.data();
    const variantLessStock = furnitureData.stock || 0;

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
      variantLessStock: variantLessStock,
    };
  } catch (error) {
    console.error("Error fetching stocks and variants: ", error);
    throw new Error("Failed to fetch stocks and variants");
  }
};

export const updateStockFromOrder = async (allOrders) => {
  try {
    for (const order of allOrders) {
      for (const item of order.items) {
        const furnitureRef = doc(db, "furnitures", item.id);
        const docSnapshot = await getDoc(furnitureRef);

        if (!docSnapshot.exists()) {
          console.warn(`Furniture item with ID ${item.id} not found.`);
          continue;
        }

        const furnitureData = docSnapshot.data();
        const { variants } = furnitureData;

        if (item.selectedVariant) {
          const variantIndex = variants.findIndex(
            (variant) => variant.name === item.selectedVariant
          );

          if (variantIndex > -1) {
            const updatedVariants = [...variants];
            updatedVariants[variantIndex].stock =
              (updatedVariants[variantIndex].stock || 0) - item.quantity;

            if (updatedVariants[variantIndex].stock < 0) {
              updatedVariants[variantIndex].stock = 0;
            }

            await updateDoc(furnitureRef, {
              variants: updatedVariants,
              stockUpdatedAt: new Date(),
            });
          } else {
            console.warn(
              `Variant "${item.selectedVariant}" not found for item ${item.id}.`
            );
          }
        } else {
          const newStock = (furnitureData.stock || 0) - item.quantity;

          await updateDoc(furnitureRef, {
            stock: newStock < 0 ? 0 : newStock,
            stockUpdatedAt: new Date(),
          });
        }
      }
    }

    return true;
  } catch (error) {
    console.error("Error updating stock:", error);
    return false;
  }
};

export const addStockVariantless = async (furnitureId, newStock) => {
  try {
    const furnitureDocRef = doc(db, "furnitures", furnitureId);

    const furnitureDocSnapshot = await getDoc(furnitureDocRef);

    if (!furnitureDocSnapshot.exists()) {
      throw new Error("Furniture document not found");
    }

    await updateDoc(furnitureDocRef, { stock: newStock });

    const name = furnitureDocSnapshot.data().name;
    await notifNewStock(furnitureId, name);

    console.log("Stock updated successfully:", newStock);
    return {
      success: true,
      message: "Stock updated successfully!",
      newStock,
    };
  } catch (error) {
    console.error("Error updating stock:", error);
    return { success: false, message: "Failed to update stock", error };
  }
};

export const addStockByVariantName = async (
  furnitureId,
  variantName,
  newStock
) => {
  try {
    const furnitureDocRef = doc(db, "furnitures", furnitureId);
    const furnitureDocSnapshot = await getDoc(furnitureDocRef);

    if (!furnitureDocSnapshot.exists()) {
      throw new Error("Furniture document not found");
    }

    const furnitureData = furnitureDocSnapshot.data();
    const variants = furnitureData.variants || [];

    const updatedVariants = variants.map((variant) => {
      if (variant.name === variantName) {
        return {
          ...variant,
          stock: newStock,
        };
      }
      return variant;
    });

    // Update the variants array in Firestore
    await updateDoc(furnitureDocRef, { variants: updatedVariants });
    const name = furnitureDocSnapshot.data().name;
    await notifNewStock(furnitureId, name);
    return { success: true, message: "Stock updated successfully!" };
  } catch (error) {
    console.error("Error updating stock:", error);
    return { success: false, message: "Failed to update stock", error };
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
      // Only include variant if selectedVariant is defined
      ...(selectedVariant && { variant: selectedVariant }),
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
