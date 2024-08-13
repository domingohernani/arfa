import React, { useRef } from "react";
import NavigationBar from "../../components/navigation/NavigationBar";
import { Tabs } from "flowbite-react";
import { HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import greaterthan from "../../assets/icons/greater-than.svg";
import { FooterSection } from "../../components/navigation/FooterSection";
import ShowMultiModel from "../../components/ShowMultiModel";

const displayFurnituresOnWishlist = () => {
  let onCart = Array(5).fill(null);

  return onCart.map((e, index) => (
    <div
      className="p-4 bg-white border border-gray-200 rounded-lg md:p-6"
      key={index}
    >
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <a href="#" className="shrink-0 md:order-1">
          <img
            className="w-auto h-40 rounded-lg"
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image"
          />
        </a>

        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="text-end md:order-4 md:w-32">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              ₱19,999
            </p>
          </div>
        </div>

        <div className="flex-1 w-full min-w-0 space-y-4 md:order-2">
          <a
            href="#"
            className="text-sm font-medium text-gray-900 hover:underline dark:text-white"
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex,
            tenetur.
          </a>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#64748b"
                id="Outline"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="me-1.5 h-4 w-4 "
              >
                <path d="M22.713,4.077A2.993,2.993,0,0,0,20.41,3H4.242L4.2,2.649A3,3,0,0,0,1.222,0H1A1,1,0,0,0,1,2h.222a1,1,0,0,1,.993.883l1.376,11.7A5,5,0,0,0,8.557,19H19a1,1,0,0,0,0-2H8.557a3,3,0,0,1-2.82-2h11.92a5,5,0,0,0,4.921-4.113l.785-4.354A2.994,2.994,0,0,0,22.713,4.077ZM21.4,6.178l-.786,4.354A3,3,0,0,1,17.657,13H5.419L4.478,5H20.41A1,1,0,0,1,21.4,6.178Z" />
                <circle cx="7" cy="22" r="2" />
                <circle cx="17" cy="22" r="2" />
              </svg>
              Add to Cart
            </button>

            <button
              type="button"
              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
            >
              <svg
                className="me-1.5 h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  ));
};

const modelPaths = [
  "https://firebasestorage.googleapis.com/v0/b/aria-16a4d.appspot.com/o/models%2Fsofa.glb?alt=media&token=9c363de4-5eff-4c0a-9622-b96f340cce3c",
  "https://firebasestorage.googleapis.com/v0/b/aria-16a4d.appspot.com/o/models%2Fsofa.glb?alt=media&token=9c363de4-5eff-4c0a-9622-b96f340cce3c",
  "https://firebasestorage.googleapis.com/v0/b/aria-16a4d.appspot.com/o/models%2Fsofa.glb?alt=media&token=9c363de4-5eff-4c0a-9622-b96f340cce3c",
];

const Wishlist = () => {
  const tabsRef = useRef(null);
  const navigate = useNavigate();
  const changeTab = (tab) => {
    tab == 0 ? navigate("/wishlist") : navigate("/cart");
  };

  return (
    <section className="antialiased dark:bg-gray-900">
      <section className="mx-6 my-3">
        <NavigationBar />
      </section>
      <div className="px-4 max-w-screen md:mx-8 2xl:px-0">
        <Tabs
          aria-label="Default tabs"
          variant="default"
          onActiveTabChange={changeTab}
          ref={tabsRef}
          className="cartWishlistTab"
        >
          <Tabs.Item active title="Wishlist">
            <div className="flex items-center gap-2 py-5 text-sm text-arfablack">
              <span className="cursor-pointer hover:text-arfagreen">Home</span>
              <img src={greaterthan} alt=">" className="w-2 h-2" />
              <span className="cursor-pointer hover:text-arfagreen">
                Wishlist
              </span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Wishlist
            </h2>
            <NavLink to={`/wishlist/augmented-reality`}>
              <div className="flex items-center justify-end gap-2 ml-auto underline cursor-pointer w-fit underline-offset-2 decoration-arfablack">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Layer_1"
                  data-name="Layer 1"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 "
                >
                  <path d="m20.484,4.84l-6.5-3.715c-1.225-.699-2.745-.699-3.968,0h0l-6.5,3.715c-1.243.71-2.016,2.041-2.016,3.473v7.375c0,1.432.772,2.763,2.016,3.473l6.5,3.715c.612.35,1.298.524,1.984.524s1.372-.175,1.984-.524l6.5-3.715c1.243-.711,2.016-2.041,2.016-3.473v-7.375c0-1.432-.772-2.762-2.016-3.473Zm-9.477-1.979c.613-.349,1.374-.349,1.984,0l6.492,3.71-2.556,1.461c-.139-.118-.274-.241-.434-.333l-3.001-1.723c-.922-.529-2.064-.529-2.987,0l-3,1.723c-.161.092-.296.215-.435.333l-2.556-1.461,6.492-3.71Zm-3.008,8.005l3,1.714v3.424l-2.496-1.426c-.311-.178-.504-.511-.504-.868v-2.844Zm4-.017l-2.988-1.708,2.49-1.43c.153-.088.326-.132.498-.132s.344.044.498.132l2.491,1.43-2.988,1.708Zm1,1.732l3-1.714v2.844c0,.357-.193.69-.504.868l-2.496,1.426v-3.424Zm-8.492,4.844c-.622-.355-1.008-1.021-1.008-1.736v-7.375c0-.006.002-.011.002-.016l2.57,1.468c-.033.177-.072.353-.072.537v3.409c0,1.073.579,2.071,1.512,2.604l3,1.714c.155.089.323.141.489.199v2.906l-6.492-3.71Zm15.992-1.736c0,.716-.386,1.381-1.008,1.736l-6.492,3.711v-2.907c.165-.059.333-.111.488-.199l3.001-1.714c.932-.533,1.511-1.531,1.511-2.604v-3.409c0-.183-.039-.359-.072-.537l2.57-1.468c0,.006.002.011.002.016v7.375Z" />
                </svg>
                <span className="text-sm font-normal text-arfablack">
                  View Wishlist on AR
                </span>
              </div>
            </NavLink>

            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="flex-none w-full ">
                <div className="space-y-6">{displayFurnituresOnWishlist()}</div>
              </div>
            </div>
            <div className="w-full max-w-md mt-8 ml-auto">
              <a
                href="#"
                className="flex w-full bg-arfagreen items-center justify-center rounded-lg bg-primary-700 px-3 py-2.5 text-sm font-medium text-white hover:bg-primary-800"
              >
                Add all to Cart
              </a>
              <div className="flex items-center justify-center gap-2 mt-4">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  or
                </span>
                <Link
                  to={"/catalog"}
                  className="inline-flex items-center gap-2 text-sm font-medium underline text-primary-700 hover:no-underline dark:text-primary-500"
                >
                  Continue Shopping
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 12H5m14 0-4 4m4-4-4-4"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </Tabs.Item>
          <Tabs.Item title="Cart"></Tabs.Item>
        </Tabs>
      </div>

      <ShowMultiModel paths={modelPaths}></ShowMultiModel>
      <section className="mt-10">
        <FooterSection />
      </section>
    </section>
  );
};

export default Wishlist;
