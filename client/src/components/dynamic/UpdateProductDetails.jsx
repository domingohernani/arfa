import React, { useEffect, useState } from "react";
import { formatToPeso, getModelDimensions } from "../globalFunctions";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import FileDropzone from "./FileDropzone";
import { Switch } from "@headlessui/react";
import { Tooltip } from "flowbite-react";
import VariantUpload from "./VariantUpload";
import ShowModel from "../ShowModel";
import { useStore } from "../../stores/useStore";
import toast from "react-hot-toast";
import { deletePhoto, getAllImageDownloadUrl } from "../../firebase/photos";

const UpdateProductDetails = ({
  furniture,
  modelURL,
  handleConfirmBtn,
  handleIsUpdateBtn,
}) => {
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(
    furniture.variants.some(
      (variant) => variant.name !== "" || variant.imagePaths.length > 0
    )
  );
  const [model, setModel] = useState(modelURL);
  const [currentVariants, setCurrentVariants] = useState([]);
  const { variants, clearVariants } = useStore();
  const { detectedVariants } = useStore();
  const [edited, setEdited] = useState(false);
  const [images, setImages] = useState([]);
  const [dimensions, setDimensions] = useState({
    width: furniture.width,
    depth: furniture.depth,
    height: furniture.height,
  });

  // Initialize state with furniture details, including id
  const [productDetails, setProductDetails] = useState({
    id: furniture.id || "",
    name: furniture.name || "",
    description: furniture.description || "",
    category: furniture.category || "Accent",
    price: furniture.price || 0,
    discountedPrice: furniture.discountedPrice || 0,
    isSale: furniture.isSale ? true : false,
    height: furniture.height || 0,
    width: furniture.width || 0,
    depth: furniture.depth || 0,
    modelUrl: furniture.modelUrl || "",
    imagesUrl: furniture.imagesUrl || "",
    imgPreviewFilename: furniture.imgPreviewFilename || "",
    varantyInYears: furniture.varantyInYears || 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === "price" ? parseFloat(value) || "" : value,
    }));
  };

  const handleImagesUpload = (files) => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...urls]);
  };

  const handleModelUpload = async (files) => {
    const file = files[0];
    const result = await getModelDimensions(file);

    if (result.success) {
      setDimensions(result.dimensions);
      setModel(result.url);
      setEdited(true);
      setCurrentVariants(detectedVariants);
    } else {
      toast.error(result.message);
    }
  };

  useEffect(() => {
    const fetchVariantlessImages = async () => {
      try {
        const urls = await getAllImageDownloadUrl(furniture.imagesUrl);
        setImages(urls);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVariantlessImages();
  }, [enabled]);

  useEffect(() => {
    const fetchVariants = () => {
      if (
        furniture.variants.some(
          (variant) => variant.name !== "" || variant.imagePaths.length > 0
        ) ||
        detectedVariants.length >= 2
      ) {
        setEnabled(true);
        const formatted = detectedVariants.reduce((acc, value) => {
          acc.push({
            name: value.label,
            imagePaths: [],
          });
          return acc;
        }, []);
        setCurrentVariants(formatted);
      } else {
        setEnabled(false);
      }
    };
    if (detectedVariants) {
      fetchVariants();
    }
  }, [detectedVariants]);

  const confirmBtn = () => {
    if (
      dimensions.width === 0 ||
      dimensions.depth === 0 ||
      dimensions.height === 0
    ) {
      toast.error(
        "Dimensions cannot have a value of 0. Please provide valid measurements."
      );
      return;
    }

    if (
      productDetails.isSale &&
      productDetails.discountedPrice >= productDetails.price
    ) {
      toast.error("Discounted price must be lower than the regular price.");
      return;
    }

    if (handleConfirmBtn) {
      productDetails.discountedPrice = parseInt(productDetails.discountedPrice);

      for (const [key, value] of Object.entries(productDetails)) {
        if (
          (!value || value === 0) &&
          key !== "discountedPrice" &&
          key !== "isSale" &&
          key !== "stock" &&
          key !== "modelUrl" &&
          key !== "imgPreviewFilename"
        ) {
          toast.error(`Invalid input! Please fill all required field.`);
          return;
        }
      }

      // Images validation for variantless furniture
      if (images.length <= 1 && !enabled) {
        console.log(variants);
        toast.error(`Please upload at least 2 images to proceed`);
        return;
      }

      // Images validation for furniture with variant
      if (variants.length >= 2 && enabled) {
        for (let i = 0; i < variants.length; i++) {
          const variant = variants[i];

          if (!variant.name || variant.name.trim() === "") {
            toast.error(`Variant ${i + 1}: Name is required.`);
            return;
          }

          if (!variant.imagePaths || variant.imagePaths.length < 2) {
            toast.error(
              `Variant ${variant.name}: At least 2 images are required.`
            );
            return;
          }
        }
      }

      // Para ma-set yung variant to empty if switch is off
      // Converting firebase images to blob and to re-upload again
      // add reseting the stock to 0 since we are managing yung stock doon sa
      // variants array if variants exist
      let variantToBePass = [];
      if (enabled) {
        productDetails.stock = 0;
        variantToBePass = variants;
      } else {
        variantToBePass = [
          { name: "", imagePaths: [] },
          { name: "", imagePaths: [] },
        ];
      }

      handleConfirmBtn(
        productDetails,
        variantToBePass,
        model,
        dimensions,
        images
      );
      clearVariants();
    }
  };

  const cancelBtn = () => {
    if (handleIsUpdateBtn) {
      handleIsUpdateBtn(false);
    }
  };

  return (
    <>
      <section>
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
              <h6 className="cursor-pointer hover:text-arfagreen">Furniture</h6>
            </div>
          </section>
          <section className="flex items-center gap-2">
            <button
              className="px-3 py-1 text-sm font-normal border border-gray-300 rounded-sm bg-arfagray text-arfablack btn-update"
              onClick={confirmBtn}
            >
              <span className="text-sm">Confirm</span>
            </button>

            <button
              className="px-3 py-1 text-sm font-normal border border-gray-300 rounded-sm bg-arfagray text-arfablack btn-update"
              onClick={cancelBtn}
            >
              <span className="text-sm">Cancel</span>
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
                <input
                  type="text"
                  name="name"
                  value={productDetails.name}
                  onChange={handleInputChange}
                  className="rounded-sm bg-gray-50 border border-gray-300 text-gray-900 focus:ring-arfagreen focus:border-arfagreen block flex-1 min-w-0 w-full text-sm p-2.5"
                />
              </h3>
              <h3 className="text-sm font-medium">
                Description:{" "}
                <textarea
                  name="description"
                  value={productDetails.description}
                  onChange={handleInputChange}
                  className="rounded-sm bg-gray-50 border border-gray-300 text-gray-900 focus:ring-arfagreen focus:border-arfagreen block flex-1 min-w-0 w-full text-sm p-2.5"
                  rows={`${productDetails.isSale ? "12" : "10"}`}
                />
              </h3>
            </section>

            <section className="flex flex-col flex-1 gap-1">
              <h3 className="text-sm font-medium">
                Category:{" "}
                <select
                  name="category"
                  value={productDetails.category}
                  onChange={handleInputChange}
                  className="rounded-sm bg-gray-50 border border-gray-300 text-gray-900 focus:ring-arfagreen focus:border-arfagreen block flex-1 min-w-0 w-full text-sm p-2.5"
                >
                  <option value="Living Room">Living Room</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Dining Room">Dining Room</option>
                  <option value="Office">Office</option>
                  <option value="Outdoor">Outdoor</option>
                  <option value="Accent">Accent</option>
                  <option value="Storage">Storage</option>
                  <option value="Entryway">Entryway</option>
                </select>
              </h3>
              <div className="my-1">
                <h3 className="text-sm font-medium">Sale Status:</h3>
                <div className="flex gap-4">
                  <label className="text-sm font-medium">
                    <input
                      type="radio"
                      name="isSale"
                      value="false"
                      checked={productDetails.isSale === false}
                      onChange={(e) => {
                        const { name, value } = e.target;
                        setProductDetails((prevDetails) => ({
                          ...prevDetails,
                          [name]: value === "true",
                          discountedPrice: 0,
                        }));
                      }}
                      className="mr-1 font-normal text-arfagreen focus:ring-arfagreen checked:bg-arfagreen"
                    />
                    Not on Sale
                  </label>
                  <label className="text-sm font-medium">
                    <input
                      type="radio"
                      name="isSale"
                      value="true"
                      checked={productDetails.isSale === true}
                      onChange={(e) => {
                        const { name, value } = e.target;
                        setProductDetails((prevDetails) => ({
                          ...prevDetails,
                          [name]: value === "true", // Convert the string value to boolean
                        }));
                      }}
                      className="mr-1 font-normal text-arfagreen focus:ring-arfagreen checked:bg-arfagreen"
                    />
                    On Sale
                  </label>
                </div>
              </div>
              {productDetails.isSale && (
                <h3 className="text-sm font-medium">
                  Discounted Price:{" "}
                  <input
                    type="text"
                    name="discountedPrice"
                    value={productDetails.discountedPrice}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      if (name === "discountedPrice") {
                        const validNumberRegex = /^\d*$/;
                        if (validNumberRegex.test(value)) {
                          handleInputChange(e);
                        }
                      }
                    }}
                    className="rounded-sm bg-gray-50 border border-gray-300 text-gray-900 focus:ring-arfagreen focus:border-arfagreen block flex-1 min-w-0 w-full text-sm p-2.5"
                  />
                </h3>
              )}
              <h3 className="text-sm font-medium">
                Price (₱):{" "}
                <input
                  type="text"
                  name="price"
                  value={productDetails.price}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    if (name === "price") {
                      const validNumberRegex = /^\d*$/;
                      if (validNumberRegex.test(value)) {
                        handleInputChange(e);
                      }
                    }
                  }}
                  className="rounded-sm bg-gray-50 border border-gray-300 text-gray-900 focus:ring-arfagreen focus:border-arfagreen block flex-1 min-w-0 w-full text-sm p-2.5"
                />
              </h3>
              <h3 className="text-sm font-medium">
                Warranty (years):{" "}
                <input
                  type="text"
                  name="varantyInYears"
                  value={productDetails.varantyInYears}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    if (name === "varantyInYears") {
                      const validNumberRegex = /^\d*$/;
                      if (validNumberRegex.test(value)) {
                        handleInputChange(e);
                      }
                    }
                  }}
                  className="rounded-sm bg-gray-50 border border-gray-300 text-gray-900 focus:ring-arfagreen focus:border-arfagreen block flex-1 min-w-0 w-full text-sm p-2.5"
                />
              </h3>
              <div className="flex gap-4 mt-2">
                <h3 className="text-sm font-medium">
                  Width: (cm){" "}
                  <input
                    type="text"
                    name="width"
                    disabled={model ? true : false}
                    value={model ? dimensions.width : productDetails.width}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      if (name === "width") {
                        const numbers = "0123456789";
                        if (
                          value
                            .split("")
                            .every((char) => numbers.includes(char))
                        ) {
                          setDimensions((prevDimension) => ({
                            ...prevDimension,
                            width: parseInt(value),
                          }));
                          handleInputChange(e);
                        }
                      }
                    }}
                    className={`rounded-sm ${
                      model ? "bg-gray-200 cursor-not-allowed" : "bg-gray-50"
                    } border border-gray-300 text-gray-900 focus:ring-arfagreen focus:border-arfagreen block flex-1 min-w-0 w-full text-sm p-2.5`}
                  />
                </h3>
                <h3 className="text-sm font-medium">
                  Depth: (cm){" "}
                  <input
                    type="text"
                    name="depth"
                    disabled={model ? true : false}
                    value={model ? dimensions.depth : productDetails.depth}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      if (name === "depth") {
                        const numbers = "0123456789";
                        if (
                          value
                            .split("")
                            .every((char) => numbers.includes(char))
                        ) {
                          setDimensions((prevDimension) => ({
                            ...prevDimension,
                            depth: parseInt(value),
                          }));
                          handleInputChange(e);
                        }
                      }
                    }}
                    className={`rounded-sm ${
                      model ? "bg-gray-200 cursor-not-allowed" : "bg-gray-50"
                    } border border-gray-300 text-gray-900 focus:ring-arfagreen focus:border-arfagreen block flex-1 min-w-0 w-full text-sm p-2.5`}
                  />
                </h3>
                <h3 className="text-sm font-medium">
                  Height: (cm){" "}
                  <input
                    type="text"
                    name="height"
                    disabled={model ? true : false}
                    value={model ? dimensions.height : productDetails.height}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      if (name === "height") {
                        const numbers = "0123456789";
                        if (
                          value
                            .split("")
                            .every((char) => numbers.includes(char))
                        ) {
                          setDimensions((prevDimension) => ({
                            ...prevDimension,
                            height: parseInt(value),
                          }));
                          handleInputChange(e);
                        }
                      }
                    }}
                    className={`rounded-sm ${
                      model ? "bg-gray-200 cursor-not-allowed" : "bg-gray-50"
                    } border border-gray-300 text-gray-900 focus:ring-arfagreen focus:border-arfagreen block flex-1 min-w-0 w-full text-sm p-2.5`}
                  />
                </h3>
              </div>
            </section>
          </header>
        </section>
      </section>

      <section className="relative mt-5 border pb-14">
        <header className="px-3 py-4 text-sm font-medium border-b mb-14 bg-arfagray">
          Visual Overview
        </header>
        <main className="flex flex-col w-full px-3 mb-3 gap-14 md:gap-5 md:flex-row">
          <div className="flex-1 w-full h-full px-3">
            <div className="absolute text-sm font-medium top-20">
              <span>3D Model</span>
            </div>
            {model ? (
              <div className="relative mb-16 h-96">
                <XMarkIcon
                  className="w-5 h-5 ml-auto cursor-pointer "
                  onClick={() => {
                    setModel("");
                    setCurrentVariants([]);
                    setEnabled(false);
                  }}
                />
                <ShowModel path={model} />
              </div>
            ) : (
              <FileDropzone
                text={
                  "Drag & drop some 3D models here (.glb, .gltf), or click to select files"
                }
                height={"h-96"}
                onFilesSelected={(file) => handleModelUpload(file)}
              />
            )}
          </div>
          <div className="flex flex-col justify-center flex-1 gap-3 px-3">
            <h3 className="text-sm font-medium">
              When uploading a 3D model, please ensure that all necessary
              variants are included within the model file. This will ensure that
              customers can view all available options for your furniture piece.
            </h3>
            <li className="text-sm text-gray-600">
              If you are unsure how to include variants in your 3D model, please
              contact our support team or consult with your 3D modeling artist.
            </li>
            <li className="text-sm text-gray-600">
              Please note that both the available variants and dimensions are
              dependent on the selected 3D model. Ensure you've chosen the
              correct model to access the relevant options.
            </li>
            <li className="text-sm text-gray-600">
              These rules will automatically apply if you are uploading a 3D
              model. However, if you don't have a 3D model, you'll need to
              manually enter the variants and dimensions for your furniture
              piece.
            </li>
            <span className="text-sm italic text-gray-600">
              Need help? Contact us at{" "}
              <a href="mailto:arfa@gmail.com" className="text-arfagreen">
                arfa@gmail.com
              </a>
            </span>
          </div>
        </main>
        <div className="flex justify-between px-6 mb-2 text-sm font-medium item-center">
          <span>Images</span>
          {currentVariants.length >= 2 || !model
            ? !model && (
                <div className="flex items-center gap-2">
                  <span>Variants</span>
                  <Switch
                    checked={enabled}
                    onChange={() => {
                      setEnabled(!enabled);
                      setImages([]);
                    }}
                    className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-arfagreen"
                  >
                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                  </Switch>
                  <Tooltip
                    content="Turn this switch on if the product has variants"
                    className="w-max"
                  >
                    <QuestionMarkCircleIcon
                      className="w-5 h-5 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Tooltip>
                </div>
              )
            : null}
        </div>
        {!enabled ? (
          <main className="relative flex flex-col w-full px-3 gap-14 md:gap-5 md:flex-row">
            <div className="flex-1 w-full h-full px-3">
              {images.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  {images.map((url, index) => {
                    return (
                      <div key={index}>
                        <XMarkIcon
                          className={`w-5 h-5 ml-auto ${
                            images.length >= 3
                              ? "text-black cursor-pointer"
                              : "text-gray-400 cursor-not-allowed "
                          }`}
                          onClick={async () => {
                            // attempt to delete the image if present in the storage
                            if (images.length >= 3) {
                              if (!url.startsWith("blob")) {
                                await deletePhoto(url);
                              }
                              setImages((prev) => {
                                const imgs = [...prev];
                                imgs.splice(index, 1);
                                return imgs;
                              });
                            }
                          }}
                        />
                        <img
                          src={url}
                          alt={`Image ${index}`}
                          className="object-cover w-40 h-40 rounded-sm"
                        />
                      </div>
                    );
                  })}
                  <FileDropzone
                    text={
                      "Drag & drop some images here (.jpg, .jpeg, .png), or click to select files"
                    }
                    height={"h-20"}
                    onFilesSelected={(files) => handleImagesUpload(files)}
                  />
                </div>
              ) : (
                <FileDropzone
                  text={
                    "Drag & drop some images here (.jpg, .jpeg, .png), or click to select files"
                  }
                  height={"h-96"}
                  onFilesSelected={(files) => handleImagesUpload(files)}
                />
              )}
            </div>
            <div className="flex flex-col justify-center flex-1 gap-3 px-3">
              <h3 className="text-sm font-medium">
                When uploading images, please ensure that you provide clear and
                high-quality photos of your furniture piece. This will help
                customers get a better understanding of your product.
              </h3>

              <li className="text-sm text-gray-600">
                Recommended: Provide multiple images, including a clear front
                view, side view, back view, and close-up shots of any important
                details or features.
              </li>
              <li className="text-sm text-gray-600">
                Please upload at least 2 images of the product.
              </li>
            </div>
          </main>
        ) : !edited ? (
          <VariantUpload
            currentVariants={furniture.variants || currentVariants}
            model={model}
            variantlessImgs={images}
          />
        ) : (
          <VariantUpload
            currentVariants={currentVariants}
            model={model}
            variantlessImgs={images}
          />
        )}
      </section>
    </>
  );
};

export default UpdateProductDetails;
