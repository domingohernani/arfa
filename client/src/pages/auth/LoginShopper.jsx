import React, { useState } from "react";
import {
  doSignInWithEmailAndPassword,
  doSigninWithGoogle,
  doSignOut,
} from "../../firebase/auth";
import useAuthStore from "../../store/useAuthStore"; // Ensure this path is correct
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";

const LoginShopper = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await doSignInWithEmailAndPassword(email, password);
      setUser(response);
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const loggedUser = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      console.log("No user is currently signed in");
    }
  };

  const logOut = async () => {
    try {
      const response = await doSignOut();
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  const loginUsingGoogle = async () => {
    try {
      const result = await doSigninWithGoogle();
      if (result.user) navigate("/");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div>
      <div>Login Shopper</div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button onClick={login} className="px-3 py-2 text-white bg-arfagreen">
        Login
      </button>

      <button
        className="px-3 py-2 text-white bg-arfagreen"
        onClick={loggedUser}
      >
        User
      </button>
      <button className="px-3 py-2 text-white bg-arfagreen" onClick={logOut}>
        Logout
      </button>
      <button
        className="px-3 py-2 text-white bg-arfagreen"
        onClick={loginUsingGoogle}
      >
        Login using Google
      </button>
    </div>
  );
};

export default LoginShopper;
