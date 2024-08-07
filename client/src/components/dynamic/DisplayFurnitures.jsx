import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import DisplayStars from "./DisplayStars";
import { fetchFurnitureCollection } from "../../firebase/furniture";
import { formatToPeso, toSlug, unSlug } from "../globalFunctions";
import { getImageDownloadUrl } from "../../firebase/photos";
import { where } from "firebase/firestore";
import noResult from "../../assets/images/no-result.png";

const DisplayFurnitures = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [furnitures, setFurnitures] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let dataList = [];
        if (category !== undefined) {
          const filter = [where("category", "==", unSlug(category))];
          dataList = await fetchFurnitureCollection("furnitures", filter);
        } else {
          dataList = await fetchFurnitureCollection("furnitures");
        }
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
  }, [category]);

  const onPageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const displaySkeleton = useCallback((numSkeletons) => {
    return Array.from({ length: numSkeletons }).map((_, index) => (
      <article className="relative cursor-pointer animate-pulse" key={index}>
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
  }, []);

  const displayFurnitures = useCallback(
    (furnitures, imageUrls, loading) => {
      if (loading) {
        return displaySkeleton(10);
      }

      return furnitures.map((furniture, index) => (
        <Link to={`item/${toSlug(furniture.name)}/${furniture.id}`} key={index}>
          <article className="relative cursor-pointer">
            <div className="overflow-hidden border rounded-lg aspect-square">
              <img
                className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                src={imageUrls[index]}
                loading="lazy"
              />
            </div>
            {furniture.price !== furniture.discountedPrice && (
              <div className="absolute top-0 m-1 rounded-full ">
                <p className="text-[10px] rounded-full bg-arfablack p-1 font-bold uppercase tracking-wide text-white sm:px-3 sm:py-1">
                  Sale
                </p>
              </div>
            )}
            <div className="flex items-start justify-between mt-4">
              <div className="relative">
                <h3 className="text-xs font-semibold sm:text-sm md:text-sm">
                  <div className="w-20 text-sm truncate cursor-pointer sm:w-24 2xl:w-32 lg:w-20 text-arfablack hover:text-arfablack whitespace-nowrap">
                    {furniture.name}
                    <span className="absolute" aria-hidden="true"></span>
                  </div>
                </h3>
                <div className="flex items-center mt-2">
                  <DisplayStars number={4} size={4} />
                </div>
              </div>

              <div className="text-right">
                {furniture.price !== furniture.discountedPrice ? (
                  <>
                    <del className="mt-px text-xs text-gray-600 sm:text-xs">
                      {formatToPeso(furniture.price)}
                    </del>
                    <p className="text-sm font-normal text-arfablack">
                      {formatToPeso(furniture.discountedPrice)}
                    </p>
                  </>
                ) : (
                  <p className="text-sm font-normal text-arfablack">
                    {formatToPeso(furniture.price)}
                  </p>
                )}
              </div>
            </div>
          </article>
        </Link>
      ));
    },
    [displaySkeleton]
  );

  return (
    <section className="bg-white md:pl-8 md:border-l text-arfablack">
      <div className="max-w-screen-xl mx-auto ">
        <div className="grid grid-cols-2 gap-6 mt-5 sm:grid-cols-3 md:grid-cols-4 lg:mt-10 lg:grid-cols-5 lg:gap-4">
          {displayFurnitures(furnitures, imageUrls, loading)}
        </div>
        {furnitures.length == 0 && !loading? (
          <div className="flex flex-col items-center justify-center w-full gap-3 mt-10">
            <img src={noResult} className="w-60 h-60" />
            <h1 className="text-2xl font-semibold tracking-tight text-arfablack">
              No results found.
            </h1>
            <p className="text-sm text-center">
              Sorry, no results were found. Please try adjusting your filters or
              check back later.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default DisplayFurnitures;
