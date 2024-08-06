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

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
};
