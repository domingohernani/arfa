// auth.js
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
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
  role,
  firstName,
  lastName,
  phoneNumber
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    cart: [],
    email: user.email,
    firstName: firstName,
    id: user.uid,
    lastName: lastName,
    location: {
      barangay: null,
      city: null,
      province: null,
      region: null,
      street: null,
    },
    phoneNumber: phoneNumber,
    profileUrl: null,
    role: role,
    wishlist: [],
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

  // Sign in with Google
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // Fetch the user's document from Firestore
  const userDocRef = doc(db, "users", user.uid);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) {
    console.error("No account found. Please sign up first.");
    return false;
  }

  // If the user exists, retrieve their role and other details
  const userData = userDocSnap.data();
  const role = userData.role;

  // Return the user along with the role and other details
  return {
    user: user,
    role: role,
  };
};

export const doSignupWithGoogle = async (userRole) => {
  const provider = new GoogleAuthProvider();

  // Sign in with Google
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // Fetch the user's document from Firestore
  const userDocRef = doc(db, "users", user.uid);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    // If the user already exists, you may want to throw an error or return a message
    throw new Error("User already exists. Please sign in.");
  }

  // Extracting the first name and last name from the display name
  const displayName = user.displayName || "";
  const [firstName = "", lastName = ""] = displayName.split(" ");

  // If the user does not exist, create a new document with the provided role and other details
  await setDoc(userDocRef, {
    cart: [],
    email: user.email,
    firstName: firstName,
    id: user.uid,
    lastName: lastName,
    location: {
      barangay: null,
      city: null,
      province: null,
      region: null,
      street: null,
    },
    phoneNumber: null,
    profileUrl: user.reloadUserInfo.photoUrl || null,
    role: userRole,
    wishlist: [],
  });

  // Return the user along with the role and other details
  return {
    user: user,
    role: userRole,
  };
};

export const doSigninWithFacebook = async () => {
  const provider = new FacebookAuthProvider();

  // Sign in with Facebook
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // Fetch the user's document from Firestore
  const userDocRef = doc(db, "users", user.uid);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) {
    // If the user does not exist, throw an error or return a specific message
    console.error("No account found. Please sign up first.");
    return false;
  }

  // If the user exists, retrieve their role and other details
  const userData = userDocSnap.data();
  const role = userData.role;

  // Return the user along with the role and other details
  return {
    user: user,
    role: role,
  };
};

export const doSignupWithFacebook = async (userRole) => {
  const provider = new FacebookAuthProvider();

  // Sign in with Facebook
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // Fetch the user's document from Firestore
  const userDocRef = doc(db, "users", user.uid);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    // If the user already exists, you may want to throw an error or return a message
    throw new Error("User already exists. Please sign in.");
  }

  // Extracting the first name and last name from the display name
  const displayName = user.displayName || "";
  const [firstName = "", lastName = ""] = displayName.split(" ");

  // If the user does not exist, create a new document with the provided role and other details
  await setDoc(userDocRef, {
    cart: [],
    email: user.email,
    firstName: firstName,
    id: user.uid,
    lastName: lastName,

    location: {
      barangay: null,
      city: null,
      province: null,
      region: null,
      street: null,
    },
    phoneNumber: null,
    profileUrl: user.reloadUserInfo.photoUrl || null,
    role: userRole,
    wishlist: [],
  });

  // Return the user along with the role and other details
  return {
    user: user,
    role: userRole,
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
