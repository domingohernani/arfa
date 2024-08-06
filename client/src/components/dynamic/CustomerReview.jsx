import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import DisplayStars from "./DisplayStars";

const displayReviews = () => {
  let furnitures = Array(25).fill();

  return furnitures.map((e, index) => (
    <div
      className="pt-3 pb-8 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto"
      key={index}
    >
      <div className="flex items-center mb-4">
        <DisplayStars number={4} size={5} />
      </div>
      <h3 className="text-xl font-semibold leading-9 text sm:text-2xl text-arfablack">
        Outstanding Experience!!!
      </h3>
      <div className="flex sm:items-center flex-col min-[400px]:flex-row justify-between gap-5 mb-4">
        <div className="flex items-center gap-3">
          <img
            src="https://pagedone.io/asset/uploads/1704349572.png"
            alt="John image"
            className="w-8 h-8"
          />
          <h6 className="font-medium leading-8 text-arfagreen">John Watson</h6>
        </div>
        <p className="text-sm font-normal leading-8 text-gray-400">
          Nov 01, 2023
        </p>
      </div>
      <p className="text-sm font-normal leading-relaxed ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa dolorem
        praesentium tempore ab fugiat esse dolore sapiente reiciendis officia,
        molestiae beatae similique inventore veritatis hic? Provident eos
        eveniet fugit iure iste corrupti, magni laboriosam quas. Laborum
        recusandae cum doloremque, suscipit nemo earum modi. Voluptatem quaerat
        commodi fugiat officiis ea asperiores.
      </p>
    </div>
  ));
};

const CustomerReview = () => {
  return (
    <section className="relative py-5">
      <div className="w-full px-4 mx-auto max-w-7xl md:px-5 lg-6">
        <div className="w-full">
          <h2 className="pb-5 text-xl font-semibold text-gray-900 sm:text-2xl">
            Customer Reviews
          </h2>
          <div className="grid grid-cols-1 border-b border-gray-100 xl:grid-cols-2 gap-11 pb-11 max-xl:max-w-2xl max-xl:mx-auto">
            <div className="flex flex-col w-full box gap-y-4 ">
              <div className="flex items-center w-full">
                <p className=" text-arfablack mr-0.5">5</p>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="green"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_12042_8589)">
                    <path
                      d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                      fill="#0E9F6E"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_12042_8589">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p className="h-2 w-full sm:min-w-[278px] rounded-3xl bg-arfagray ml-5 mr-3">
                  <span className="h-full w-[30%] rounded-3xl bg-arfagreen flex"></span>
                </p>
                <p className="  text-arfablack mr-0.5">989</p>
              </div>
              <div className="flex items-center w-full">
                <p className=" text-arfablack mr-0.5">4</p>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_12042_8589)">
                    <path
                      d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                      fill="#0E9F6E"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_12042_8589">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p className="h-2 w-full xl:min-w-[278px] rounded-3xl bg-arfagray ml-5 mr-3">
                  <span className="h-full w-[40%] rounded-3xl bg-arfagreen flex"></span>
                </p>
                <p className="text-arfablack mr-0.5">4.5K</p>
              </div>
              <div className="flex items-center">
                <p className="text-arfablack mr-0.5">3</p>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_12042_8589)">
                    <path
                      d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                      fill="#0E9F6E"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_12042_8589">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p className="h-2 w-full xl:min-w-[278px] rounded-3xl bg-arfagray ml-5 mr-3">
                  <span className="h-full w-[20%] rounded-3xl bg-arfagreen flex"></span>
                </p>
                <p className="  text-arfablack mr-0.5">50</p>
              </div>
              <div className="flex items-center">
                <p className="  text-arfablack mr-0.5">2</p>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_12042_8589)">
                    <path
                      d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                      fill="#0E9F6E"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_12042_8589">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p className="h-2 w-full xl:min-w-[278px] rounded-3xl bg-arfagray ml-5 mr-3">
                  <span className="h-full w-[16%] rounded-3xl bg-arfagreen flex"></span>
                </p>
                <p className=" text-arfablack mr-0.5">16</p>
              </div>
              <div className="flex items-center">
                <p className=" text-arfablack mr-0.5">1</p>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_12042_8589)">
                    <path
                      d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                      fill="#0E9F6E"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_12042_8589">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p className="h-2 w-full xl:min-w-[278px] rounded-3xl bg-arfagray ml-5 mr-3">
                  <span className="h-full w-[8%] rounded-3xl bg-arfagreen flex"></span>
                </p>
                <p className=" py-[1px] text-arfablack mr-0.5">8</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-arfagray">
              <h2 className="mb-6 text-3xl font-bold text-arfagreen sm:text-3xl">
                4.3
              </h2>
              <div className="flex items-center justify-center mb-4">
                <DisplayStars number={4} size={14} />
              </div>
              <p className="text-base leading-8 text-center text-gray-900">
                5563 Ratings
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end mt-10">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="inline-flex justify-center text-sm font-medium text-gray-700 bg-transparent hover:border-transparent group hover:text-gray-900">
                  Sort by
                  <ChevronDownIcon
                    className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="flex flex-col py-1">
                  <MenuItem>
                    <a
                      className="block px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-arfagreen"
                      href="#"
                    >
                      5 Stars
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      className="block px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-arfagreen"
                      href="#"
                    >
                      4 Stars
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      className="block px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-arfagreen"
                      href="#"
                    >
                      3 Stars
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      className="block px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-arfagreen"
                      href="#"
                    >
                      2 Stars
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      className="block px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-arfagreen"
                      href="#"
                    >
                      1 Star
                    </a>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </div>
          {displayReviews()}
        </div>
      </div>
    </section>
  );
};

export default CustomerReview;
