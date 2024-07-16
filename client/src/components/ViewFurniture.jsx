import React from "react";
import ShowModel from "./ShowModel";
import cart from "../assets/icons/cart.svg";
import { Carousel } from "flowbite-react";
import CustomerReview from "./dynamic/CustomerReview";
import DisplayStars from "./dynamic/DisplayStars";

const ViewFurniture = () => {
  return (
    <section className="h-screen">
      <section className="box-border py-5 antialiased lg:pl-8 md:pl-4 lg:border-l dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 pb-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="flex flex-col w-full lg:gap-4 shrink-0">
              <div className="h-56 md:h-64 2xl:h-90">
                <Carousel>
                  <img
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="..."
                  />
                  <img
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="..."
                  />
                  <img
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="..."
                  />
                  <img
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="..."
                  />
                </Carousel>
              </div>
              <div className="h-56 rounded-none md:rounded-lg md:h-64 2xl:h-90 bg-arfagray">
                <ShowModel path="../src/assets/models/sofa.glb" />
                <span className="hidden text-xs italic md:block">
                  Note: AR feature is currently only available on Android and
                  IOS devices.{" "}
                  <a
                    className="not-italic font-normal text-blue-700 underline"
                    href="https://modelviewer.dev/docs/faq.html"
                    target="_blank"
                  >
                    Learn more
                  </a>
                </span>
              </div>
            </div>

            <div className="mt-14 sm:mt-20 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                Arabian Family Sofa
              </h1>
              <p className="mt-2 text-sm ">
                by <span className="underline">Domskie Furniture Shop</span>
              </p>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                  ₱19,999
                  <span className="text-sm font-normal text-arfablack">
                    <del> ₱21,999</del>
                  </span>
                </p>

                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <div className="flex items-center">
                    <DisplayStars number={4} size={5} />
                  </div>
                  <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                    (4)
                  </p>
                  <a
                    href="#"
                    className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                  >
                    345 Reviews
                  </a>
                </div>
              </div>

              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <a
                  href="#"
                  title=""
                  className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  role="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Outline"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="w-4 h-4 -ms-2 me-2 text-arfablack"
                  >
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z" />
                  </svg>
                  Add to wishlist
                </a>

                <a
                  href="#"
                  title=""
                  className="text-white bg-arfagreen mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
                  role="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#ffffff"
                    className="w-4 h-4 -ms-2 me-2"
                    id="Outline"
                    viewBox="0 0 24 24"
                    width="512"
                    height="512"
                  >
                    <path d="M22.713,4.077A2.993,2.993,0,0,0,20.41,3H4.242L4.2,2.649A3,3,0,0,0,1.222,0H1A1,1,0,0,0,1,2h.222a1,1,0,0,1,.993.883l1.376,11.7A5,5,0,0,0,8.557,19H19a1,1,0,0,0,0-2H8.557a3,3,0,0,1-2.82-2h11.92a5,5,0,0,0,4.921-4.113l.785-4.354A2.994,2.994,0,0,0,22.713,4.077ZM21.4,6.178l-.786,4.354A3,3,0,0,1,17.657,13H5.419L4.478,5H20.41A1,1,0,0,1,21.4,6.178Z" />
                    <circle cx="7" cy="22" r="2" />
                    <circle cx="17" cy="22" r="2" />
                  </svg>
                  Add to cart
                </a>
              </div>

              <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-800" />

              <p className="mb-6 text-arfablack">
                Crafted with high-quality materials, the Arabic Majlis Sofa is
                built to last. The frame is typically made of sturdy wood, and
                the cushions are upholstered in plush fabric, often velvet or
                brocade. The sofa is also spacious and comfortable, providing
                ample seating for family and friends.
              </p>

              <p className=" text-arfablack">
                This modern green velvet sofa is a stylish and versatile piece
                of furniture that would be a great addition to any living room.
                The soft, luxurious velvet fabric is inviting and comfortable,
                and the emerald green color adds a touch of glamour. The sofa
                also has clean lines and a simple design, making it perfect for
                both modern and traditional homes.
              </p>
            </div>
          </div>
        </div>
        <hr />
        <section>
          <CustomerReview />
        </section>
      </section>
    </section>
  );
};

export default ViewFurniture;
