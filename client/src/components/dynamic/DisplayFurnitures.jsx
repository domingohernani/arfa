import React, { useState } from "react";
import { Pagination } from "flowbite-react";
import { Link } from "react-router-dom";

const displayFurnitures = () => {
  let furnitures = Array(25).fill();

  let item = "arabian-family-sofa";

  return furnitures.map(() => (
    <Link to={`/catalog/${item}`}>
      <article className="relative cursor-pointer ">
        <div className="overflow-hidden aspect-square">
          <img
            className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="absolute top-0 m-1 rounded-full ">
          <p className="text-[10px] rounded-full bg-arfablack p-1 font-bold uppercase tracking-wide text-white sm:px-3 sm:py-1">
            Sale
          </p>
        </div>
        <div className="flex items-start justify-between mt-4">
          <div className="">
            <h3 className="text-xs font-semibold sm:text-sm md:text-base">
              <a
                href="#"
                title=""
                className="cursor-pointer text-arfablack hover:text-arfablack"
              >
                Arabian Family Sofa
                <span className="absolute" aria-hidden="true"></span>
              </a>
            </h3>
            <div className="flex items-center mt-2">
              <svg
                className="block w-3 h-3 align-middle text-arfablack sm:h-4 sm:w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  className=""
                ></path>
              </svg>
              <svg
                className="block w-3 h-3 align-middle text-arfablack sm:h-4 sm:w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  className=""
                ></path>
              </svg>
              <svg
                className="block w-3 h-3 align-middle text-arfablack sm:h-4 sm:w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  className=""
                ></path>
              </svg>
              <svg
                className="block w-3 h-3 align-middle text-arfablack sm:h-4 sm:w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  className=""
                ></path>
              </svg>
              <svg
                className="block w-3 h-3 text-gray-400 align-middle sm:h-4 sm:w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  className=""
                ></path>
              </svg>
            </div>
          </div>

          <div className="text-right">
            <del className="mt-px text-xs font-semibold text-gray-600 sm:text-sm">
              $179.00
            </del>
            <p className="text-xs font-normal text-arfablack sm:text-sm md:text-base">
              $99.00
            </p>
          </div>
        </div>
      </article>
    </Link>
  ));
};

const DisplayFurnitures = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => setCurrentPage(page);

  return (
    <section className="bg-white text-arfablack">
      <div className="max-w-screen-xl mx-auto ">
        <h2 className="mt-4 text-lg font-semibold sm:text-2xl">
          Showing 25 out of 234
        </h2>
        <div className="grid grid-cols-2 gap-6 mt-5 lg:mt-10 lg:grid-cols-5 lg:gap-4">
          {displayFurnitures()}
        </div>
        <div className="flex w-full mt-10 overflow-x-scroll text-sm font-normal paginationContainer sm:justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={234}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </section>
  );
};

export default DisplayFurnitures;
