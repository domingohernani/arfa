import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

export const getUserInfo = async () => {
  try {
    const auth = getAuth();
    const firestore = getFirestore();

    const user = auth.currentUser;

    if (user) {
      const uid = user.uid;

      // Reference the user's document in the "users" collection
      const userDocRef = doc(firestore, "users", uid);

      // Fetch the document
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // Return the document data along with the document ID
        return {
          ...userDocSnap.data(),
        };
      } else {
        console.log("No such document!");
        return null;
      }
    } else {
      console.log("No user is logged in");
      return null;
    }
  } catch (error) {
    console.error("Error getting user info:", error);
    return null;
  }
};

export const getLoggedShopInfo = async () => {
  try {
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not logged in");
    }

    const userId = user.uid;

    const shopsRef = collection(db, "shops");
    const q = query(shopsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Shop information not found");
    }

    let shopInfo = null;
    querySnapshot.forEach((doc) => {
      shopInfo = doc.data();
    });

    return shopInfo;
  } catch (error) {
    console.error("Error fetching shop information:", error);
    throw error;
  }
};
