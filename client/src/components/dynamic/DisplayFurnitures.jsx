import React, { useEffect, useState } from "react";
import { Pagination } from "flowbite-react";
import { Link } from "react-router-dom";
import DisplayStars from "./DisplayStars";
import { fetchFurnitureCollection } from "../../firebase/furniture";
import formatToPeso from "../formatToPeso";
import { getImageDownloadUrl } from "../../firebase/photos";

const displaySkeleton = (numSkeletons) => {
  return Array.from({ length: numSkeletons }).map(() => (
    <article className="relative cursor-pointer animate-pulse">
      <div className="flex items-center justify-center overflow-hidden bg-gray-200 rounded-lg aspect-square">
        <svg
          className="w-10 h-10 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div className="absolute top-0 m-1 rounded-full "></div>
      <div className="flex items-start justify-between mt-4">
        <div className="w-full">
          <div className="h-2.5 bg-gray-200 rounded-full max-w-[480px] mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
        </div>
      </div>
    </article>
  ));
};

const displayFurnitures = (furnitures, imageUrls, loading) => {
  if (loading) {
    return displaySkeleton(10);
  }

  return furnitures.map((furniture, index) => (
    <Link to={`/catalog/${furniture.name}`} key={index}>
      <article className="relative cursor-pointer">
        <div className="overflow-hidden rounded-lg aspect-square">
          <img
            className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
            src={imageUrls[index]}
            alt={furniture.name}
          />
        </div>
        {furniture.price != furniture.discountedPrice ? (
          <div className="absolute top-0 m-1 rounded-full ">
            <p className="text-[10px] rounded-full bg-arfablack p-1 font-bold uppercase tracking-wide text-white sm:px-3 sm:py-1">
              Sale
            </p>
          </div>
        ) : null}
        <div className="flex items-start justify-between mt-4">
          <div className="relative">
            <h3 className="text-xs font-semibold sm:text-sm md:text-base">
              <div className="w-32 text-sm truncate cursor-pointer md:w-full 2xl:w-32 lg:w-20 text-arfablack hover:text-arfablack whitespace-nowrap">
                {furniture.name}
                <span className="absolute" aria-hidden="true"></span>
              </div>
            </h3>
            <div className="flex items-center mt-2">
              <DisplayStars number={4} size={4} />
            </div>
          </div>

          <div className="text-right">
            {furniture.price != furniture.discountedPrice ? (
              <>
                <del className="mt-px text-xs text-gray-600 sm:text-xs">
                  {formatToPeso(furniture.price)}
                </del>
                <p className="font-normal text-arfablack sm:text-sm md:text-sm">
                  {formatToPeso(furniture.discountedPrice)}
                </p>
              </>
            ) : (
              <p className="font-normal text-arfablack sm:text-sm md:text-sm">
                {formatToPeso(furniture.price)}
              </p>
            )}
          </div>
        </div>
      </article>
    </Link>
  ));
};

const DisplayFurnitures = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => setCurrentPage(page);

  const [loading, setLoading] = useState(true);
  const [furnitures, setFurnitures] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataList = await fetchFurnitureCollection("furnitures");
        setFurnitures(dataList);

        const urls = await Promise.all(
          dataList.map(async (item) => {
            const url = await getImageDownloadUrl(
              `${item.imagesUrl}/${item.imgPreviewFilename}`
            );
            return url;
          })
        );
        setImageUrls(urls);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <section className="bg-white md:pl-8 md:border-l text-arfablack">
      <div className="max-w-screen-xl mx-auto ">
        <h2 className="mt-4 text-lg font-semibold sm:text-2xl">
          Showing 25 out of 234
        </h2>
        <div className="grid grid-cols-2 gap-6 mt-5 lg:mt-10 lg:grid-cols-5 lg:gap-4">
          {displayFurnitures(furnitures, imageUrls, loading)}
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
