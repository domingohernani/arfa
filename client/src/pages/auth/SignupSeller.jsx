import React from "react";
import signupImg from "../../assets/images/login-signup.svg";
import google from "../../assets/icons/google.png";
import facebook from "../../assets/icons/facebook.png";
import {
  QuestionMarkCircleIcon,
  PhoneIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { Tooltip } from "flowbite-react";
const SignupSeller = () => {
  return (
    <>
      <section className="px-5 pt-4 pb-10 sm:px-8 lg:px-0 lg:pb-0 lg:pt-0 lg:flex">
        <div className="lg:px-8 lg:pb-8 lg:pt-4">
          <div>
            <h2 className="pb-3 font-bold ">Create Account</h2>
            <p className="text-sm">
              We need you to help us with some basic information for your
              account creation. Here are our{" "}
              <Link to="/terms-and-conditions" className="text-arfagreen">
                terms and conditions
              </Link>
              . Please read them carefully. We are GDRP compliiant
            </p>
          </div>

          <img src={signupImg} alt="man image" className="lg:hidden" />

          <hr className="my-4 border-t border-gray-300 border-dashed" />
          <section className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex items-center justify-between">
                <label
                  for="firstname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First name
                </label>
                <Tooltip content="Enter your first name as it appears on official documents">
                  <QuestionMarkCircleIcon
                    className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                    aria-hidden="true"
                  ></QuestionMarkCircleIcon>
                </Tooltip>
              </div>
              <input
                type="text"
                id="firstname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  for="lastname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last name
                </label>
                <Tooltip content="Enter your last name as it appears on official documents">
                  <QuestionMarkCircleIcon
                    className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                    aria-hidden="true"
                  ></QuestionMarkCircleIcon>
                </Tooltip>
              </div>
              <input
                type="text"
                id="lastname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  for="shopname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Shop name
                </label>
                <Tooltip content="Enter your shop name as it appears on official documents">
                  <QuestionMarkCircleIcon
                    className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                    aria-hidden="true"
                  ></QuestionMarkCircleIcon>
                </Tooltip>
              </div>
              <input
                type="text"
                id="shopname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  for="phonenumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone number
                </label>
                <Tooltip content="Provide a contact number where customers can reach you">
                  <QuestionMarkCircleIcon
                    className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                    aria-hidden="true"
                  ></QuestionMarkCircleIcon>
                </Tooltip>
              </div>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <PhoneIcon className="w-4 h-4 text-gray-500 dark:text-gray-400"></PhoneIcon>
                </span>
                <input
                  type="text"
                  id="phonenumber"
                  className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-arfagreen focus:border-arfagreen block flex-1 min-w-0 w-full text-sm p-2.5  "
                  placeholder="09123456789"
                />
              </div>
            </div>
          </section>

          <hr className="my-4 border-t border-gray-300 border-dashed" />

          <section className="flex gap-3">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <Tooltip content="Create a strong password (e.g., at least 8 characters, including uppercase and lowercase letters, numbers, and special symbols like @, #, $)">
                  <QuestionMarkCircleIcon
                    className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                    aria-hidden="true"
                  ></QuestionMarkCircleIcon>
                </Tooltip>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="password"
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
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <label
                  for="confirmpassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <Tooltip content="Re-enter your password to confirm (must match the previous one)">
                  <QuestionMarkCircleIcon
                    className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                    aria-hidden="true"
                  ></QuestionMarkCircleIcon>
                </Tooltip>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="confirmpassword"
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
            <div className="">
              <input
                id="termsandcondition"
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded text-arfagreen focus:ring-arfagreen"
              />
              <label
                htmlFor="termsandcondition"
                className="ml-3 text-xs text-gray-600"
              >
                I agree with{" "}
                <Link to="/terms-and-conditions" className="text-arfagreen">
                  terms and conditions
                </Link>
                .
              </label>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-white transition rounded-md bg-arfagreen hover:text-white">
              Register
            </button>
          </section>
          <p className="my-5 text-xs ">
            <Link to={"/login-seller"} className="underline text-arfagreen">
              Already a member?
            </Link>
          </p>

          <hr className="my-4 border-t border-gray-300 border-dashed" />

          <p className="text-sm text-center">Or create an account using:</p>
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
        </div>
        <div className="relative right-0-0 bg-arfagray basis-2/4">
          <img
            src={signupImg}
            alt="man image"
            className="absolute right-0 hidden object-cover -bottom-5 lg:h-5/6 lg:flex-1 lg:inline-flex"
          />
        </div>
      </section>
    </>
  );
};

export default SignupSeller;