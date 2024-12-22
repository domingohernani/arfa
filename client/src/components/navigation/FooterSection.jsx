import logo from "../../assets/logos/logo_black.svg";
import { Link, useNavigate } from "react-router-dom";
import {
  PaperAirplaneIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export function FooterSection({ topMargin = "mt-28" }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-end w-full bg-white">
        <footer
          className={`w-full text-gray-700 bg-red-100 body-font ${topMargin}`}
        >
          <div className="flex flex-col px-6 mx-auto py-14 md:flex-row md:justify-evenly md:px-24 md:items-center lg:items-start md:flex-no-wrap">
            <div className="flex-shrink-0 w-full mx-auto text-center lg:w-6/12 md:mx-0 md:text-left">
              <a className="flex items-center justify-center font-medium text-gray-900 title-font md:justify-start">
                <Link to={"/"}>
                  <img src={logo} alt="ARFA" className="w-auto h-14" />
                </Link>
              </a>
              <p className="mt-2 text-sm text-gray-500">
                Furnish Your Space, Simplify Your Style.
              </p>
              <div className="my-4">
                <span className="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start">
                  <a className="text-gray-500 cursor-pointer hover:text-gray-700">
                    <span className="[&>svg]:h-5 [&>svg]:w-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 448 512"
                      >
                        <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                      </svg>
                    </span>
                  </a>
                  <a className="ml-3 text-gray-500 cursor-pointer hover:text-gray-700">
                    <span className="[&>svg]:h-5 [&>svg]:w-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 512 512"
                      >
                        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                      </svg>
                    </span>
                  </a>

                  <a className="ml-3 text-gray-500 cursor-pointer hover:text-gray-700">
                    <span className="[&>svg]:h-5 [&>svg]:w-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 448 512"
                      >
                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                      </svg>
                    </span>
                  </a>
                  <a
                    className="ml-3 text-gray-500 cursor-pointer hover:text-gray-700"
                    href="https://www.facebook.com/shopwithariaph"
                  >
                    <span className="[&>svg]:h-5 [&>svg]:w-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                      </svg>
                    </span>
                  </a>
                </span>
              </div>
              <div className="flex flex-col gap-8">
                <section className="flex flex-col justify-start gap-2">
                  <span className="text-sm text-gray-500">
                    <span className="text-sm font-bold text-black ">
                      Join with ARFA!
                    </span>
                  </span>
                  <span className="text-sm leading-relaxed text-gray-500">
                    Discover furniture that fits your style and space perfectly.
                    Start furnishing your dream home today!
                  </span>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0 });
                      navigate("/login-shopper");
                    }}
                    className="px-4 py-2 mx-auto text-xs font-semibold text-white transition bg-gray-600 rounded-md lg:mx-0 w-fit hover:bg-gray-700"
                  >
                    Shop Now!
                  </button>
                </section>
                <section className="flex flex-col justify-start gap-2">
                  <span className="text-sm font-bold text-black ">
                    Grow with ARFA!
                  </span>
                  <span className="text-sm leading-relaxed text-gray-500">
                    Grow your business by showcasing your products to a wider
                    audience. Join us and reach more customers!
                  </span>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0 });
                      navigate("/login-seller");
                    }}
                    className="px-4 py-2 mx-auto text-xs font-semibold text-white transition bg-gray-600 rounded-md lg:mx-0 w-fit hover:bg-gray-700"
                  >
                    Sell Now!
                  </button>
                </section>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-10 -mb-10 text-center w-fit justify-evenly md:mt-0 md:text-left">
              <div className="w-full px-4 text-left">
                <h2 className="mb-3 text-sm font-medium text-gray-900 uppercase title-font">
                  About
                </h2>
                <nav className="mb-10 text-sm list-none">
                  <li className="mt-3">
                    <a
                      className="text-gray-500 cursor-pointer hover:text-gray-900"
                      href="https://ariaph.vercel.app/"
                    >
                      Company
                    </a>
                  </li>
                  <li className="mt-3">
                    <a
                      className="text-gray-500 cursor-pointer hover:text-gray-900"
                      href="https://ariaph.vercel.app/#team"
                    >
                      Team
                    </a>
                  </li>
                </nav>
              </div>
              <div className="w-full px-4 text-left">
                <h2 className="mb-3 text-sm font-medium text-gray-900 uppercase title-font">
                  Platform
                </h2>
                <nav className="mb-10 text-sm list-none">
                  <li className="mt-3">
                    <a
                      className="text-gray-500 cursor-pointer hover:text-gray-900"
                      href="/terms-and-conditions"
                    >
                      Terms &amp; Conditions
                    </a>
                  </li>

                  <li className="mt-3">
                    <a
                      className="text-gray-500 cursor-pointer hover:text-gray-900"
                      href="/frequently-asked-questions"
                    >
                      FAQ
                    </a>
                  </li>
                  <li className="mt-3">
                    <a
                      href="/cookies-policy"
                      className="text-gray-500 cursor-pointer hover:text-gray-900"
                    >
                      Cookies Policy
                    </a>
                  </li>
                </nav>
              </div>
              <div className="w-full col-span-2 px-4 text-left">
                <h2 className="mb-3 text-sm font-medium text-gray-900 uppercase title-font">
                  Contact
                </h2>
                <nav className="mb-10 text-sm list-none">
                  <li className="mt-3">
                    <div className="flex gap-2 px-4 py-2 mx-auto text-xs font-semibold text-white transition bg-gray-600 rounded-md w-fit lg:mx-0 hover:bg-gray-700">
                      <a
                        href="mailto:arfaph.hello@gmail.com?subject=Support%20Request&body=Hello,%20I%20need%20assistance%20with..."
                        className="font-semibold text-white"
                      >
                        Send an email
                      </a>
                      <PaperAirplaneIcon className="w-4 h-4 text-white" />
                    </div>
                  </li>
                  <li className="mt-3">
                    <a className="flex items-center gap-1 text-gray-500 cursor-pointer hover:text-gray-900">
                      <PhoneIcon className="w-4 h-4 text-gray-500" />
                      <span>+639453467841</span>
                    </a>
                  </li>
                  <li className="mt-3 ">
                    <a className="flex items-center text-gray-500 cursor-pointer hover:text-gray-900 w-fit">
                      <MapPinIcon className="w-5 h-5 text-gray-500" />
                      <span>
                        7th Floor, MacArthur Highway, Urdaneta City, Pangasinan
                      </span>
                    </a>
                  </li>
                </nav>
              </div>
            </div>
          </div>
          <div className="relative z-10 bg-arfagreen -bottom-8">
            <div className="container flex flex-col items-center gap-3 px-6 py-6 mx-auto text-center md:flex-row md:justify-between md:px-24">
              {/* <span className="text-xs text-white">
                7th Floor, MacArthur Highway, Urdaneta City, Pangasinan
              </span> */}
              <span className="mx-auto text-sm text-white">
                © 2024 All rights reserved{" "}
              </span>
              {/* <span className="flex gap-3 justify-evenly md:mt-0 md:mr-0">
                <a
                  href="/terms-and-conditions"
                  className="text-xs text-white underline"
                >
                  Terms & Conditions
                </a>
                <a
                  href="/cookies-policy"
                  className="text-xs text-white underline"
                >
                  Cookies Policy
                </a>
              </span> */}
            </div>
          </div>
        </footer>
      </div>
      <div className="absolute w-full h-8 py-2 text-xs text-center bg-arfagreen"></div>
    </>
  );
}
