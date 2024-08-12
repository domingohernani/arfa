import React from "react";

const ViewFurnitureSkeleton = () => {
  return (
    <section className="box-border pt-5 antialiased lg:pl-8 md:pl-4 dark:bg-gray-900 animate-pulse">
      <div className="max-w-screen-xl px-4 mx-auto lg:pb-24 min-h-fit 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-4 xl:gap-6">
          <div className="flex flex-col w-full lg:gap-4 shrink-0">
            <div className="relative flex items-center justify-center overflow-hidden bg-gray-200 rounded-lg lg:h-80 sm:h-80 md:h-96 aspect-square">
              <svg
                className="w-20 h-20 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>

              <div className="absolute flex gap-2 top-3 right-3">
                <div className="flex items-center w-16 h-6 gap-1 px-2 py-1 bg-gray-300 rounded-md"></div>
                <div className="flex items-center w-16 h-6 gap-1 px-2 py-1 bg-gray-300 rounded-md"></div>
              </div>
            </div>
          </div>

          <div className="mt-5 lg:mt-0">
            <div className="w-3/4 h-6 mb-4 bg-gray-300 rounded-full"></div>
            <div className="w-1/2 h-4 mb-4 bg-gray-300 rounded-full"></div>
            <div className="w-1/2 h-4 mb-4 bg-gray-300 rounded-full"></div>
            <div className="flex mt-4 sm:items-center sm:gap-4 sm:flex">
              <div className="w-1/3 h-8 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <div className="w-16 h-4 bg-gray-300 rounded-full"></div>
                <div className="w-16 h-4 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            <div className="mt-6 sm:gap-4 sm:items-center sm:flex">
              <div className="w-32 h-10 bg-gray-300 rounded-lg"></div>
              <div className="w-32 h-10 mt-4 bg-gray-300 rounded-lg sm:mt-0"></div>
            </div>

            <div className="w-full h-4 mt-6 bg-gray-300 rounded-full"></div>
            <div className="w-full h-4 mt-2 bg-gray-300 rounded-full"></div>
            <div className="w-full h-4 mt-2 bg-gray-300 rounded-full"></div>
            <div className="w-full h-4 mt-2 bg-gray-300 rounded-full"></div>
            <div className="w-3/4 h-4 mt-2 bg-gray-300 rounded-full"></div>
            <div className="w-3/4 h-4 mt-2 bg-gray-300 rounded-full"></div>
            <div className="w-3/4 h-4 mt-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
      <hr />
      <section className=""></section>
    </section>
  );
};

export default ViewFurnitureSkeleton;
