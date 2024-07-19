// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2XDFTtgpmOM_hEzinZfaGmJtvd-CkO24",
  authDomain: "aria-16a4d.firebaseapp.com",
  projectId: "aria-16a4d",
  storageBucket: "aria-16a4d.appspot.com",
  messagingSenderId: "121696785605",
  appId: "1:121696785605:web:f2df458875c9ad84b68cac",
  measurementId: "G-E2XGE1BMJQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
