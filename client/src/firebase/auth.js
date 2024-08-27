// auth.js
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updatePassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const doCreateUserWithEmailAndPassword = async (
  email,
  password,
  role
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    id: user.uid,
    email: user.email,
    role: role,
  });
  const userData = { ...user, role };
  return userData;
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  const userDoc = await getDoc(doc(db, "users", user.uid));
  const role = userDoc.exists() ? userDoc.data().role : null;
  const userData = { ...user, role };
  return userData;
};

export const doSigninWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // Fetch the user's document from Firestore
  const userDocRef = doc(db, "users", user.uid);
  const userDocSnap = await getDoc(userDocRef);

  let role;

  if (!userDocSnap.exists()) {
    // If user does not exist, assign a default role and store it in Firestore
    role = "shopper";
    await setDoc(userDocRef, {
      email: user.email,
      role: role,
    });
  } else {
    // If user exists, retrieve their role
    role = userDocSnap.data().role;
  }

  // Return the user along with the role
  return {
    user: user,
    role: role,
  };
};

export const doSignOut = async () => {
  await firebaseSignOut(auth);
};

// export const doPasswordReset = (email) => {
//   return sendPasswordResetEmail(auth, email);
// };

// export const doPasswordChange = (password) => {
//   return updatePassword(auth.currentUser, password);
// };

// export const doSendEmailVerification = () => {
//   return sendEmailVerification(auth.currentUser, {
//     url: `${window.location.origin}/home`,
//   });
// };
