import React, { useCallback, useEffect, useState } from "react";
import ShowModel from "./ShowModel";
import { Carousel } from "flowbite-react";
import CustomerReview from "./dynamic/CustomerReview";
import DisplayStars from "./dynamic/DisplayStars";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { useParams } from "react-router-dom";
import { fetchFurnitureById } from "../firebase/furniture";
import { formatToPeso } from "../components/globalFunctions";
import { getAllImageDownloadUrl } from "../firebase/photos";

const ViewFurniture = () => {
  const { id } = useParams();
  const [furniture, setFurniture] = useState(null);
  const [furnitureImgUrls, setFurnitureImgUrls] = useState([]);
  const [modelURL, setModelURL] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aveReview, setAveReview] = useState(0);

  const showAverageOfReview = (number) => {
    setAveReview(number);
  };

  const fetchModel = useCallback(async (path) => {
    try {
      const storageRef = ref(storage, path);
      const url = await getDownloadURL(storageRef);
      setModelURL(url);
    } catch (error) {
      console.error("Error fetching model:", error);
    }
  }, []);

  const fetchFurnitureImages = useCallback(async (path) => {
    try {
      const data = await getAllImageDownloadUrl(path);
      setFurnitureImgUrls(data);
    } catch (error) {
      console.error("Error fetching furniture:", error);
      setError("Failed to load furniture data");
    }
  });

  const fetchFurniture = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchFurnitureById("furnitures", id);

      setFurniture(data);
      fetchModel(data.modelUrl);
      fetchFurnitureImages(data.imagesUrl);
    } catch (error) {
      console.error("Error fetching furniture:", error);
    } finally {
      setLoading(false);
    }
  }, [id, fetchModel]);

  useEffect(() => {
    fetchFurniture();
  }, []);

  if (loading) {
    return (
      <div role="status" className="flex items-center justify-center h-4/6">
        <svg
          aria-hidden="true"
          class="w-14 h-w-14 text-gray-200 animate-spin fill-arfagreen"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    );
  }

  if (!furniture) {
    return <div>No furniture found</div>;
  }

  return (
    <section>
      <section className="box-border pt-5 antialiased lg:pl-8 md:pl-4 lg:border-l dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 mx-auto lg:pb-24 min-h-fit 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-4 xl:gap-6">
            <div className="flex flex-col w-full lg:gap-4 shrink-0">
              <div className="h-56 md:h-64 2xl:h-90">
                <Carousel>
                  {furnitureImgUrls.map((image) => {
                    return <img src={image} alt="..." />;
                  })}
                </Carousel>
              </div>
              <div className="h-56 rounded-none md:rounded-lg md:h-64 2xl:h-90 bg-arfagray">
                {modelURL ? <ShowModel path={modelURL} /> : null}
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
                {furniture.name}
              </h1>
              <p className="mt-2 text-sm ">
                by{" "}
                <span className="underline">
                  {furniture.shopData?.name || "No shop assigned"}
                </span>
              </p>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="flex gap-2 text-2xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                  <span>{formatToPeso(furniture.discountedPrice) || 0}</span>
                  {furniture.price !== furniture.discountedPrice ? (
                    <span className="text-sm font-normal text-arfablack">
                      <del> {formatToPeso(furniture.price)}</del>
                    </span>
                  ) : null}
                </p>

                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <div className="flex items-center">
                    <DisplayStars number={Math.round(aveReview)} size={5} />
                  </div>
                  <span
                    href="#"
                    className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
                  >
                    {Object.keys(furniture.reviewsData).length} reviews
                  </span>
                </div>
              </div>

              <div className="mt-6 sm:gap-4 sm:items-center sm:flex">
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

              <p className="mt-6 text-sm leading-relaxed text-arfablack">
                {furniture.description}
              </p>
            </div>
          </div>
        </div>
        <hr />
        <section className="">
          <CustomerReview
            reviews={furniture.reviewsData}
            showAverageOfReview={showAverageOfReview}
          />
        </section>
      </section>
    </section>
  );
};

export default ViewFurniture;
