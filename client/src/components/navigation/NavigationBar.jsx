import React from "react";
import logo from "../../assets/logos/logo_green.svg";
import profile from "../../assets/icons/profile-black.svg";
import cart from "../../assets/icons/cart.svg";
import search from "../../assets/icons/search.svg";
import heart from "../../assets/icons/heart-black.svg";
import { Link } from "react-router-dom";
import { NotificationDrawer } from "../dynamic/NotificationDrawer";

function NavigationBar() {
  return (
    <div className="grid items-center grid-cols-11 grid-rows-2 gap-2 md:grid-rows-1">
      <div className="flex justify-start col-span-1 ">
        <Link to="/">
          <img src={logo} alt="ARFA" className="h-auto min-w-16 md:w-24" />
        </Link>
      </div>
      <div className="relative col-span-11 row-start-2 text-xs md:text-sm md:col-start-2 md:col-span-4 md:row-start-1">
        <input
          type="text"
          className="w-full px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:border-arfagreen focus:ring-0 focus:ring-arfagreen focus:bg-white "
          placeholder="Search furniture"
          id="catalogSearchbar"
        />
        <img
          src={search}
          alt="Search"
          className="absolute w-4 cursor-pointer md:w-5 right-4 top-2 "
          width=""
          height="auto"
        />
      </div>
      <div className="flex items-center justify-end col-start-11 ">
        <NotificationDrawer />
        <Link to={"/profile/user-profile"} className="mr-3 ">
          <img
            src={profile}
            alt="profile"
            className="w-4 h-auto mx-3 cursor-pointer"
          />
        </Link>
        <Link to={"/wishlist"}>
          <button className="flex items-center justify-center gap-2 px-4 bg-transparent focus:outline-none md:px-5">
            <span className="text-xs font-normal text-arfablack md:text-sm">
              Wishlist
            </span>
            <img
              src={heart}
              alt="wishlist"
              className="w-3 h-auto cursor-pointer md:w-4"
            />
          </button>
        </Link>
        <Link to={"/cart"}>
          <button className="flex items-center justify-center gap-2 px-4 bg-transparent focus:outline-none md:px-4">
            <span className="text-xs font-normal text-arfablack md:text-sm">
              Cart
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill=""
              id="Outline"
              viewBox="0 0 24 24"
              width="512"
              height="512"
              className="w-3 h-auto cursor-pointer text-arfablack md:w-4"
            >
              <path d="M22.713,4.077A2.993,2.993,0,0,0,20.41,3H4.242L4.2,2.649A3,3,0,0,0,1.222,0H1A1,1,0,0,0,1,2h.222a1,1,0,0,1,.993.883l1.376,11.7A5,5,0,0,0,8.557,19H19a1,1,0,0,0,0-2H8.557a3,3,0,0,1-2.82-2h11.92a5,5,0,0,0,4.921-4.113l.785-4.354A2.994,2.994,0,0,0,22.713,4.077ZM21.4,6.178l-.786,4.354A3,3,0,0,1,17.657,13H5.419L4.478,5H20.41A1,1,0,0,1,21.4,6.178Z" />
              <circle cx="7" cy="22" r="2" />
              <circle cx="17" cy="22" r="2" />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NavigationBar;
