import React, { useRef } from "react";
import NavigationBar from "../../components/navigation/NavigationBar";
import { Tabs } from "flowbite-react";
import { HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import greaterthan from "../../assets/icons/greater-than.svg";
import { FooterSection } from "../../components/navigation/FooterSection";

const displayFurnituresOnWishlist = () => {
  let onCart = Array(5).fill(null);

  return onCart.map(() => (
    <div class="rounded-lg border border-gray-200 bg-white p-4 md:p-6">
      <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <a href="#" class="shrink-0 md:order-1">
          <img
            class="h-40 w-auto rounded-lg"
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image"
          />
        </a>

        <div class="flex items-center justify-between md:order-3 md:justify-end">
          <div class="text-end md:order-4 md:w-32">
            <p class="text-base font-semibold text-gray-900 dark:text-white">
              $1,499
            </p>
          </div>
        </div>

        <div class="w-full min-w-0 flex-1 space-y-4 md:order-2">
          <a
            href="#"
            class="text-base font-medium text-gray-900 hover:underline dark:text-white"
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex,
            tenetur.
          </a>

          <div class="flex items-center gap-4">
            <button
              type="button"
              class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#64748b"
                id="Outline"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                class="me-1.5 h-4 w-4 "
              >
                <path d="M22.713,4.077A2.993,2.993,0,0,0,20.41,3H4.242L4.2,2.649A3,3,0,0,0,1.222,0H1A1,1,0,0,0,1,2h.222a1,1,0,0,1,.993.883l1.376,11.7A5,5,0,0,0,8.557,19H19a1,1,0,0,0,0-2H8.557a3,3,0,0,1-2.82-2h11.92a5,5,0,0,0,4.921-4.113l.785-4.354A2.994,2.994,0,0,0,22.713,4.077ZM21.4,6.178l-.786,4.354A3,3,0,0,1,17.657,13H5.419L4.478,5H20.41A1,1,0,0,1,21.4,6.178Z" />
                <circle cx="7" cy="22" r="2" />
                <circle cx="17" cy="22" r="2" />
              </svg>
              Add to Cart
            </button>

            <button
              type="button"
              class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
            >
              <svg
                class="me-1.5 h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
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

const Wishlist = () => {
  const tabsRef = useRef(null);
  const navigate = useNavigate();
  const changeTab = (tab) => {
    tab == 0 ? navigate("/wishlist") : navigate("/cart");
  };

  return (
    <section class="antialiased dark:bg-gray-900">
      <section className="mx-6 my-3">
        <NavigationBar />
      </section>
      <div class=" max-w-screen md:mx-8 px-4 2xl:px-0">
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
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Wishlist
            </h2>

            <div class="mt-6  sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div class=" w-full flex-none">
                <div class="space-y-6">{displayFurnituresOnWishlist()}</div>
              </div>
            </div>
            <div className="w-full max-w-xl mt-8 ml-auto">
              <a
                href="#"
                class="flex w-full bg-arfagreen items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800"
              >
                Add all to Cart
              </a>
              <div class="flex items-center mt-4 justify-center gap-2">
                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                  or
                </span>
                <Link
                  to={"/catalog"}
                  className="inline-flex items-center gap-2 text-sm font-medium underline text-primary-700 hover:no-underline dark:text-primary-500"
                >
                  Continue Shopping
                  <svg
                    class="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
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
     <section className="mt-10">
     <FooterSection />
     </section>
    </section>
  );
};

export default Wishlist;
