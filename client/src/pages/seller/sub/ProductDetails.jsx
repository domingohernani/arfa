import { getDownloadURL, ref } from "firebase/storage";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllImageDownloadUrl } from "../../../firebase/photos";
import { fetchFurnitureById } from "../../../firebase/furniture";
import { storage } from "../../../firebase/firebase";
import ShowModel from "../../../components/ShowModel";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { Carousel } from "flowbite-react";
import { formatToPeso } from "../../../components/globalFunctions";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [furniture, setFurniture] = useState(null);
  const [modelURL, setModelURL] = useState(null);
  const [furnitureImgUrls, setFurnitureImgUrls] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchFurniture = async () => {
      setLoading(true);
      try {
        const data = await fetchFurnitureById("furnitures", id);
        setFurniture(data);

        console.log("data", data);

        const reviewsArray = Object.keys(data.reviewsData).map((key) => ({
          ...data.reviewsData[key],
        }));
        setReviews(reviewsArray);

        fetchModel(data.modelUrl);
        fetchFurnitureImages(data.imagesUrl);
      } catch (error) {
        console.error("Error fetching furniture:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFurniture();
  }, [id]);

  if (loading) return <div>Loadingg..</div>;

  return (
    <section className="m-5">
      <nav className="flex items-center gap-2 mb-5">
        <div className="p-1 w-fit">
          <ArrowLeftIcon
            className="w-5 h-5 cursor-pointer"
            onClick={() => navigate("/seller-page/product-info")}
          />
        </div>
        <div className="flex items-center gap-2">
          <h6
            className="cursor-pointer hover:text-arfagreen"
            onClick={() => navigate("/seller-page/product-info")}
          >
            Reviews
          </h6>
          <h6 className="cursor-pointer">/</h6>
          <h6 className="cursor-pointer hover:text-arfagreen">Furniture</h6>
        </div>
      </nav>
      <header className="flex flex-col gap-1 md:flex-row md:gap-3">
        <section className="basis-3/5 flex flex-col gap-1">
          <h3 className="text-sm font-medium">
            Product ID:{" "}
            <span className="font-normal text-gray-600">{furniture.id}</span>
          </h3>
          <h3 className="text-sm font-medium">
            Name:{" "}
            <span className="font-normal text-gray-600">{furniture.name}</span>
          </h3>
          <h3 className="text-sm font-medium">
            Description:{" "}
            <span className="font-normal text-gray-600">
              {furniture.description}
            </span>
          </h3>
        </section>

        <section className="flex-1 flex flex-col gap-1">
          <h3 className="text-sm font-medium">
            Category:{" "}
            <span className="font-normal text-gray-600">
              {furniture.category}
            </span>
          </h3>
          <h3 className="text-sm font-medium">
            Price:{" "}
            <span className="font-normal text-gray-600">
              {formatToPeso(furniture.price)}
            </span>
          </h3>
          <h3 className="text-sm font-medium">
            Status:{" "}
            <span
              className={`font-normal ${
                furniture.isSale ? "text-blue-600" : "text-green-500"
              }`}
            >
              {furniture.isSale ? "On Sale" : "Not On Sale"}
            </span>
          </h3>
          <h3 className="text-sm font-medium">
            Variant:{" "}
            <span className="font-normal text-gray-600">
              {furniture.variant
                ? furniture.variants.map((variant) => variant.name).join(", ")
                : "No variant"}
            </span>
          </h3>
        </section>
      </header>
      {/* <main className="w-full flex-col gap-5 my-5 flex mb-28 h-96"> */}
      <section className="flex mb-1 mt-5 justify-between">
        <h3 className="text-sm font-medium">3d Model</h3>
        <h3 className="text-sm font-medium">Images</h3>
      </section>
      <main
        className="w-full mb-5 flex flex-col gap-14 md:gap-5 md:flex-row"
        style={{ height: "27rem" }}
      >
        <div className="w-full relative h-full border rounded-sm">
          <ShowModel path={modelURL} />
        </div>
        <Carousel className="border rounded-sm">
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
      </main>
    </section>
  );
};

export default ProductDetails;
