import { getDownloadURL, ref } from "firebase/storage";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllImageDownloadUrl } from "../../../firebase/photos";
import { fetchFurnitureById } from "../../../firebase/furniture";
import { storage } from "../../../firebase/firebase";
import ReviewsTable from "../../../components/tables/ReviewsTable";
import Show3D from "../../../components/dynamic/Show3D";
import ShowModel from "../../../components/ShowModel";
import {
  ArrowLeftIcon,
  FolderIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";

const ProductReviews = () => {
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
            onClick={() => navigate("/seller-page/product-reviews")}
          />
        </div>
        <div className="flex items-center gap-2">
          <h6 className="cursor-pointer hover:text-arfagreen">Order</h6>
          <h6 className="cursor-pointer">/</h6>
          <h6 className="cursor-pointer hover:text-arfagreen">Details</h6>
        </div>
      </nav>
      <header className="flex flex-col gap-1">
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
        <h3 className="text-sm font-medium">
          Category:{" "}
          <span className="font-normal text-gray-600">
            {furniture.category}
          </span>
        </h3>
      </header>
      {/* <main className="w-2/5 border mb-28 h-96">
        <ShowModel path={modelURL} />
      </main> */}
      <main className="mt-5">
        <ReviewsTable reviews={reviews} />
      </main>
    </section>
  );
};

export default ProductReviews;
