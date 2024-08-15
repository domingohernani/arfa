import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export const getUserInfo = async () => {
  try {
    // Initialize Firebase Auth and Firestore
    const auth = getAuth();
    const firestore = getFirestore();

    // Get the current logged-in user
    const user = auth.currentUser;

    if (user) {
      const uid = user.uid;

      // Reference the user's document in the "users" collection
      const userDocRef = doc(firestore, "users", uid);

      // Fetch the document
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // Return the user data
        return userDocSnap.data();
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
