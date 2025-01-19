import React, { useCallback, useEffect, useState } from "react";
import ShowModel from "./ShowModel";
import { Carousel } from "flowbite-react";
import CustomerReview from "./dynamic/CustomerReview";
import DisplayStars from "./dynamic/DisplayStars";
import { getDownloadURL, ref } from "firebase/storage";
import { auth, storage } from "../firebase/firebase";
import { Link, useParams } from "react-router-dom";
import { fetchFurnitureById } from "../firebase/furniture";
import { formatToPeso } from "../components/globalFunctions";
import { getAllImageDownloadUrl } from "../firebase/photos";
import { useStore } from "../stores/useStore";
import {
  CubeTransparentIcon,
  Bars2Icon,
  ArrowsPointingOutIcon,
  ShareIcon,
} from "@heroicons/react/20/solid";
import Show3D from "./dynamic/Show3D";
import ViewFurnitureSkeleton from "./skeletons/ViewFurnitureSkeleton";
import MaximizeImages from "./dynamic/MaximizeImages";
import {
  ChatBubbleLeftEllipsisIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { addToWishlist } from "../firebase/wishlist";
import toast, { Toaster } from "react-hot-toast";
import AddToCartSelection from "./dynamic/AddToCartSelection";
import { getUserInfo } from "../firebase/user";
import { InformationProduct } from "./modals/InformationProduct";

const ViewFurniture = () => {
  const { id } = useParams();
  const [furniture, setFurniture] = useState(null);
  const [furnitureImgUrls, setFurnitureImgUrls] = useState([]);
  const [modelURL, setModelURL] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customerReview, setCustomerReview] = useState([]);
  const [aveReview, setAveReview] = useState(0);
  const updateIs3dOpen = useStore((state) => state.updateIs3dOpen);
  const updateIsImgsOpen = useStore((state) => state.updateIsImgsOpen);
  const updateIsAddToCartOpen = useStore(
    (state) => state.updateIsAddToCartOpen
  );
  const [informationOpen, setInformationOpen] = useState(false);

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
      setCustomerReview(data.reviewsData);
      if (data.modelUrl) {
        fetchModel(data.modelUrl);
      }
      fetchFurnitureImages(data.imagesUrl);
    } catch (error) {
      console.error("Error fetching furniture:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleShare = (name) => {
    const link = window.location.href;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success(`Link copied! You can share ${name}`);
      })
      .catch(() => {
        toast.error("Failed to copy the link. Please try again.");
      });
  };

  useEffect(() => {
    fetchFurniture();
  }, [id, fetchFurniture]);

  const handleAddWishlistBtn = async () => {
    const userInfo = await getUserInfo();
    try {
      const userId = auth.currentUser?.uid;
      if (!userId || userInfo.role !== "shopper") {
        toast.error("You must be logged in to add items to your wishlist.");
        return;
      }
      const result = await addToWishlist(userId, id);

      if (result.success) {
        if (result.isDuplicate) {
          toast.error("This item is already in your wishlist.");
        } else {
          toast.success("Item successfully added to your wishlist!");
        }
      } else {
        toast.error("Failed to add item to your wishlist.");
      }
    } catch (error) {
      toast.error("An error occurred while adding the item to your wishlist.");
      console.error("Error adding item to wishlist:", error);
    }
  };

  const handleInformationClose = () => {
    setInformationOpen(false);
  };

  if (loading) {
    return <ViewFurnitureSkeleton></ViewFurnitureSkeleton>;
  }

  if (!furniture) {
    return <div>No furniture found</div>;
  }

  return (
    <section>
      <Toaster />
      {informationOpen && (
        <InformationProduct
          isOpen={informationOpen}
          close={handleInformationClose}
        />
      )}
      <section className="box-border pt-5 antialiased lg:pl-8 md:pl-4 dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 mx-auto lg:pb-24 min-h-fit 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-4 xl:gap-6">
            <div className="flex flex-col w-full lg:gap-4 shrink-0">
              <div
                className="relative h-64 carousel sm:h-80 md:h-96 lg:h-full"
                id="carousel"
              >
                <Carousel>
                  {furnitureImgUrls.map((image, index) => {
                    return (
                      <img
                        src={image}
                        alt="..."
                        key={index}
                        className="object-cover w-full h-full"
                      />
                    );
                  })}
                </Carousel>

                <div className="absolute flex gap-2 top-3 right-3">
                  {modelURL && (
                    <div
                      className="flex items-center gap-1 px-2 py-1 bg-white border rounded-md cursor-pointer hover:border-arfablack w-fit"
                      onClick={() => {
                        updateIs3dOpen(true);
                      }}
                    >
                      <CubeTransparentIcon className="w-4 h-4 "></CubeTransparentIcon>
                    </div>
                  )}

                  <div
                    className="flex items-center gap-1 px-2 py-1 bg-white border rounded-md cursor-pointer hover:border-arfablack w-fit"
                    onClick={() => {
                      updateIsImgsOpen(true);
                    }}
                  >
                    <ArrowsPointingOutIcon className="w-4 h-4 "></ArrowsPointingOutIcon>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {furniture.name}
              </h1>
              <p className="mt-2 text-sm ">
                <span className="flex gap-1">
                  <span>by</span>
                  <span className="underline">
                    {furniture.shopData?.name || "No shop assigned"}
                  </span>
                  {furniture.id && furniture.shopData.userId && (
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/profile/inbox/new-chat/${furniture.id}/${furniture.shopData.userId}`}
                      >
                        <ChatBubbleLeftEllipsisIcon className="w-5 h-5 cursor-pointer text-arfablack" />
                      </Link>
                      <section>
                        <ShareIcon
                          className="w-5 h-5 cursor-pointer text-arfablack"
                          onClick={() => {
                            handleShare(furniture.name);
                          }}
                        />
                      </section>
                      <section>
                        <InformationCircleIcon
                          className="w-5 h-5 cursor-pointer text-arfablack"
                          onClick={() => {
                            setInformationOpen(true);
                          }}
                        />
                      </section>
                    </div>
                  )}
                </span>
              </p>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="flex gap-2 text-2xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                  {furniture.isSale && (
                    <span>{formatToPeso(furniture.discountedPrice) || 0}</span>
                  )}
                  {furniture.isSale ? (
                    <span className="text-sm font-normal text-arfablack">
                      <del> {formatToPeso(furniture.price)}</del>
                    </span>
                  ) : (
                    <span>{formatToPeso(furniture.price) || 0}</span>
                  )}
                </p>

                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <div className="flex items-center">
                    <DisplayStars number={Math.round(aveReview)} size={5} />
                  </div>
                  <span
                    href="#"
                    className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
                  >
                    {furniture.reviewsData
                      ? Object.keys(furniture.reviewsData).length
                      : 0}{" "}
                    reviews
                  </span>
                </div>
              </div>

              <div className="mt-6 sm:gap-4 sm:items-center sm:flex">
                <span
                  href="#"
                  title=""
                  className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  role="button"
                  onClick={handleAddWishlistBtn}
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
                </span>

                <span
                  href="#"
                  title=""
                  className="text-white bg-arfagreen mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
                  role="button"
                  onClick={() => updateIsAddToCartOpen(true)}
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
                </span>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-arfablack">
                {furniture.description}
                <div className="flex flex-wrap items-center gap-1 my-2">
                  <span className="text-sm leading-relaxed text-arfablack">
                    Width: {furniture.width} cm /
                  </span>
                  <span className="text-sm leading-relaxed text-arfablack">
                    Depth: {furniture.depth} cm /
                  </span>
                  <span className="text-sm leading-relaxed text-arfablack">
                    Height: {furniture.height} cm
                  </span>
                </div>
                <div>
                  {furniture?.varantyInYears
                    ? `Warranty: ${furniture.varantyInYears} year/s`
                    : ""}
                </div>
              </p>
            </div>
          </div>
        </div>
        <hr />
        <section className="">
          <CustomerReview
            reviews={customerReview}
            showAverageOfReview={showAverageOfReview}
          />
        </section>
        <MaximizeImages furnitureImgUrls={furnitureImgUrls}></MaximizeImages>
        <Show3D path={modelURL} furniture={furniture}></Show3D>
        <AddToCartSelection
          path={modelURL}
          furniture={furniture}
          furnitureImgUrls={furnitureImgUrls}
        ></AddToCartSelection>
      </section>
    </section>
  );
};

export default ViewFurniture;
