import React, { useState } from "react";
import { Pagination } from "flowbite-react";
import { Link } from "react-router-dom";
import DisplayStars from "./DisplayStars";

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
              <span className="text-sm cursor-pointer text-arfablack hover:text-arfablack">
                Arabian Family Sofa
                <span className="absolute" aria-hidden="true"></span>
              </span>
            </h3>
            <div className="flex items-center mt-2">
              <DisplayStars number={4} size={4} />
            </div>
          </div>

          <div className="text-right">
            <del className="mt-px text-xs font-semibold text-gray-600 sm:text-sm">
              ₱21,999
            </del>
            <p className="text-xs font-normal text-arfablack sm:text-sm md:text-base">
              ₱19,999
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
        <div className="flex mt-10 text-sm font-normal paginationContainer sm:justify-center">
          <div className="block mx-auto sm:hidden">
            <Pagination
              layout="table"
              currentPage={currentPage}
              totalPages={234}
              onPageChange={onPageChange}
              showIcons
            />
          </div>
          <div className="hidden mx-auto sm:block">
            <Pagination
              currentPage={currentPage}
              totalPages={234}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisplayFurnitures;
