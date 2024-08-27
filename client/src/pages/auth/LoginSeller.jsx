import React, { useState } from "react";
import signupImg from "../../assets/images/login-signup.svg";
import google from "../../assets/icons/google.png";
import facebook from "../../assets/icons/facebook.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../../firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { Toast } from "flowbite-react";

const LoginSeller = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const loginEmailAndPassword = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await doSignInWithEmailAndPassword(
        email,
        password
      );
      console.log(userCredential);

      if (userCredential.role == "seller") {
        toast.success(`Welcome back!`);
        navigate("/seller-page/dashboard");
      } else if (userCredential.role == "shopper") {
        toast.error(
          "Failed to log in. Please ensure you are using the correct seller account"
        );
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      toast.error("Failed to log in. Please check your email and password.");
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <section className="px-5 pt-4 pb-10 sm:px-8 lg:px-0 lg:pb-0 lg:pt-0 lg:flex min-h-svh">
        <div className="lg:bg-gray-100 lg:px-8 lg:pb-8 lg:pt-4 basis-3/4">
          <section className="lg:mt-5 lg:px-8 lg:py-8 lg:mx-36 xl:mx-40 lg:bg-white lg:shadow-lg">
            <form
              onSubmit={loginEmailAndPassword}
              className="flex flex-col gap-3"
            >
              <div className="flex flex-col items-center">
                <h2 className="pb-3 font-bold">Sign in</h2>
                <p className="text-sm text-center">
                  Welcome back, Seller! Please sign in to manage your shop
                </p>
              </div>
              <hr className="my-4 border-t border-gray-300 border-dashed" />

              <img src={signupImg} alt="man image" className="lg:hidden" />

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                </div>
                <div className="relative">
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
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                    required
                  />
                  {!showPassword ? (
                    <EyeSlashIcon
                      onClick={togglePasswordVisibility}
                      className="absolute right-0 w-5 h-5 ml-auto mr-1 text-gray-300 cursor-pointer top-3 hover:text-gray-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <EyeIcon
                      onClick={togglePasswordVisibility}
                      className="absolute right-0 w-5 h-5 ml-auto mr-1 text-gray-300 cursor-pointer top-3 hover:text-gray-500"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </div>

              <section className="flex items-center justify-between gap-2 mt-5">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 text-sm font-medium text-white transition rounded-md bg-arfagreen hover:text-white"
                >
                  Sign In
                </button>
              </section>
            </form>

            <p className="my-5 text-xs ">
              <Link to={"/signup-seller"} className="underline text-arfagreen">
                Register your shop?
              </Link>
            </p>

            <hr className="my-4 border-t border-gray-300 border-dashed" />

            <p className="text-sm text-center">Or sign in using:</p>
            <section className="flex flex-col items-center gap-3">
              <div className="flex items-center justify-center w-3/4 gap-3 py-2 border rounded-md cursor-pointer min-w-24">
                <img src={google} className="w-4 h-4" alt="google" />
                <span className="text-sm text-blue-600">
                  Continue with Google
                </span>
              </div>
              <div className="flex items-center justify-center w-3/4 gap-3 py-2 border rounded-md cursor-pointer min-w-24">
                <img src={facebook} className="w-4 h-4" alt="google" />
                <span className="text-sm text-blue-600">
                  Continue with Facebook
                </span>
              </div>
            </section>
          </section>
        </div>
        <div className="relative right-0-0 bg-arfagray basis-2/4">
          <img
            src={signupImg}
            alt="man image"
            className="absolute bottom-0 right-0 hidden object-cover lg:h-5/6 lg:flex-1 lg:inline-flex"
          />
        </div>
      </section>
      <Toaster />
    </>
  );
};

export default LoginSeller;
