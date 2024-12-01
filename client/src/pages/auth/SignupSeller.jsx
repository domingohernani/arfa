import React, { useState } from "react";
import signupImg from "../../assets/images/signup.jpg";
import google from "../../assets/icons/google.png";
import facebook from "../../assets/icons/facebook.png";
import { toast, Toaster } from "react-hot-toast";
import {
  QuestionMarkCircleIcon,
  PhoneIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "flowbite-react";
import {
  doCreateUserWithEmailAndPassword,
  doSignupWithGoogle,
} from "../../firebase/auth";
import { useEffect } from "react";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import { createShopDocument } from "../../firebase/user";
import { uploadFile } from "../../firebase/files";
import { FooterSection } from "../../components/navigation/FooterSection";

const SignupSeller = () => {
  const navigate = useNavigate();
  const [passwordEye, setPasswordEye] = useState(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const [visibleRegisterBtn, setVisibleRegisterBtn] = useState(false);

  // States for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [barangay, setBarangay] = useState([]);
  const [cityMunicipal, setCityMunicipal] = useState([]);
  const [province, setProvince] = useState([]);
  const [region, setRegion] = useState([]);
  const [ownerId, setOwnerId] = useState(null);
  const [businessPermit, setBusinessPermit] = useState(null);

  // State to hold the selected value for each dropdown
  const [selectedBarangay, setSelectedBarangay] = useState("");
  const [selectedCityMunicipal, setSelectedCityMunicipal] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const handleEye = (set, value) => {
    set(value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (phoneNumber.length != 11) {
      toast.error("Please provide a valid phone number");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
      return;
    }

    try {
      const createdUser = await doCreateUserWithEmailAndPassword(
        email,
        password,
        "seller",
        firstName,
        lastName,
        phoneNumber
      );
      console.log(createdUser);

      const validIdUrl = await uploadFile(
        ownerId,
        "files/validId",
        createdUser.uid
      );

      const permitUrl = await uploadFile(
        businessPermit,
        "files/permit",
        createdUser.uid
      );

      const shopData = {
        street: streetNumber,
        barangay: selectedBarangay,
        city: selectedCityMunicipal,
        province: selectedProvince,
        region: selectedRegion,
        name: businessName,
        userId: createdUser.uid,
        validId: validIdUrl,
        businessPermit: permitUrl,
      };

      const responseShop = await createShopDocument(shopData);

      if (responseShop) {
        navigate("/seller-page/dashboard");
      } else {
        toast.error(
          "Signup unsuccessful. Please check your details and try again."
        );
      }
    } catch (error) {
      console.log(error.code);

      if (error.code === "auth/email-already-in-use") {
        toast.error("Email address is already in use.");
      } else {
        toast.error("Error signing up. Please try again later.");
      }
    }

    // console.log(shopData);
  };

  useEffect(() => {
    const fetchAddress = async () => {
      const region = await regions();
      setRegion(region);
    };

    fetchAddress();
  }, [region]);

  // Log form values
  const registerButton = () => {
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("Phone Number:", phoneNumber);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    console.log("Business Name:", businessName);
    console.log("Street Number:", streetNumber);
    console.log("Barangay:", barangay);
    console.log("City/Municipal:", cityMunicipal);
    console.log("Province:", province);
    console.log("Valid ID of Business Owner:", ownerId);
    console.log("Mayor's Permit/Business Permit:", businessPermit);
  };

  const handleFileUpload = (e, setFile) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFile(file);
    } else {
      toast.error("Please upload a valid PDF file.");
      e.target.value = null; // Clear the file input
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <section className="px-5 pt-4 pb-10 sm:px-8 lg:px-0 lg:pb-0 lg:pt-0 lg:flex">
        <div className="max-w-3xl lg:px-8 lg:pb-8 lg:pt-4">
          <div>
            <h2 className="pb-3 font-bold ">Create Account</h2>
            <p className="text-sm">
              We need you to help us with some basic information for your
              account creation. Here are our{" "}
              <Link to="/terms-and-conditions" className="text-arfagreen">
                terms and conditions
              </Link>
              . Please read them carefully. We are GDPR compliant.
            </p>
          </div>
          <hr className="my-4 border-t border-gray-300 border-dashed" />
          <form onSubmit={handleSignUp}>
            <section className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="firstname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First name
                  </label>
                  <Tooltip content="Enter your first name as it appears on official documents">
                    <QuestionMarkCircleIcon
                      className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Tooltip>
                </div>
                <input
                  type="text"
                  id="firstname"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="lastname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last name
                  </label>
                  <Tooltip content="Enter your last name as it appears on official documents">
                    <QuestionMarkCircleIcon
                      className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Tooltip>
                </div>
                <input
                  type="text"
                  id="lastname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <Tooltip content="Enter your email address as it appears in your official records">
                    <QuestionMarkCircleIcon
                      className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Tooltip>
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="phonenumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone number
                  </label>
                  <Tooltip content="Provide a contact number where customers can reach you">
                    <QuestionMarkCircleIcon
                      className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Tooltip>
                </div>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <PhoneIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </span>
                  <input
                    type="text"
                    id="phonenumber"
                    value={phoneNumber}
                    onChange={(e) => {
                      const input = e.target.value;
                      const numbers = "0123456789";
                      if (
                        input.split("").every((char) => numbers.includes(char))
                      ) {
                        setPhoneNumber(input);
                      }
                    }}
                    className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-arfagreen focus:border-arfagreen block flex-1 min-w-0 w-full text-sm p-2.5"
                    placeholder="09123456789"
                    required
                    maxLength={11}
                  />
                </div>
              </div>
            </section>

            <hr className="my-4 border-t border-gray-300 border-dashed" />

            <section className="flex gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <Tooltip content="Create a strong password (e.g., at least 8 characters, including uppercase and lowercase letters, numbers, and special symbols like @, #, $)">
                    <QuestionMarkCircleIcon
                      className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Tooltip>
                </div>
                <div className="relative">
                  <input
                    type={!passwordEye ? "password" : "text"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                    required
                  />
                  {!passwordEye ? (
                    <EyeSlashIcon
                      className="absolute right-0 w-5 h-5 ml-auto mr-1 text-gray-300 cursor-pointer top-3 hover:text-gray-500"
                      aria-hidden="true"
                      onClick={() => handleEye(setPasswordEye, true)}
                    />
                  ) : (
                    <EyeIcon
                      className="absolute right-0 w-5 h-5 ml-auto mr-1 text-gray-300 cursor-pointer top-3 hover:text-gray-500"
                      aria-hidden="true"
                      onClick={() => handleEye(setPasswordEye, false)}
                    />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirmpassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <Tooltip content="Re-enter your password to confirm (must match the previous one)">
                    <QuestionMarkCircleIcon
                      className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Tooltip>
                </div>
                <div className="relative">
                  <input
                    type={!confirmPasswordEye ? "password" : "text"}
                    id="confirmpassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                    required
                  />
                  {!confirmPasswordEye ? (
                    <EyeSlashIcon
                      className="absolute right-0 w-5 h-5 ml-auto mr-1 text-gray-300 cursor-pointer top-3 hover:text-gray-500"
                      aria-hidden="true"
                      onClick={() => handleEye(setConfirmPasswordEye, true)}
                    />
                  ) : (
                    <EyeIcon
                      className="absolute right-0 w-5 h-5 ml-auto mr-1 text-gray-300 cursor-pointer top-3 hover:text-gray-500"
                      aria-hidden="true"
                      onClick={() => handleEye(setConfirmPasswordEye, false)}
                    />
                  )}
                </div>
              </div>
            </section>

            <section className="mt-4">
              <div>
                <h2 className="pb-3 font-bold ">Register Your Shop</h2>
                <p className="text-sm">
                  Please provide your details and upload the required shop
                  documents.
                </p>
              </div>
            </section>

            <hr className="my-4 border-t border-gray-300 border-dashed" />

            <section className="flex gap-3 mb-4">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="businessname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Business Name
                  </label>
                  <Tooltip content="Enter the official name of your business">
                    <QuestionMarkCircleIcon
                      className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Tooltip>
                </div>
                <input
                  type="text"
                  id="businessname"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                  required
                />
              </div>
            </section>

            <p className="text-sm italic">
              Note: Please enter the complete address location of shop.
            </p>

            <section className="grid items-center justify-center grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="region"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Region
                  </label>
                  <Tooltip content="Enter your Region">
                    <QuestionMarkCircleIcon
                      className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Tooltip>
                </div>
                <select
                  name="region"
                  id="region"
                  className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                  onChange={async (e) => {
                    const province = await provinces(e.target.value);
                    setProvince(province);
                    setSelectedRegion(
                      e.target.options[e.target.selectedIndex].text
                    );

                    setCityMunicipal([]);
                    setBarangay([]);
                    setStreetNumber("");
                  }}
                >
                  <option
                    value=""
                    onClick={() => {
                      setCityMunicipal([]);
                      setBarangay([]);
                      setStreetNumber("");
                    }}
                  >
                    Select Region
                  </option>
                  {region.map((reg) => {
                    return (
                      <option value={reg.region_code}>{reg.region_name}</option>
                    );
                  })}
                </select>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="province"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Province
                  </label>
                  <Tooltip content="Enter your Province">
                    <QuestionMarkCircleIcon
                      className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Tooltip>
                </div>
                <select
                  name="province"
                  id="province"
                  className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                  onChange={async (e) => {
                    const cityMunicipal = await cities(e.target.value);
                    setCityMunicipal(cityMunicipal);
                    setSelectedProvince(
                      e.target.options[e.target.selectedIndex].text
                    );

                    setBarangay([]);
                    setStreetNumber("");
                  }}
                >
                  <option
                    value=""
                    onClick={() => {
                      setBarangay([]);
                      setStreetNumber("");
                    }}
                  >
                    Select Province
                  </option>
                  {province.map((reg) => {
                    return (
                      <option value={reg.province_code}>
                        {reg.province_name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="citymunicipal"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    City/Municipal
                  </label>
                  <Tooltip content="Enter your City or Municipal">
                    <QuestionMarkCircleIcon
                      className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Tooltip>
                </div>
                <select
                  name="citymunicipal"
                  id="citymunicipal"
                  className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                  onChange={async (e) => {
                    const barangay = await barangays(e.target.value);
                    setBarangay(barangay);
                    setSelectedCityMunicipal(
                      e.target.options[e.target.selectedIndex].text
                    );

                    setStreetNumber("");
                  }}
                >
                  <option
                    value=""
                    onClick={() => {
                      setStreetNumber("");
                    }}
                  >
                    Select City/Municipal
                  </option>
                  {cityMunicipal.map((reg) => {
                    return (
                      <option value={reg.city_code}>{reg.city_name}</option>
                    );
                  })}
                </select>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="barangay"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Barangay
                  </label>
                  <Tooltip content="Enter your Barangay">
                    <QuestionMarkCircleIcon
                      className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Tooltip>
                </div>
                <select
                  name="barangay"
                  id="barangay"
                  className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                  onChange={async (e) => {
                    setSelectedBarangay(
                      e.target.options[e.target.selectedIndex].text
                    );
                    setStreetNumber("");
                  }}
                >
                  <option
                    value=""
                    onClick={() => {
                      setStreetNumber("");
                    }}
                  >
                    Select Barangay
                  </option>
                  {barangay.map((reg) => {
                    return (
                      <option value={reg.brgy_code}>{reg.brgy_name}</option>
                    );
                  })}
                </select>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="streetnumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Street
                  </label>
                  <Tooltip content="Enter your street number">
                    <QuestionMarkCircleIcon
                      className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Tooltip>
                </div>
                <input
                  type="text"
                  id="streetnumber"
                  value={streetNumber}
                  onChange={(e) => setStreetNumber(e.target.value)}
                  className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                  required
                />
              </div>
            </section>

            <hr className="my-4 border-t border-gray-300 border-dashed" />

            <section className="flex gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="ownerid"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Valid ID of Business Owner
                  </label>
                  <Tooltip content="Upload a valid ID of the business owner (PDF only)">
                    <QuestionMarkCircleIcon
                      className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Tooltip>
                </div>
                <input
                  type="file"
                  id="ownerid"
                  onChange={(e) => handleFileUpload(e, setOwnerId)}
                  className="block w-full pr-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-arfagreen focus:border-arfagreen"
                  required
                />
                <p className="my-1 text-xs">PDF Only File</p>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="businesspermit"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mayor's Permit/Business Permit
                  </label>
                  <Tooltip content="Upload your Mayor's or Business Permit (PDF only)">
                    <QuestionMarkCircleIcon
                      className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Tooltip>
                </div>
                <input
                  type="file"
                  id="businesspermit"
                  onChange={(e) => handleFileUpload(e, setBusinessPermit)}
                  className="block w-full pr-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-arfagreen focus:border-arfagreen"
                  required
                />
                <p className="my-1 text-xs">PDF Only File</p>
              </div>
            </section>

            <section className="flex items-center justify-between gap-2 mt-5">
              <div>
                <input
                  id="termsandcondition"
                  type="checkbox"
                  onClick={() => setVisibleRegisterBtn(!visibleRegisterBtn)}
                  className="w-4 h-4 border-gray-300 rounded text-arfagreen focus:ring-arfagreen"
                />
                <label
                  htmlFor="termsandcondition"
                  className="ml-3 text-sm text-gray-600"
                >
                  I agree with{" "}
                  <Link to="/terms-and-conditions" className="text-arfagreen">
                    terms and conditions
                  </Link>
                  .
                </label>
              </div>
              <button
                disabled={!visibleRegisterBtn}
                className={`px-4 py-2 text-sm font-medium text-white transition rounded-md hover:text-white ${
                  !visibleRegisterBtn ? "bg-gray-400" : "bg-arfagreen"
                }`}
                type="submit"
              >
                Register
              </button>
            </section>
            <p className="my-5 text-sm">
              <Link to={"/login-seller"} className="underline text-arfagreen">
                Already a member?
              </Link>
            </p>
          </form>

          {/* <hr className="my-4 border-t border-gray-300 border-dashed" />

          <p className="text-sm text-center">Or create an account using:</p>
          <section className="flex flex-col items-center gap-3">
            <div
              className="flex items-center justify-center w-3/4 gap-3 py-2 border rounded-md cursor-pointer min-w-24"
              onClick={handleSignupGoogle}
            >
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
          </section> */}
        </div>
        <div className="relative right-0-0 bg-arfagray basis-2/4">
          <img
            src="
          https://images.unsplash.com/photo-1656646424401-2ae620092397?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
          "
            // src={signupImg}
            alt="Signup illustration"
            className="absolute right-0 hidden object-cover lg:h-full lg:flex-1 lg:inline-flex"
          />
        </div>
      </section>
      <section>
        <FooterSection topMargin=""></FooterSection>
      </section>
    </>
  );
};

export default SignupSeller;
