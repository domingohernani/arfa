import React, { useState } from "react";
import { formatToPeso } from "../globalFunctions";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

const UpdateProductDetails = ({
  furniture,
  handleConfirmBtn,
  handleIsUpdateBtn,
}) => {
  const navigate = useNavigate();

  // Initialize state with furniture details, including id
  const [productDetails, setProductDetails] = useState({
    id: furniture.id || "",
    name: furniture.name || "",
    description: furniture.description || "",
    category: furniture.category || "Accent",
    price: furniture.price || 0,
    status: furniture.isSale ? "On Sale" : "Not On Sale",
    variant: furniture.variant || "No variant",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const confirmBtn = () => {
    if (handleConfirmBtn) {
      handleConfirmBtn(productDetails); // Ensure `id` is included
    }
  };

  const cancelBtn = () => {
    if (handleIsUpdateBtn) {
      handleIsUpdateBtn(false);
    }
  };

  return (
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
      <header className="flex flex-col gap-1 md:flex-row md:gap-3">
        <section className="flex flex-col gap-1 basis-3/5">
          <h3 className="text-sm font-medium">
            Product ID:{" "}
            <span className="font-normal text-gray-600">{furniture.id}</span>
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
              rows="4"
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
              <option value="Accent">Accent</option>
              <option value="Living Room">Living Room</option>
              <option value="Bedroom">Bedroom</option>
            </select>
          </h3>
          <h3 className="text-sm font-medium">
            Price:{" "}
            <input
              type="number"
              name="price"
              value={productDetails.price}
              onChange={handleInputChange}
              className="rounded-sm bg-gray-50 border border-gray-300 text-gray-900 focus:ring-arfagreen focus:border-arfagreen block flex-1 min-w-0 w-full text-sm p-2.5"
            />
          </h3>
          <h3 className="text-sm font-medium">
            Status:{" "}
            <select
              name="status"
              value={productDetails.status}
              onChange={handleInputChange}
              className="rounded-sm bg-gray-50 border border-gray-300 text-gray-900 focus:ring-arfagreen focus:border-arfagreen block flex-1 min-w-0 w-full text-sm p-2.5"
            >
              <option value="On Sale">On Sale</option>
              <option value="Not On Sale">Not On Sale</option>
            </select>
          </h3>
          <h3 className="text-sm font-medium">
            Variant:{" "}
            <select
              name="variant"
              value={productDetails.variant}
              onChange={handleInputChange}
              className="rounded-sm bg-gray-50 border border-gray-300 text-gray-900 focus:ring-arfagreen focus:border-arfagreen block flex-1 min-w-0 w-full text-sm p-2.5"
            >
              <option value="Wood">Wood</option>
              <option value="Metal">Metal</option>
              <option value="Plastic">Plastic</option>
              <option value="Glass">Glass</option>
              <option value="No variant">No variant</option>
            </select>
          </h3>
        </section>
      </header>
    </section>
  );
};

export default UpdateProductDetails;
