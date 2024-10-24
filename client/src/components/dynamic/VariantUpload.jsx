import React, { useEffect, useState } from "react";
import FileDropzone from "./FileDropzone";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useStore } from "../../stores/useStore";
import { deletePhoto } from "../../firebase/photos";

const VariantUpload = ({ currentVariants, model = "", variantlessImgs }) => {
  // Access Zustand store state and actions
  const { variants, setVariants, initializeVariants } = useStore();

  useEffect(() => {
    if (variantlessImgs.length > 0) {
      const value = variantlessImgs.map((img, index) => ({
        name: "",
        imagePaths: [img],
      }));

      initializeVariants(value);
    } else {
      initializeVariants(currentVariants);
    }
  }, [currentVariants, initializeVariants, variantlessImgs]);

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        name: "",
        imagePaths: [],
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
                  className={`w-5 h-5 text-gray-600 cursor-pointer ${
                    variants.length <= 2 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => deleteVariant(i)}
                />
              )}

              <div className="flex gap-2 mx-auto my-3 overflow-x-auto w-arfaWidth1 sm:w-arfaWidth2 md:w-arfaWidth3">
                {variant.imagePaths?.map((url, imgIndex) => {
                  return (
                    <div key={imgIndex} className="relative flex-shrink-0 mr-3">
                      <XMarkIcon
                        className="absolute top-0 w-5 h-5 text-gray-600 cursor-pointer -right-2"
                        onClick={async () => {
                          await deletePhoto(url);
                          deleteImage(i, imgIndex);
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
            <div className="flex flex-col flex-1">
              <span className="text-sm font-medium">Variant Name:</span>
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
