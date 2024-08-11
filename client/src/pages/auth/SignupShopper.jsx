import React, { useState } from "react";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase/firebase";
// import useAuthStore from "../../store/useAuthStore";
import logo from "../../assets/logos/logo_black.svg";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";

const SignupShopper = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const setUser = useAuthStore((state) => state.setUser);
  // const user = useAuthStore((state) => state.user);

  const signup = async (e) => {
    e.preventDefault();

    try {
      const response = await doCreateUserWithEmailAndPassword(
        email,
        password,
        "shopper"
      );
      // setUser(response);
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
        // const userZustand = useAuthStore.getState().user;

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

  return (
    <div class="flex justify-center flex-row-reverse items-center h-screen">
      <div class="w-1/2 h-screen hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Room"
          class="object-cover w-full h-full"
        />
      </div>
      <div class="lg:p-32 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <img src={logo} alt="Arfa" className="py-4 mx-auto w-28" />
        <p>
          Join us today! Create an account to start your shopping journey with
          us. Your next great find is just a few clicks away!
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
        <div class="mt-6 text-blue-500 ">
          <Link
            className="text-sm underline text-arfagreen"
            to={"/login-shopper"}
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </div>

    // <div>
    //   <div>Shopper Sign Up</div>

    //   <div>
    //     <label htmlFor="email">Email</label>
    //     <input
    //       type="email"
    //       id="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       required
    //     />
    //   </div>
    //   <div>
    //     <label htmlFor="password">Password</label>
    //     <input
    //       type="password"
    //       id="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       required
    //     />
    //   </div>
    //   <button
    //     className="px-3 py-2 text-white cursor-pointer bg-arfagreen"
    //     onClick={signup}
    //   >
    //     Sign Up
    //   </button>

    // </div>
  );
};

export default SignupShopper;
