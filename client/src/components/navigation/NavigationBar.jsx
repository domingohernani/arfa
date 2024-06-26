import React from "react";
import logo from "../../assets/logos/logo_green.svg";
import profile from "../../assets/icons/profile.svg";
import cart from "../../assets/icons/cart.svg";
import search from "../../assets/icons/search.svg";
import { Link } from "react-router-dom";

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
          className="w-full px-4 py-2 text-sm border-none focus:ring-arfagreen bg-arfagray"
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
      <div className="flex items-center justify-end col-start-11 gap-2 ">
        <button className="flex justify-center gap-2 px-4 bg-transparent focus:outline-none md:px-5 hover:border-arfagreen">
          <span className="text-xs font-normal text-arfagreen md:text-sm">
            Wishlist
          </span>
          <img
            src={profile}
            alt="profile"
            className="w-3 h-auto cursor-pointer md:w-5"
          />
        </button>
        <button className="flex justify-center gap-2 px-4 bg-transparent focus:outline-none md:px-5 hover:border-arfagreen">
          <span className="text-xs font-normal text-arfagreen md:text-sm">
            Cart
          </span>
          <img
            src={cart}
            alt="cart"
            className="w-3 h-auto cursor-pointer md:w-5"
          />
        </button>
      </div>
    </div>
  );
}

export default NavigationBar;
