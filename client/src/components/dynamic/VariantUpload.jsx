import React, { useEffect, useState } from "react";
import FileDropzone from "./FileDropzone";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useStore } from "../../stores/useStore";

const VariantUpload = ({ currentVariants }) => {
  // Access Zustand store state and actions
  const { variants, setVariants, initializeVariants } = useStore();

  useEffect(() => {
    initializeVariants(currentVariants);
  }, [currentVariants, initializeVariants]);

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
          <div className="flex items-center gap-6" key={i}>
            <TrashIcon
              className={`w-5 h-5 text-gray-600 cursor-pointer ${
                variants.length <= 2 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => deleteVariant(i)}
            />
            <section className="my-5">
              <div
                className="flex gap-2 my-3 overflow-x-auto"
                style={{ width: "43rem" }}
              >
                {variant.imagePaths.map((url, imgIndex) => {
                  return (
                    <div key={imgIndex} className="relative flex-shrink-0 mr-3">
                      <XMarkIcon
                        className="absolute top-0 w-5 h-5 text-gray-600 cursor-pointer -right-2"
                        onClick={() => deleteImage(i, imgIndex)}
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

      <div
        className="flex items-center justify-center gap-2 py-4 mt-6 border rounded-sm cursor-pointer bg-arfagray"
        onClick={addVariant}
      >
        <span className="text-sm font-medium"> Add Variant</span>
        <PlusIcon className="w-5 h-5" />
      </div>
    </section>
  );
};

export default VariantUpload;
