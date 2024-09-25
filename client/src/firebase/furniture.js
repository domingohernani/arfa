import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

// Function to fetch all documents from a collection
export const fetchFurnitureCollection = async (
  collectionName,
  filters = []
) => {
  try {
    const collectionRef = collection(db, collectionName);
    let q = collectionRef;

    if (filters.length > 0) {
      q = query(collectionRef, ...filters);
    }
    const querySnapshot = await getDocs(q);

    const dataList = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const documentData = {
          id: doc.id,
          ...doc.data(),
        };

        // Format the createdAt timestamp to yyyy-mm-dd
        if (documentData.createdAt) {
          const createdAt = documentData.createdAt.toDate(); // Convert Firestore Timestamp to JavaScript Date
          documentData.createdAtDate = createdAt.toISOString().split("T")[0]; // Format to yyyy-mm-dd
        }

        const reviewsData = await getReviewCollections(doc.ref);
        documentData.reviewsData = reviewsData;

        if (documentData.shop) {
          const shopDoc = await getDoc(documentData.shop);

          if (shopDoc.exists()) {
            (documentData.shopId = shopDoc.id),
              (documentData.shopDetails = {
                // id: shopDoc.id,
                ...shopDoc.data(),
              });
          } else {
            documentData.shopDetails = null;
            documentData.shopId = null;
          }
        } else {
          documentData.shopDetails = null;
          documentData.shopId = null;
        }
        return documentData;
      })
    );
    return dataList;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export const fetchFurnitureById = async (collectionName, documentId) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log("No such document!");
      return null;
    }
    const documentData = docSnap.data();
    documentData.id = docSnap.id;

    const reviewsData = await getReviewCollections(docRef);
    documentData.reviewsData = reviewsData;

    if (documentData.shop) {
      const shopRef = documentData.shop;
      const shopSnap = await getDoc(shopRef);
      if (shopSnap.exists()) {
        documentData.shopData = shopSnap.data();
      } else {
        console.log("No such shop document!");
      }
    }
    return documentData;
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
};

const getReviewCollections = async (docRef) => {
  try {
    const subCollectionsData = {};
    const reviewsCollectionRef = collection(docRef, "reviews");
    const collectionsSnap = await getDocs(reviewsCollectionRef);

    for (const subDoc of collectionsSnap.docs) {
      const reviewData = subDoc.data();
      reviewData.id = subDoc.id;

      // Fetch user data for each review
      if (reviewData.user) {
        const userRef = reviewData.user;
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          reviewData.userData = userSnap.data();
        } else {
          console.log("No such user document!");
        }
      }
      subCollectionsData[reviewData.id] = reviewData;
    }
    return subCollectionsData;
  } catch (error) {
    console.error("Error fetching sub-collections:", error);
    return {};
  }
};

// Function to update a furniture document
export const updateFurniture = async (furnitureId, updatedData) => {
  try {
    const furnitureRef = doc(db, "furnitures", furnitureId);
    await updateDoc(furnitureRef, updatedData);
    return {
      message: "Furniture document updated successfully.",
      isSuccess: true,
    };
  } catch (error) {
    return {
      message: `Failed to update furniture document: ${error.message}`,
      isSuccess: false,
    };
  }
};

export const updateStock = async (furnitureId, newStock) => {
  try {
    const furnitureDocRef = doc(db, "furnitures", furnitureId);

    // Update the 'stock' and 'stockUpdatedAt' properties
    await updateDoc(furnitureDocRef, {
      stock: parseInt(newStock),
      stockUpdatedAt: serverTimestamp(), // Set to the current timestamp
    });
    return true;
  } catch (error) {
    console.error("Error updating stock: ", error);
    return false;
  }
};

export const addFurniture = async (furnitureData) => {
  try {
    // Create a reference to the specific shop document
    const shopRef = doc(db, "shops", furnitureData.ownerId);

    // Add the furniture data to the 'furnitures' collection
    const docRef = await addDoc(collection(db, "furnitures"), {
      ...furnitureData,
      shopReference: shopRef,
      createdAt: serverTimestamp(),
      stockUpdatedAt: serverTimestamp(),
    });

    await updateDoc(docRef, {
      id: docRef.id,
    });

    console.log("Furniture added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding furniture: ", error);
    throw error;
  }
};

