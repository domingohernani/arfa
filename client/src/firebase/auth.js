// auth.js
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/useAuthStore";

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
  const userDoc = await getDoc(doc(db, "users", user.uid));

  if (!userDoc.exists()) {
    const role = "shopper";
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: role,
    });
    useAuthStore.getState().setUser({ ...user, role });
  } else {
    const role = userDoc.data().role;
    useAuthStore.getState().setUser({ ...user, role });
  }

  return result;
};

export const doSignOut = async () => {
  await firebaseSignOut(auth);
};
