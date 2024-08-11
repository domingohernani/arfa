import React, { useState } from "react";
import {
  doSignInWithEmailAndPassword,
  doSigninWithGoogle,
  doSignOut,
} from "../../firebase/auth";
// import useAuthStore from "../../store/useAuthStore";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import logo from "../../assets/logos/logo_black.svg";

const LoginShopper = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await doSignInWithEmailAndPassword(email, password);
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
    <div class="flex justify-center items-center h-screen">
      <div class="w-1/2 h-screen hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1622527561244-74e49a3878a1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Room"
          class="object-cover w-full h-full"
        />
      </div>
      <div class="lg:p-32 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <img src={logo} alt="Arfa" className="py-4 mx-auto w-28" />
        <p>
          Welcome Back! Sign in to access your account to continue your shopping
          journey with us.
        </p>
        <form action="#" method="POST">
          <div class="mb-4">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter you email"
              className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
            />
          </div>
          <div class="mb-4 relative">
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="text"
              id="password"
              placeholder="Enter you password"
              className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
            />
            <EyeSlashIcon
              className="absolute right-0 w-5 h-5 ml-auto mr-1 text-gray-300 cursor-pointer bottom-3 hover:text-gray-500"
              aria-hidden="true"
            ></EyeSlashIcon>
            <EyeIcon
              className="absolute right-0 hidden w-5 h-5 ml-auto mr-1 text-gray-300 cursor-pointer bottom-3 hover:text-gray-500"
              aria-hidden="true"
            ></EyeIcon>
          </div>
          <section className="flex items-center justify-between gap-2 mt-5">
            <button className="flex-1 px-4 py-2 text-sm font-medium text-white transition rounded-md bg-arfagreen hover:text-white">
              Sign in
            </button>
          </section>
        </form>
        <div class="mt-6 text-blue-500">
          <Link
            className="text-sm underline text-arfagreen"
            to={"/signup-shopper"}
          >
            Don't have an account?
          </Link>
        </div>
      </div>
    </div>
  );

  {
    /* <div>
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
  */
  }
};

export default LoginShopper;
