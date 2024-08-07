import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
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
