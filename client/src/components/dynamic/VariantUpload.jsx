import React, { useEffect, useState } from "react";
import FileDropzone from "./FileDropzone";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useStore } from "../../stores/useStore";
import { deletePhoto } from "../../firebase/photos";

const VariantUpload = ({ currentVariants, model = "", variantlessImgs }) => {
  const { variants, setVariants, initializeVariants } = useStore();

  useEffect(() => {
    if (
      currentVariants.some(
        (variant) => variant.name !== "" || variant.imagePaths.length > 0
      )
    ) {
      initializeVariants(currentVariants);
    } else {
      if (variantlessImgs?.length > 0) {
        const value = variantlessImgs.map((img, index) => ({
          name: "",
          imagePaths: [img],
          stock: 0,
        }));
        initializeVariants(value);
      }
    }
  }, [currentVariants, initializeVariants, variantlessImgs]);

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        name: "",
        imagePaths: [],
        stock: 0,
      },
    ]);
  };

  const deleteVariant = (index) => {
    if (variants.length > 2) {
      const updatedVariants = [...variants];
      updatedVariants.splice(index, 1);
      setVariants(updatedVariants);
    }
  };

  const deleteImage = (variantIndex, imageIndex) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].imagePaths.splice(imageIndex, 1);
    setVariants(updatedVariants);
  };

  const handleFileUpload = (files, variantIndex) => {
    const fileUrls = files.map((file) => URL.createObjectURL(file));
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].imagePaths = [
      ...updatedVariants[variantIndex].imagePaths,
      ...fileUrls,
    ];
    setVariants(updatedVariants);
  };

  return (
    <section className="px-6">
      {variants.map((variant, i) => {
        return (
          <div
            className="flex flex-col gap-6 lg:flex-row lg:items-center"
            key={i}
          >
            <section className="my-5">
              {!model && (
                <TrashIcon
                  className={`w-5 h-5 text-gray-600  ${
                    variants.length <= 2
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  onClick={() => deleteVariant(i)}
                />
              )}

              <div className="flex gap-2 mx-auto my-3 overflow-x-auto w-arfaWidth1 sm:w-arfaWidth2 md:w-arfaWidth3">
                {variant.imagePaths?.map((url, imgIndex) => {
                  return (
                    <div key={imgIndex} className="relative flex-shrink-0 mr-3">
                      <XMarkIcon
                        className={`absolute top-0 w-5 h-5 ${
                          variant.imagePaths?.length <= 2
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-600 cursor-pointer"
                        } -right-2`}
                        onClick={async () => {
                          if (variant.imagePaths?.length >= 3) {
                            await deletePhoto(url);
                            deleteImage(i, imgIndex);
                          }
                        }}
                      />
                      <img src={url} className="w-auto h-40" />
                    </div>
                  );
                })}
              </div>
              <FileDropzone
                text={
                  "Drag & drop some images of the variant here (.jpg, .jpeg, .png), or click to select files"
                }
                height={"h-20"}
                onFilesSelected={(files) => handleFileUpload(files, i)}
              />
            </section>
            <section className="flex flex-wrap flex-1 gap-6">
              <div className="flex flex-col flex-1">
                <span className="text-sm font-medium">Name:</span>
                <input
                  type="text"
                  name="name"
                  value={variant.name}
                  className="rounded-sm h-fit bg-gray-50 border border-gray-300 text-gray-900 focus:ring-arfagreen focus:border-arfagreen block flex-1 min-w-0 w-full text-sm p-2.5"
                  onChange={(e) => {
                    const updatedVariants = [...variants];
                    updatedVariants[i].name = e.target.value;
                    setVariants(updatedVariants);
                  }}
                />
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-sm font-medium">Stock:</span>
                <input
                  type="text"
                  name="stock"
                  value={variant.stock || 0}
                  className="rounded-sm h-fit bg-gray-50 border border-gray-300 text-gray-900 focus:ring-arfagreen focus:border-arfagreen block flex-1 min-w-0 w-full text-sm p-2.5"
                  onChange={(e) => {
                    const { name, value } = e.target;
                    if (name === "stock") {
                      if (/^\d*$/.test(value)) {
                        const updatedVariants = [...variants];
                        updatedVariants[i].stock = parseInt(value);
                        setVariants(updatedVariants);
                      }
                    }
                  }}
                  onKeyDown={(e) => {
                    if (
                      !/[0-9]/.test(e.key) &&
                      ![
                        "Backspace",
                        "Delete",
                        "ArrowLeft",
                        "ArrowRight",
                      ].includes(e.key)
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
            </section>
          </div>
        );
      })}

      {!model && (
        <div
          className="flex items-center justify-center gap-2 py-4 mt-6 border rounded-sm cursor-pointer bg-arfagray"
          onClick={addVariant}
        >
          <span className="text-sm font-medium"> Add Variant</span>
          <PlusIcon className="w-5 h-5" />
        </div>
      )}
    </section>
  );
};

export default VariantUpload;
