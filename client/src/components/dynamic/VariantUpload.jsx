import React, { useState } from "react";
import FileDropzone from "./FileDropzone";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/24/outline";

const VariantUpload = ({ currentVariants }) => {
  const [variants, setVariants] = useState(() => {
    if (currentVariants.length === 0) {
      return [
        { name: "", imagePaths: [] },
        { name: "", imagePaths: [] },
      ];
    }
    return currentVariants;
  });
  
  const addVariant = () => {
    setVariants([
      ...variants,
      {
        name: "",
        imagePaths: [],
      },
    ]);
  };

  return (
    <section className="px-6">
      {variants.map((variant, i) => {
        return (
          <div className="flex items-center gap-6">
            <TrashIcon className="w-5 h-5 text-gray-600 cursor-pointer" />
            <section className="my-5" style={{ width: "45rem" }}>
              <div className="overflow-x-auto">
                <div className="flex items-center gap-2">
                  {variant.imagePaths.map((url) => {
                    return (
                      <>
                        <div>
                          <XMarkIcon className="w-5 h-5 text-gray-600 cursor-pointer" />
                          <img src={url} className="w-auto h-40" />
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <FileDropzone
                text={
                  "Drag & drop some images of the variant here (.jpg, .jpeg, .png), or click to select files"
                }
                height={"h-20"}
              />
            </section>
            <div className="flex flex-col flex-1">
              <span className="text-sm font-medium">Variant Name:</span>
              <input
                type="text"
                name="name"
                value={variant.name}
                className="rounded-sm h-fit bg-gray-50 border border-gray-300 text-gray-900 focus:ring-arfagreen focus:border-arfagreen block flex-1 min-w-0 w-full text-sm p-2.5"
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
