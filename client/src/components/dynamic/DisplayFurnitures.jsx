import React, { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import DisplayStars from "./DisplayStars";
import { fetchFurnitureCollection } from "../../firebase/furniture";
import { useQuery } from "@tanstack/react-query";
import {
  calculateRatingSummary,
  formatToPeso,
  toSlug,
  unSlug,
} from "../globalFunctions";
import { getImageDownloadUrl } from "../../firebase/photos";
import { where } from "firebase/firestore";
import noResult from "../../assets/images/no-result.png";
import { useStore } from "../../stores/useStore";
import { DisplayFurnituresSkeleton } from "../skeletons/DisplayFurnituresSkeleton";

// Sorting logic remains the same
const sortFurnitures = (option, furnitures) => {
  if (option === "best-rating") {
    furnitures.sort((a, b) => {
      const ratingA = calculateRatingSummary(a.reviewsData || {}).average || 0;
      const ratingB = calculateRatingSummary(b.reviewsData || {}).average || 0;
      return ratingB - ratingA;
    });
  } else if (option === "newest") {
    furnitures.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
  } else if (option === "price-asc") {
    furnitures.sort((a, b) => a.discountedPrice - b.discountedPrice);
  } else if (option === "price-desc") {
    furnitures.sort((a, b) => b.discountedPrice - a.discountedPrice);
  }
};

const DisplayFurnitures = () => {
  const { category } = useParams();
  const sale = useStore((state) => state.isSaleOnly);
  const newArrival = useStore((state) => state.isNewArrivalsOnly);
  const minPrice = useStore((state) => state.minPrice);
  const maxPrice = useStore((state) => state.maxPrice);
  const sortOption = useStore((state) => state.sortOption);

  // Dimensions
  const width = useStore((state) => state.width);
  const depth = useStore((state) => state.depth);
  const height = useStore((state) => state.height);

  // Data Fetching Function
  const fetchFurnitures = async () => {
    let filters = [];
    if (category !== undefined)
      filters.push(where("category", "==", unSlug(category)));

    if (sale) filters.push(where("isSale", "==", true));

    if (newArrival) {
      const now = new Date();
      const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
      filters.push(where("createdAt", ">=", thirtyDaysAgo));
    }

    if (minPrice) filters.push(where("discountedPrice", ">=", minPrice));
    if (maxPrice) filters.push(where("discountedPrice", "<=", maxPrice));

    if (width) filters.push(where("width", "==", width));
    if (depth) filters.push(where("depth", "==", depth));
    if (height) filters.push(where("height", "==", height));

    const dataList = await fetchFurnitureCollection("furnitures", filters);

    // Sorting
    sortFurnitures(sortOption, dataList);

    // Fetching Image URLs
    const urls = await Promise.all(
      dataList.map(async (item) => {
        const url = await getImageDownloadUrl(
          `${item.imagesUrl}/${item.imgPreviewFilename}`
        );
        return url;
      })
    );

    return { furnitures: dataList, imageUrls: urls };
  };

  // Use useQuery for fetching data
  const { data, isLoading, error } = useQuery({
    queryKey: [
      "furnitures",
      {
        category,
        sale,
        newArrival,
        minPrice,
        maxPrice,
        sortOption,
        width,
        depth,
        height,
      },
    ],
    queryFn: fetchFurnitures,
  });

  const displaySkeleton = useCallback((numSkeletons) => {
    return (
      <section className="bg-white md:pl-8 text-arfablack">
        <div className="max-w-screen-xl mx-auto ">
          <section className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-4">
            <DisplayFurnituresSkeleton numSkeletons={numSkeletons} />
          </section>
        </div>
      </section>
    );
  }, []);

  const displayFurnitures = useCallback(
    (furnitures, imageUrls, loading) => {
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
            {furniture.isSale && (
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
                  </div>
                </h3>
                <div className="flex items-center mt-2">
                  <DisplayStars
                    number={Math.round(
                      calculateRatingSummary(furniture.reviewsData).average
                    )}
                    size={4}
                  />
                </div>
              </div>

              <div className="text-right">
                {furniture.isSale ? (
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

  if (isLoading) return displaySkeleton(10);
  if (error) return <p>Error loading data...</p>;

  const { furnitures, imageUrls } = data;

  return (
    <section className="bg-white md:pl-8 text-arfablack">
      <div className="max-w-screen-xl mx-auto ">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-4">
          {displayFurnitures(furnitures, imageUrls, isLoading)}
        </div>
        {furnitures.length === 0 && !isLoading && (
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
        )}
      </div>
    </section>
  );
};

export default DisplayFurnitures;
