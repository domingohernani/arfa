import React, { useState } from "react";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase/firebase";
import useAuthStore from "../../store/useAuthStore";

const SignupShopper = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async (e) => {
    e.preventDefault();

    try {
      const response = await doCreateUserWithEmailAndPassword(
        email,
        password,
        "shopper"
      );
      console.log(response);
      alert("Account Created");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const showLoggedUser = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        const userZustand = useAuthStore.getState().user;

        if (userDoc.exists()) {
          console.log("User Data:", userDoc.data());
          console.log("From Zustand", userZustand.role);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      console.log("No user is currently signed in");
    }
  };

  return (
    <div>
      <form onSubmit={signup}>
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
        <input
          className="px-3 py-2 text-white cursor-pointer bg-arfagreen"
          type="submit"
          value="Sign Up"
        />
      </form>

      <input
        className="px-3 py-2 text-white cursor-pointer bg-arfagreen"
        type="button"
        value="Show User Details"
        onClick={showLoggedUser}
      />
    </div>
  );
};

export default SignupShopper;
