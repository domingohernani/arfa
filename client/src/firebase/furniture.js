import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  limit,
  startAfter,
  where,
} from "firebase/firestore";
import { db, storage } from "./firebase";
import { blobsToImagesPaths } from "../components/globalFunctions";
import { getDownloadURL, ref } from "firebase/storage";

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

// For inifit
export const fetchFurnitureCollectionInfiniteScrolling = async (
  collectionName,
  filters = [],
  pageParam = { lastDoc: null, pageSize: 10 }
) => {
  try {
    const collectionRef = collection(db, collectionName);
    let q = collectionRef;

    // Apply filters if provided
    if (filters.length > 0) {
      q = query(collectionRef, ...filters);
    }

    // Apply pagination (limit and startAfter)
    if (pageParam.lastDoc) {
      q = query(q, limit(pageParam.pageSize), startAfter(pageParam.lastDoc));
    } else {
      q = query(q, limit(pageParam.pageSize));
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
            documentData.shopId = shopDoc.id;
            documentData.shopDetails = {
              ...shopDoc.data(),
            };
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

    return {
      dataList,
      lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
    };
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

export const writeReview = async (furnitureId, reviewData) => {
  try {
    const reviewsCollectionRef = collection(
      doc(db, "furnitures", furnitureId),
      "reviews"
    );

    const reviewDoc = await addDoc(reviewsCollectionRef, {
      date: serverTimestamp(),
      title: reviewData.title,
      description: reviewData.description,
      rating: reviewData.rating,
      user: doc(db, "users", reviewData.userId),
    });

    return true;
  } catch (error) {
    console.error("Error writing review:", error);
    return false;
  }
};

export const getReview = async (furnitureId, userId) => {
  try {
    const userRef = doc(db, "users", userId);

    const reviewsRef = collection(
      doc(db, "furnitures", furnitureId),
      "reviews"
    );
    const reviewQuery = query(reviewsRef, where("user", "==", userRef));
    const querySnapshot = await getDocs(reviewQuery);

    if (!querySnapshot.empty) {
      const review = querySnapshot.docs[0].data();
      review.id = querySnapshot.docs[0].id;
      return review;
    }
    return null;
  } catch (error) {
    console.error("Error fetching review:", error);
    return null;
  }
};

export const updateReview = async (furnitureId, reviewId, updatedData) => {
  try {
    const reviewRef = doc(db, "furnitures", furnitureId, "reviews", reviewId);

    await updateDoc(reviewRef, updatedData);

    return true;
  } catch (error) {
    console.error("Error updating review:", error);
    return false;
  }
};

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

export const addFurniture = async (furnitureData, variants) => {
  try {
    // Create a reference to the specific shop document
    const shopRef = doc(db, "shops", furnitureData.ownerId);

    // Add the furniture data to the 'furnitures' collection
    const docRef = await addDoc(collection(db, "furnitures"), {
      ...furnitureData,
      shop: shopRef,
      createdAt: serverTimestamp(),
      stockUpdatedAt: serverTimestamp(),
      lower_case_name: furnitureData.name.toLowerCase(),
    });

    const { updatedVariants, imgPreviewFilename } = await blobsToImagesPaths(
      variants,
      docRef.id
    );

    await updateDoc(docRef, {
      id: docRef.id,
      imagesUrl: `images/${docRef.id}`,
      variants: updatedVariants,
      // fallback value ang pupuntahan if walang variant
      imgPreviewFilename: imgPreviewFilename || `${docRef.id}-1.jpg`,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding furniture: ", error);
    throw error;
  }
};

export const deleteFurniture = async (furnitureId) => {
  try {
    // Create a reference to the specific furniture document
    const docRef = doc(db, "furnitures", furnitureId);

    // Delete the document
    await deleteDoc(docRef);

    return true;
  } catch (error) {
    console.error("Error deleting furniture: ", error);
    throw error;
  }
};

export const deleteFurnitures = async (furnitureIds) => {
  try {
    if (!Array.isArray(furnitureIds)) {
      throw new Error("furnitureIds must be an array of IDs");
    }

    const deletePromises = furnitureIds.map((furnitureId) => {
      const docRef = doc(db, "furnitures", furnitureId);
      return deleteDoc(docRef);
    });

    // Wait for all deletions to complete
    await Promise.all(deletePromises);

    return true;
  } catch (error) {
    console.error("Error deleting furnitures: ", error);
    throw error;
  }
};

export const getOnSaleFurnitures = async () => {
  try {
    const furnituresRef = collection(db, "furnitures");
    const q = query(furnituresRef, where("isSale", "==", true), limit(4));
    const querySnapshot = await getDocs(q);

    const products = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const furnitureId = doc.id;
        const imgPreviewFilename = data.imgPreviewFilename;
        const imgPath = `images/${furnitureId}/${imgPreviewFilename}`;
        const imgUrl = await getDownloadURL(ref(storage, imgPath));

        return {
          id: furnitureId,
          name: data.name,
          price: data.price,
          discountedPrice: data.discountedPrice,
          isSale: data.isSale,
          reviewsData: data.reviewsData, // Ensure this exists in Firestore
          imgUrl,
        };
      })
    );

    return [...products, ...products];
  } catch (error) {
    console.error("Error fetching sale furnitures:", error);
    throw error;
  }
};
