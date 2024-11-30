import React, { useState } from "react";
import {
  doCreateUserWithEmailAndPassword,
  doSignupWithFacebook,
  doSignupWithGoogle,
} from "../../firebase/auth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import logo from "../../assets/logos/logo_black.svg";
import google from "../../assets/icons/google.png";
import facebook from "../../assets/icons/facebook.png";
import signupimg from "../../assets/images/signup.png";
import { FooterSection } from "../../components/navigation/FooterSection";

const SignupShopper = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signUpEmailAndPassword = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long.");
      return;
    }

    try {
      const response = await doCreateUserWithEmailAndPassword(
        email,
        password,
        "shopper",
        null,
        null,
        null
      );
      navigate("/");
      // setUser(response);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already in use.");
      } else {
        toast.error("Error signing up. Please try again later.");
      }
      console.error("Error signing up:", error);
    }
  };

  const handleSignupGoogle = async () => {
    try {
      const result = await doSignupWithGoogle("shopper");
      if (result.user) navigate("/catalog");
      toast.success("Successfully signed in with Google!");
    } catch (error) {
      toast.error("Error signing in with Google. Please try again later.");
      console.error("Error signing in with Google:", error);
    }
  };
  const handleSignupFacebook = async () => {
    try {
      const result = await doSignupWithFacebook("shopper");
      if (result.user) navigate("/catalog");
      toast.success("Successfully signed in with Facebook!");
    } catch (error) {
      toast.error("Error signing in with Facebook. Please try again later.");
      console.error("Error signing in with Facebook:", error);
    }
  };

  return (
    <>
      <div className="flex flex-row-reverse items-center justify-center h-screen">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="hidden w-1/2 h-screen lg:block">
          <img
            srcSet={signupimg}
            alt="Room"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-full p-8 lg:p-14 md:p-52 sm:20 lg:w-1/2">
          <img src={logo} alt="Arfa" className="py-4 mx-auto w-28" />
          <h4 className="font-semibold">Sign up</h4>
          <p className="text-sm">
            Join us today! Create an account to start your shopping journey with
            us. Your next great find is just a few clicks away!
          </p>
          <form onSubmit={signUpEmailAndPassword}>
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
                required
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
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                required
              />
              {showPassword ? (
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
                Sign Up
              </button>
            </section>
          </form>
          <div className="mt-6 text-blue-500">
            <Link
              className="text-sm underline text-arfagreen"
              to={"/login-shopper"}
            >
              Already have an account?
            </Link>
          </div>
          <p className="mt-4 text-sm text-center">Or sign up using:</p>
          <section className="flex flex-col items-center gap-3">
            <div
              onClick={handleSignupGoogle}
              className="flex items-center justify-center w-3/4 gap-3 py-2 border rounded-md cursor-pointer min-w-24"
            >
              <img src={google} className="w-4 h-4" alt="google" />
              <span className="text-sm text-blue-600">
                Continue with Google
              </span>
            </div>
            <div
              className="flex items-center justify-center w-3/4 gap-3 py-2 border rounded-md cursor-pointer min-w-24"
              onClick={handleSignupFacebook}
            >
              <img src={facebook} className="w-4 h-4" alt="facebook" />
              <span className="text-sm text-blue-600">
                Continue with Facebook
              </span>
            </div>
          </section>
        </div>
      </div>
      <section>
        <FooterSection topMargin=""></FooterSection>
      </section>
    </>
  );
};

export default SignupShopper;
