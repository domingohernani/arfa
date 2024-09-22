import { getDownloadURL, ref } from "firebase/storage";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllImageDownloadUrl } from "../../../firebase/photos";
import { fetchFurnitureById } from "../../../firebase/furniture";
import { storage } from "../../../firebase/firebase";
import ShowModel from "../../../components/ShowModel";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { CubeTransparentIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { Carousel } from "flowbite-react";
import { formatToPeso } from "../../../components/globalFunctions";
import UpdateProductDetails from "../../../components/dynamic/UpdateProductDetails";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [furniture, setFurniture] = useState(null);
  const [modelURL, setModelURL] = useState(null);
  const [furnitureImgUrls, setFurnitureImgUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);

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

  const handleIsUpdateBtn = (value) => {
    setIsUpdate(value);
  };

  const handleConfirmBtn = (value) => {
    alert("Hello");
  };

  if (loading) return <div>Loadingg..</div>;

  return (
    <section className="m-5">
      {!isUpdate ? (
        <>
          <nav className="flex items-center justify-between mb-5">
            <section className="flex items-center gap-2">
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
                  Listing
                </h6>
                <h6 className="cursor-pointer">/</h6>
                <h6 className="cursor-pointer hover:text-arfagreen">
                  Furniture
                </h6>
              </div>
            </section>
            <section className="flex items-center gap-2">
              <button
                className="px-3 py-1 text-sm font-normal border border-gray-300 rounded-sm bg-arfagray text-arfablack btn-update"
                onClick={() => handleIsUpdateBtn(true)}
              >
                <span className="text-sm">Update Furniture</span>
              </button>
            </section>
          </nav>
          <header className="flex flex-col gap-1 md:flex-row md:gap-3">
            <section className="flex flex-col gap-1 basis-3/5">
              <h3 className="text-sm font-medium">
                Product ID:{" "}
                <span className="font-normal text-gray-600">
                  {furniture.id}
                </span>
              </h3>
              <h3 className="text-sm font-medium">
                Name:{" "}
                <span className="font-normal text-gray-600">
                  {furniture.name}
                </span>
              </h3>
              <h3 className="text-sm font-medium">
                Description:{" "}
                <span className="font-normal text-gray-600">
                  {furniture.description}
                </span>
              </h3>
            </section>

            <section className="flex flex-col flex-1 gap-1">
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
                    ? furniture.variants
                        .map((variant) => variant.name)
                        .join(", ")
                    : "No variant"}
                </span>
              </h3>
            </section>
          </header>
        </>
      ) : (
        <UpdateProductDetails
          furniture={furniture}
          handleConfirmBtn={handleConfirmBtn}
          handleIsUpdateBtn={handleIsUpdateBtn}
        />
      )}

      <section className="justify-between hidden mt-5 mb-1 md:flex">
        <h3 className="flex flex-1 gap-2 text-sm font-medium item-center">
          <span>3d Model</span> <CubeTransparentIcon className="w-4 h-4" />
        </h3>
        <h3 className="flex flex-1 gap-2 pl-4 text-sm font-medium item-center">
          <span>Images</span> <PhotoIcon className="w-4 h-4" />
        </h3>
      </section>
      <main
        className="flex flex-col w-full mt-5 mb-5 md:mt-0 gap-14 md:gap-5 md:flex-row"
        style={{ height: "27rem" }}
      >
        <div className="relative w-full h-full border rounded-sm">
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
