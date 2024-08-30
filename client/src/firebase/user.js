import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export const getUserInfo = async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const uid = user.uid;

          // Reference the user's document in the "users" collection
          const userDocRef = doc(db, "users", uid);

          // Fetch the document
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            // Resolve the promise with the document data
            resolve({
              ...userDocSnap.data(),
            });
          } else {
            console.log("No such document!");
            resolve(null);
          }
        } catch (error) {
          console.error("Error getting user info:", error);
          reject(error);
        }
      } else {
        console.log("No user is logged in");
        resolve(null);
      }
    });
  });
};

export const getLoggedShopInfo = async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userId = user.uid;

          const shopsRef = collection(db, "shops");
          const q = query(shopsRef, where("userId", "==", userId));
          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            console.error("Shop information not found");
            resolve(null);
            return;
          }

          let shopInfo = null;
          querySnapshot.forEach((doc) => {
            shopInfo = doc.data();
          });

          resolve(shopInfo);
        } catch (error) {
          console.error("Error fetching shop information:", error);
          reject(error);
        }
      } else {
        console.error("User not logged in");
        resolve(null);
      }
    });
  });
};

export const createShopDocument = async (shopData) => {
  try {
    // Create a new document in the `shops` collection
    const shopRef = doc(firestore, "shops", shopData.userId); // Use userId as the document ID
    // Set the document data
    await setDoc(shopRef, {
      address: {
        barangay: shopData.barangay,
        city: shopData.city,
        province: shopData.province,
        street: shopData.street,
      },
      furnitures: [], // Initialize with an empty array if no furniture is provided
      name: shopData.name,
      userId: shopData.userId,
      validId: shopData.validId, // Adding validId
      businessPermit: shopData.businessPermit, // Adding businessPermit
    });

    console.log("Shop document created successfully:", shopData);
  } catch (error) {
    console.error("Error creating shop document:", error);
    throw error;
  }
};
