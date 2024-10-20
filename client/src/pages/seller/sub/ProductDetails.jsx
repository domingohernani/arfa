import { getDownloadURL, ref } from "firebase/storage";
import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getAllImageDownloadUrl, uploadPhoto } from "../../../firebase/photos";
import {
  fetchFurnitureById,
  updateFurniture,
} from "../../../firebase/furniture";
import { storage } from "../../../firebase/firebase";
import ShowModel from "../../../components/ShowModel";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { CubeTransparentIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { Carousel } from "flowbite-react";
import {
  blobTo3DFile,
  convertBlobUrlToFile,
  formatToPeso,
} from "../../../components/globalFunctions";
import UpdateProductDetails from "../../../components/dynamic/UpdateProductDetails";
import toast from "react-hot-toast";
import { delete3DModel, upload3DModel } from "../../../firebase/models";
import { v4 as uuidv4 } from "uuid";

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

  const fetchFurniture = async () => {
    setLoading(true);
    try {
      const data = await fetchFurnitureById("furnitures", id);
      setFurniture(data);
      if (data.modelUrl) {
        fetchModel(data.modelUrl);
      }
      fetchFurnitureImages(data.imagesUrl);
    } catch (error) {
      console.error("Error fetching furniture:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFurniture();
  }, [id]);

  const handleIsUpdateBtn = (value) => {
    setIsUpdate(value);
  };

  const updateModel = async (model, name) => {
    try {
      const newModel = await blobTo3DFile(model, name);
      if (newModel) {
        const fileName = `${newModel.name}-${uuidv4()}.glb`;
        await upload3DModel(newModel, `models/${fileName}`);
        return `models/${fileName}`;
      } else {
        toast.error("Something went wrong");
        return null;
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error updating model:", error);
      return null;
    }
  };

  const handleConfirmBtn = async (value, variants, model, dimensions) => {
    let newModel = "";

    // If model already exist, delete muna

    const newVariants = await Promise.all(
      variants.map(async (variant) => {
        const updatedImagePaths = await Promise.all(
          variant.imagePaths.map(async (url, index) => {
            if (url.includes("blob")) {
              const file = await convertBlobUrlToFile(
                url,
                `${variant.name}-${index}`
              );
              const fileName = `${furniture.id}-${Date.now()}.jpg`;
              const path = `images/${furniture.id}/${fileName}`;
              // Now call uploadPhoto with the updated path
              const newUrl = await uploadPhoto(file, path);
              return newUrl;
            }
            return url;
          })
        );

        return {
          ...variant,
          imagePaths: updatedImagePaths, // Assign the resolved array
        };
      })
    );

    if (
      model != null &&
      !model.includes("https://firebasestorage.googleapis.com")
    ) {
      if (value.modelUrl) {
        await delete3DModel(value.modelUrl);
      }

      if (model) {
        newModel = await updateModel(model, value.name);
      }

      if (!model) {
        await delete3DModel(value.modelUrl);
        newModel = "";
      }
      value.modelUrl = newModel;
    }
    value.variants = newVariants;

    value.height = dimensions.height;
    value.width = dimensions.width;
    value.depth = dimensions.depth;

    const result = await updateFurniture(id, value);

    if (result.isSuccess) {
      fetchFurniture();
      toast.success(result.message || "Furniture updated successfully!");
    } else {
      toast.error(result.message || "Failed to update furniture.");
    }
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
          <section className="border">
            <header className="px-3 py-4 text-sm font-medium border-b bg-arfagray">
              Product Details
            </header>
            <header className="flex flex-col gap-1 px-3 py-5 md:flex-row md:gap-3">
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
                {furniture.isSale && (
                  <h3 className="text-sm font-medium">
                    Discounted Price:{" "}
                    <span className="font-normal text-gray-600">
                      {formatToPeso(furniture.discountedPrice)}
                    </span>
                  </h3>
                )}
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
                {!furniture.variants.every(
                  (variant) =>
                    variant.name === "" && variant.imagePaths.length === 0
                ) && (
                  <h3 className="text-sm font-medium">
                    Variant:{" "}
                    <span className="font-normal text-gray-600">
                      {furniture.variants
                        .map((variant) => variant.name)
                        .join(", ")}
                    </span>
                  </h3>
                )}
                <h3 className="text-sm font-medium">
                  Dimension:{" "}
                  <span className="text-sm font-normal leading-relaxed text-gray-600">
                    {furniture.width} cm /{" "}
                  </span>
                  <span className="text-sm font-normal leading-relaxed text-gray-600">
                    {furniture.depth} cm /{" "}
                  </span>
                  <span className="text-sm font-normal leading-relaxed text-gray-600">
                    {furniture.height} cm
                  </span>
                </h3>
              </section>
            </header>
          </section>
          <section className="mt-5 border pb-14">
            <header className="px-3 py-4 text-sm font-medium border-b mb-14 bg-arfagray">
              Visual Overview
            </header>
            <main
              className="flex flex-col w-full px-5 mt-5 md:mt-0 gap-14 md:gap-5 md:flex-row"
              style={{ height: "32rem" }}
            >
              {furniture.modelUrl && (
                <div className="relative w-full h-full px-3 border-r">
                  <ShowModel path={modelURL} />
                </div>
              )}
              <Carousel className="">
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
        </>
      ) : (
        <UpdateProductDetails
          furniture={furniture}
          modelURL={modelURL}
          handleConfirmBtn={handleConfirmBtn}
          handleIsUpdateBtn={handleIsUpdateBtn}
        />
      )}
    </section>
  );
};

export default ProductDetails;
