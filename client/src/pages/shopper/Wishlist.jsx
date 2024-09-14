import React, { useRef, useEffect, useState } from "react";
import NavigationBar from "../../components/navigation/NavigationBar";
import { Tabs } from "flowbite-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import greaterthan from "../../assets/icons/greater-than.svg";
import { FooterSection } from "../../components/navigation/FooterSection";
import ShowMultiModel from "../../components/ShowMultiModel";
import { getUserInfo } from "../../firebase/user";
import { fetchFurnitureById } from "../../firebase/furniture";
import noWishlist from "../../assets/images/no-review.jpg";

const displayFurnituresOnWishlist = (items) => {
  let onCart = Array(5).fill(null);

  if (!items) {
    return (
      <div className="flex flex-col items-center my-10">
        <img src={noWishlist} className="w-64 h-auto" />
        <p className="text-sm text-center">
          Your wishlist is currently empty. Start adding your favorite
          furnitures now!
        </p>
      </div>
    );
  }

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

const Wishlist = () => {
  const tabsRef = useRef(null);
  const navigate = useNavigate();
  const changeTab = (tab) => {
    tab == 0 ? navigate("/wishlist") : navigate("/cart");
  };
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { wishlist } = await getUserInfo();
        const fetchPromises = wishlist.map(async (id) => {
          return await fetchFurnitureById("furnitures", id);
        });

        const results = await Promise.all(fetchPromises);
        console.log("result", results);

        setWishlist(results);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchWishlist();
  }, []);

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
            <div className="flex items-center gap-2 py-5 text-sm ">
              <Link
                to={"/catalog"}
                className="font-normal text-black cursor-pointer hover:text-arfagreen"
              >
                Catalog
              </Link>
              <img src={greaterthan} alt=">" className="w-2 h-2" />
              <span className="cursor-pointer hover:text-arfagreen">
                Wishlist
              </span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Wishlist
            </h2>
            {wishlist.length > 0 ? (
              <ShowMultiModel data={wishlist}></ShowMultiModel>
            ) : null}

            <div className=" mt-14 sm:mt-16 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="flex-none w-full">
                <div className="space-y-6">
                  {displayFurnituresOnWishlist(wishlist)}
                </div>
              </div>
            </div>
            {wishlist.length > 0 ? (
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
            ) : null}
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
