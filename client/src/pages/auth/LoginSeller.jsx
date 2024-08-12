import React from "react";
import signupImg from "../../assets/images/login-signup.svg";
import google from "../../assets/icons/google.png";
import facebook from "../../assets/icons/facebook.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const LoginSeller = () => {
  return (
    <>
      <section className="px-5 pt-4 pb-10 sm:px-8 lg:px-0 lg:pb-0 lg:pt-0 lg:flex min-h-svh">
        <div className="lg:bg-gray-100 lg:px-8 lg:pb-8 lg:pt-4 basis-3/4">
          <section className="lg:mt-5 lg:px-8 lg:py-8 lg:mx-36 xl:mx-40 lg:bg-white lg:shadow-lg">
            <div className="flex flex-col items-center">
              <h2 className="pb-3 font-bold ">Sign in</h2>
              <p className="text-sm text-center">
                Welcome back, Seller! Please sign in to manage your shop
              </p>
            </div>
            <hr className="my-4 border-t border-gray-300 border-dashed" />

            <img src={signupImg} alt="man image" className="lg:hidden" />

            <section className="flex flex-col gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter you email"
                    className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="password"
                    placeholder="Enter you password"
                    className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                  />
                  <EyeSlashIcon
                    className="absolute right-0 w-5 h-5 ml-auto mr-1 text-gray-300 cursor-pointer top-3 hover:text-gray-500"
                    aria-hidden="true"
                  ></EyeSlashIcon>
                  <EyeIcon
                    className="absolute right-0 hidden w-5 h-5 ml-auto mr-1 text-gray-300 cursor-pointer top-3 hover:text-gray-500"
                    aria-hidden="true"
                  ></EyeIcon>
                </div>
              </div>
            </section>

            <section className="flex items-center justify-between gap-2 mt-5">
              <button className="flex-1 px-4 py-2 text-sm font-medium text-white transition rounded-md bg-arfagreen hover:text-white">
                Register
              </button>
            </section>
            <p className="my-5 text-xs ">
              <Link to={"/signup-seller"} className="underline text-arfagreen">
                Register you shop?
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
    </>
  );
};

export default LoginSeller;

{
  /* <section className="flex h-svh">
  <div className="flex-1 bg-red-300">Hello</div>
  <div className="bg-blue-300 basis-2/5">
    <img
      src={signupImg}
      alt="manImage"
      className="object-cover w-full h-full"
    />
  </div>
</section>; */
}
