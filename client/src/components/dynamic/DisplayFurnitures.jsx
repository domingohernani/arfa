import React, { useState } from "react";
import { Pagination } from "flowbite-react";
import { Link } from "react-router-dom";

const displayFurnitures = () => {
  let furnitures = Array(25).fill();

  let item = "arabian-family-sofa";

  return furnitures.map((e, index) => (
    <Link to={`/catalog/${item}`} key={index}>
      <article className="relative cursor-pointer">
        <div className="overflow-hidden rounded-lg aspect-square">
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
              <span
                className="cursor-pointer text-arfablack hover:text-arfablack"
              >
                Arabian Family Sofa
                <span className="absolute" aria-hidden="true"></span>
              </span>
            </h3>
            <div className="flex items-center mt-2">
              <svg
                className="w-4 h-4 text-arfagreen"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg
                className="w-4 h-4 text-arfagreen"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg
                className="w-4 h-4 text-arfagreen"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg
                className="w-4 h-4 text-arfagreen"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg
                className="w-4 h-4 text-gray-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
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
    <section className="bg-white md:pl-8 md:border-l text-arfablack">
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
