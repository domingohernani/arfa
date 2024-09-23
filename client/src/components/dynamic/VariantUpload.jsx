import React, { useState } from "react";
import FileDropzone from "./FileDropzone";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";

const VariantUpload = () => {
  // State to hold variants with two default items
  const [variants, setVariants] = useState([
    { id: Date.now(), name: "", files: [] },
    { id: Date.now() + 1, name: "", files: [] },
  ]);

  // Handler to add a new variant
  const addVariant = () => {
    setVariants([
      ...variants,
      { id: Date.now(), name: "", files: [] }, // Each variant has a unique ID
    ]);
  };

  // Handler to update variant name
  const handleNameChange = (id, name) => {
    setVariants((prevVariants) =>
      prevVariants.map((variant) =>
        variant.id === id ? { ...variant, name } : variant
      )
    );
  };

  // Handler to update files
  const handleFilesChange = (id, files) => {
    setVariants((prevVariants) =>
      prevVariants.map((variant) =>
        variant.id === id ? { ...variant, files } : variant
      )
    );
  };

  // Handler to remove a variant
  const removeVariant = (id) => {
    if (variants.length > 2) {
      setVariants((prevVariants) =>
        prevVariants.filter((variant) => variant.id !== id)
      );
    }
  };

  return (
    <section className="px-6">
      {variants.map((variant, index) => (
        <div key={variant.id} className="flex items-center gap-6 mt-4">
          {variants.length > 2 && (
            <XMarkIcon
              className="w-5 h-5 text-gray-600 cursor-pointer h-"
              onClick={() => removeVariant(variant.id)} // Attach the remove handler
            />
          )}
          <div className="w-20 basis-2/3">
            <FileDropzone
              text={
                "Drag & drop some 3D models here (.glb, .gltf), or click to select files"
              }
              height={"h-36"}
              onDrop={(acceptedFiles) =>
                handleFilesChange(variant.id, acceptedFiles)
              }
            />
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-sm font-medium">Variant Name:</span>
            <input
              type="text"
              name="name"
              value={variant.name}
              onChange={(e) => handleNameChange(variant.id, e.target.value)}
              className="rounded-sm bg-gray-50 border border-gray-300 text-gray-900 focus:ring-arfagreen focus:border-arfagreen block flex-1 min-w-0 w-full text-sm p-2.5"
            />
          </div>
        </div>
      ))}

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
