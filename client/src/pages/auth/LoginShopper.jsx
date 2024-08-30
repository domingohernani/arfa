import React, { useState } from "react";
import {
  doSignInWithEmailAndPassword,
  doSigninWithFacebook,
  doSigninWithGoogle,
  doSignOut,
} from "../../firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import logo from "../../assets/logos/logo_black.svg";
import google from "../../assets/icons/google.png";
import facebook from "../../assets/icons/facebook.png";
import { toast, Toaster } from "react-hot-toast";
import loginimg from "../../assets/images/signin.png";

const LoginShopper = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginEmailAndPassword = async (e) => {
    e.preventDefault();
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const response = await doSignInWithEmailAndPassword(email, password);

      console.log(response.role);

      if (response.role == "shopper") {
        navigate("/catalog");
      } else if (response.role == "seller") {
        toast.error(
          "Failed to log in. Please ensure you are using the correct seller account"
        );
      }
    } catch (error) {
      console.log(error);

      if (error.code === "auth/invalid-credential") {
        toast.error(
          "Invalid credentials. Please check your email and password."
        );
      } else if (
        error.code === "auth/account-exists-with-different-credential"
      ) {
        toast.error("Account exists with different credential");
      } else {
        toast.error("Error signing in. Please try again later.");
      }
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const result = await doSigninWithGoogle();

      if (!result) {
        toast.error("Account not registered. Please sign up first.");
        return;
      }

      if (result.role == "shopper") {
        navigate("/catalog");
      } else if (result.role == "seller") {
        toast.error(
          "Failed to log in. Please ensure you are using the correct shopper account"
        );
      }
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        toast.error("Account exists with different credential");
      } else {
        toast.error("Error signing in with Google. Please try again later.");
        console.error("Error signing in with Google:", error);
      }
    }
  };

  const loginUsingFacebook = async () => {
    try {
      const result = await doSigninWithFacebook();

      if (!result) {
        toast.error("Account not registered. Please sign up first.");
        return;
      }

      if (result.role == "shopper") {
        navigate("/catalog");
      } else if (result.role == "seller") {
        toast.error(
          "Failed to log in. Please ensure you are using the correct shopper account"
        );
      }
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        toast.error("Account exists with different credential");
      } else {
        toast.error("Error signing in with Facebook. Please try again later.");
        console.error("Error signing in with Facebook:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="hidden w-1/2 h-screen lg:block">
        <img
          srcSet={loginimg}
          alt="Room"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-full p-8 lg:p-20 md:p-52 sm:p-20 lg:w-1/2">
        <img src={logo} alt="Arfa" className="py-4 mx-auto w-28" />
        <h4 className="font-semibold">Sign in</h4>
        <p className="text-sm">
          Welcome Back! Sign in to access your account to continue your shopping
          journey with us.
        </p>
        <form onSubmit={loginEmailAndPassword}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
            />
            {!showPassword ? (
              <EyeSlashIcon
                onClick={togglePasswordVisibility}
                className="absolute right-0 w-5 h-5 ml-auto mr-1 text-gray-300 cursor-pointer bottom-3 hover:text-gray-500"
                aria-hidden="true"
              />
            ) : (
              <EyeIcon
                onClick={togglePasswordVisibility}
                className="absolute right-0 w-5 h-5 ml-auto mr-1 text-gray-300 cursor-pointer bottom-3 hover:text-gray-500"
                aria-hidden="true"
              />
            )}
          </div>
          <section className="flex items-center justify-between gap-2 mt-5">
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-sm font-medium text-white transition rounded-md bg-arfagreen hover:text-white"
            >
              Sign in
            </button>
          </section>
        </form>
        <div className="mt-6 text-blue-500">
          <Link
            className="text-sm underline text-arfagreen"
            to={"/signup-shopper"}
          >
            Don't have an account?
          </Link>
        </div>
        <p className="mt-4 text-sm text-center">Or sign in using:</p>
        <section className="flex flex-col items-center gap-3 mt-3">
          <div
            onClick={handleLoginWithGoogle}
            className="flex items-center justify-center w-3/4 gap-3 py-2 border rounded-md cursor-pointer min-w-24"
          >
            <img src={google} className="w-4 h-4" alt="google" />
            <span className="text-sm text-blue-600">Continue with Google</span>
          </div>
          <div
            className="flex items-center justify-center w-3/4 gap-3 py-2 border rounded-md cursor-pointer min-w-24"
            onClick={loginUsingFacebook}
          >
            <img src={facebook} className="w-4 h-4" alt="facebook" />
            <span className="text-sm text-blue-600">
              Continue with Facebook
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginShopper;
