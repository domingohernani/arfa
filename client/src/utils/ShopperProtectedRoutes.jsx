import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const ShopperProtectedRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isShopper, setIsShopper] = useState(false);
  const navigate = useNavigate("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      const verifyUserEmail = () => {
        if (!user.emailVerified) {
          navigate("email-verification");
          return;
        }
      };
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();

        if (userData?.role === "shopper") {
          verifyUserEmail();
          setIsAuthenticated(true);
          setIsShopper(true);
        } else {
          setIsAuthenticated(true);
          setIsShopper(false);
        }
      } else {
        setIsAuthenticated(false);
        setIsShopper(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated && isShopper ? (
    <Outlet />
  ) : (
    <Navigate to={"/login-shopper"} />
  );
};

export default ShopperProtectedRoutes;
