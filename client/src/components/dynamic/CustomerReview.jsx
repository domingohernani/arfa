import React, { memo, useCallback, useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import DisplayStars from "./DisplayStars";
import { calculateRatingSummary, formatTimestamp } from "../globalFunctions";
import { getImageDownloadUrl } from "../../firebase/photos";
import noReview from "../../assets/images/no-review.jpg";
import { Progress } from "flowbite-react";

const displayReviews = (reviews, urls) => {
  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full gap-3 mt-10">
        <img src={noReview} className="w-60 h-60" alt="No reviews" />
        <h1 className="text-2xl font-semibold tracking-tight text-arfablack">
          No Reviews Yet
        </h1>
        <p className="text-sm text-center">
          Sorry, but it looks like there are no reviews available at the moment.
          Please check back later.
        </p>
      </div>
    );
  }

  return reviews.map((review, index) => (
    <div
      className="flex flex-col pt-3 border-b border-gray-100 md:gap-2 max-xl:max-w-2xl max-xl:mx-auto"
      key={review.id || index}
    >
      <div className="flex items-center mb-4">
        <DisplayStars number={review.rating} size={5} />
      </div>
      <div className="flex sm:items-center flex-col min-[400px]:flex-row justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center overflow-hidden rounded-md bg-arfagray w-14 h-14 aspect-square">
            {urls[index] ? (
              <img
                className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                src={urls[index]}
                loading="lazy"
                alt="User profile"
              />
            ) : (
              <span className="font-bold">HD</span>
            )}
          </div>
          <h6 className="text-sm font-medium leading-8 text-arfablack">
            {review.userData?.email || "Anonymous"}
          </h6>
        </div>
        <p className="text-sm italic font-normal leading-8 text-arfablack">
          {formatTimestamp(review.date)}
        </p>
      </div>
      <h3 className="text-sm font-semibold leading-9 text sm:text-sm text-arfablack">
        {review.title}
      </h3>
      <p className="text-sm font-normal leading-relaxed">
        {review.description}
      </p>
    </div>
  ));
};

const CustomerReview = memo(({ reviews, showAverageOfReview }) => {
  const [profileUrls, setProfileUrls] = useState([]);
  const [rating, setRating] = useState({});
  const [loading, setLoading] = useState(true);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedRating, setSelectedRating] = useState("All"); // Default to "All"

  const fetchProfileUrlsAndRating = useCallback(async () => {
    try {
      setLoading(true);
      // Calculate rating
      const rate = calculateRatingSummary(reviews);

      // Fetch profile URLs
      const urls = await Promise.all(
        Object.keys(reviews).map(async (key) => {
          const profileUrl = reviews[key].userData?.profileUrl;
          if (profileUrl) {
            return await getImageDownloadUrl(profileUrl);
          }
          return null;
        })
      );

      showAverageOfReview(rate.average);
      setProfileUrls(urls);
      setRating(rate);
      setFilteredReviews(Object.values(reviews)); // Initialize with all reviews
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [reviews, showAverageOfReview]);

  useEffect(() => {
    fetchProfileUrlsAndRating();
  }, [fetchProfileUrlsAndRating]);

  // Filter reviews based on selected star rating
  useEffect(() => {
    if (selectedRating === "All") {
      setFilteredReviews(Object.values(reviews));
    } else {
      const filtered = Object.values(reviews).filter(
        (review) => review.rating === Number(selectedRating)
      );
      setFilteredReviews(filtered);
    }
  }, [selectedRating, reviews]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="relative pt-5">
      <div className="w-full px-4 mx-auto max-w-7xl md:px-5 lg-6">
        <div className="w-full">
          <h2 className="pb-5 text-xl font-semibold text-gray-900 sm:text-2xl">
            Customer Reviews
          </h2>
          <div className="grid grid-cols-1 border-b border-gray-100 xl:grid-cols-2 gap-11 pb-11 max-xl:max-w-2xl max-xl:mx-auto">
            <div className="flex flex-col w-full box">
              {Object.entries(rating.percentages).map(([star, percentage]) => (
                <div className="flex items-center w-full" key={star}>
                  <p className="text-arfablack mr-0.5">{star}</p>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="green"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                      fill="#0E9F6E"
                    />
                  </svg>
                  <div className="h-2 w-full xl:min-w-[278px] rounded-3xl bg-arfagray ml-5 mr-3">
                    <Progress
                      progress={percentage}
                      className="bg-arfagray progressBarBg"
                    />
                  </div>
                  <p className="text-arfablack mr-0.5">
                    {rating.ratingCounter[star]}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-arfagray">
              <h2 className="text-3xl font-bold text-arfagreen sm:text-3xl">
                {rating.average.toFixed(1)}
              </h2>
              <div className="flex items-center justify-center mb-4">
                <DisplayStars number={Math.round(rating.average)} size={10} />
              </div>
              <p className="text-sm leading-8 text-center text-gray-900">
                {rating.numberOfRatings} ratings
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end mt-10">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="inline-flex justify-center text-sm font-medium text-gray-700 bg-transparent hover:border-transparent group hover:text-gray-900">
                  Filter
                  <ChevronDownIcon
                    className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-0 z-10 w-40 mt-2 transition origin-top-right bg-white rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="flex flex-col py-1">
                  <MenuItem className="cursor-pointer">
                    <span
                      className="block px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-arfagreen"
                      onClick={() => setSelectedRating("All")}
                    >
                      All
                    </span>
                  </MenuItem>
                  {[5, 4, 3, 2, 1].map((star) => (
                    <MenuItem className="cursor-pointer" key={star}>
                      <span
                        className="block px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-arfagreen"
                        onClick={() => setSelectedRating(star.toString())}
                      >
                        {star} Stars
                      </span>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>
          </div>
          {displayReviews(filteredReviews, profileUrls)}
        </div>
      </div>
    </section>
  );
});

export default CustomerReview;
