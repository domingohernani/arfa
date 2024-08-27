import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useStore } from "../stores/useStore";

const SellerProtectedRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const { setLoggedUser } = useStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();

        if (userData?.role === "seller") {
          const q = query(
            collection(db, "shops"),
            where("userId", "==", userData.id)
          );
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const shopDoc = querySnapshot.docs[0];
            setLoggedUser({
              ...userData,
              shop: shopDoc.data(),
            });
          } else {
            console.error("No shop found for this user.");
          }

          setIsAuthenticated(true);
          setIsSeller(true);
        } else {
          setIsAuthenticated(true);
          setIsSeller(false);
        }
      } else {
        setIsAuthenticated(false);
        setIsSeller(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated && isSeller ? (
    <Outlet />
  ) : (
    <Navigate to={"/login-seller"} />
  );
};

export default SellerProtectedRoutes;
