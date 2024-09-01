import React from "react";

const displayOrder = () => {
  return <h1></h1>;
};

const Order = () => {
  return (
    <section class="relative">
      <div class="w-full mx-auto px-4 md:px-8">
        <div class="font-medium lead-10 text-black mb-9">Order History</div>
        <div class="flex sm:flex-col lg:flex-row sm:items-center justify-between">
          <ul class="flex max-sm:flex-col sm:items-center gap-x-14 gap-y-3">
            <li class="text-sm leading-8 cursor-pointer text-arfagreen transition-all duration-500 hover:text-arfagreen">
              All Order
            </li>
            <li class="text-sm leading-8 cursor-pointer text-black transition-all duration-500 hover:text-arfagreen">
              Summary
            </li>
            <li class="text-sm leading-8 cursor-pointer text-black transition-all duration-500 hover:text-arfagreen">
              Completed
            </li>
            <li class="text-sm leading-8 cursor-pointer text-black transition-all duration-500 hover:text-arfagreen">
              Cancelled
            </li>
          </ul>
          <div class="flex max-sm:flex-col items-center justify-end gap-2 max-lg:mt-5">
            <div class="flex items-center rounded-full px-4 border relative">
              <input
                type="date"
                name="from-dt"
                id="from-dt"
                class="border-none focus:ring-transparent  text-sm text-gray-900 outline-0 appearance-none flex flex-row-reverse cursor-pointer  placeholder-gray-900"
                placeholder="11-01-2023"
              />
            </div>
            <p class="leading-8 text-black">To</p>
            <div class="flex rounded-full  px-4 border border-gray-300 relative">
              <input
                type="date"
                name="to-dt"
                id="to-dt"
                class="border-none focus:ring-transparent  text-sm text-gray-900 outline-0 appearance-none flex flex-row-reverse cursor-pointer  placeholder-gray-900"
                placeholder="11-01-2023"
              />
            </div>
          </div>
        </div>
        <div class="mt-7 border  border-gray-200 pt-9">
          <div class="flex max-md:flex-col items-center justify-between px-3 md:px-11">
            <div class="data">
              <p class="text-sm leading-8 text-black whitespace-nowrap">
                Order : <span className="text-gray-500">#10234987</span>
              </p>
              <p class="text-sm leading-8 text-black mt-3 whitespace-nowrap">
                Order Payment :{" "}
                <span className="text-gray-500">July 16, 2024</span>
              </p>
            </div>
            <div class="flex items-center gap-3 max-md:mt-5">
              <button class="rounded-full px-7 py-2 bg-white text-gray-900 border border-gray-300 font-normal text-sm shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400">
                Show Invoice
              </button>
              <button class="rounded-full px-7 py-2 bg-arfagreen shadow-sm shadow-transparent text-white font-normal text-sm transition-all duration-500  hover:bg-arfagreen">
                Buy Again
              </button>
            </div>
          </div>
          <svg
            class="my-4 w-full"
            xmlns="http://www.w3.org/2000/svg"
            width="1216"
            height="2"
            viewBox="0 0 1216 2"
            fill="none"
          >
            <path d="M0 1H1216" stroke="#D1D5DB" />
          </svg>

          <div class="flex max-lg:flex-col items-center px-3 md:px-11">
            <div class="grid grid-cols-4 w-full">
              <div class="col-span-4  sm:col-span-1">
                <img
                  src="https://pagedone.io/asset/uploads/1705474774.png"
                  alt=""
                  class="max-sm:mx-auto rounded-md object-cover aspect-square"
                />
              </div>
              <div class="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                <h6 class="font-semibold text-sm leading-9 text-black mb-3 whitespace-nowrap">
                  Lorem, ipsum dolor.
                </h6>
                <p class="font-normal text-sm leading-8 text-gray-500 mb-8 whitespace-nowrap">
                  By: Dust Studios
                </p>
                <div class="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                  <span class="font-normal text-sm leading-8 text-gray-500 whitespace-nowrap">
                    Variant: Modern Teal
                  </span>
                  <span class="font-normal text-sm leading-8 text-gray-500 whitespace-nowrap">
                    Qty: 1
                  </span>
                  <p class="font-normal text-sm leading-8 text-black whitespace-nowrap">
                    Price ₱19,9999
                  </p>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-around w-full  sm:pl-28 lg:pl-0">
              <div class="flex flex-col justify-center items-start max-sm:items-center">
                <p class="font-normal text-sm text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                  Status
                </p>
                <p class="font-semibold text-sm leading-8 text-arfagreen text-left whitespace-nowrap">
                  Delivered
                </p>
              </div>
              <div class="flex flex-col justify-center items-start max-sm:items-center">
                <p class="font-normal text-sm text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                  Delivery Expected by
                </p>
                <p class="font-semibold text-sm leading-8 text-black text-left whitespace-nowrap">
                  July 24 March 2024
                </p>
              </div>
              <div class="flex flex-col justify-center items-start max-sm:items-center">
                <p class="font-semibold text-sm leading-8 text-arfagreen text-left whitespace-nowrap">
                  View Product
                </p>
              </div>
            </div>
          </div>

          <svg
            class="my-4 w-full"
            xmlns="http://www.w3.org/2000/svg"
            width="1216"
            height="2"
            viewBox="0 0 1216 2"
            fill="none"
          >
            <path d="M0 1H1216" stroke="#D1D5DB" />
          </svg>

          <div class="flex max-lg:flex-col items-center px-3 md:px-11">
            <div class="grid grid-cols-4 w-full">
              <div class="col-span-4 sm:col-span-1">
                <img
                  src="https://pagedone.io/asset/uploads/1705474774.png"
                  alt=""
                  class="max-sm:mx-auto rounded-md object-cover aspect-square"
                />
              </div>
              <div class="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                <h6 class="font-semibold text-sm leading-9 text-black mb-3 whitespace-nowrap">
                  Lorem, ipsum dolor.
                </h6>
                <p class="font-normal text-sm leading-8 text-gray-500 mb-8 whitespace-nowrap">
                  By: Dust Studios
                </p>
                <div class="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                  <span class="font-normal text-sm leading-8 text-gray-500 whitespace-nowrap">
                    Variant: Modern Teal
                  </span>
                  <span class="font-normal text-sm leading-8 text-gray-500 whitespace-nowrap">
                    Qty: 1
                  </span>
                  <p class="font-normal text-sm leading-8 text-black whitespace-nowrap">
                    Price ₱19,9999
                  </p>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-around w-full  sm:pl-28 lg:pl-0">
              <div class="flex flex-col justify-center items-start max-sm:items-center">
                <p class="font-normal text-sm text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                  Status
                </p>
                <p class="font-semibold text-sm leading-8 text-arfagreen text-left whitespace-nowrap">
                  Delivered
                </p>
              </div>
              <div class="flex flex-col justify-center items-start max-sm:items-center">
                <p class="font-normal text-sm text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                  Delivery Expected by
                </p>
                <p class="font-semibold text-sm leading-8 text-black text-left whitespace-nowrap">
                  July 24 March 2024
                </p>
              </div>
              <div class="flex flex-col justify-center items-start max-sm:items-center">
                <p class="font-semibold text-sm leading-8 text-arfagreen text-left whitespace-nowrap">
                  View Product
                </p>
              </div>
            </div>
          </div>
          <svg
            class="my-4 w-full"
            xmlns="http://www.w3.org/2000/svg"
            width="1216"
            height="2"
            viewBox="0 0 1216 2"
            fill="none"
          >
            <path d="M0 1H1216" stroke="#D1D5DB" />
          </svg>

          <div class="px-3 md:px-11 flex items-center justify-end max-sm:flex-col-reverse">
            <p class="font-medium text-sm leading-8 text-black max-sm:py-4">
              <span class="text-gray-500">Total Price: </span> &nbsp;$200.00
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
