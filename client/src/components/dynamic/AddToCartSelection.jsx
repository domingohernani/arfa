import React, { useState } from "react";
import { Button, Drawer } from "flowbite-react";
import { useStore } from "../../stores/useStore";
import ShowModel from "../ShowModel";
import { formatToPeso } from "../globalFunctions";
import { ArrowsPointingInIcon } from "@heroicons/react/20/solid";
import { addToCart } from "../../firebase/cart";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "../../firebase/firebase";
import { Carousel } from "flowbite-react";
import { getUserInfo } from "../../firebase/user";

const AddToCartSelection = ({ path, furniture }) => {
  const isAddToCartOpen = useStore((state) => state.isAddToCartOpen);
  const updateIsAddToCartOpen = useStore(
    (state) => state.updateIsAddToCartOpen
  );
  const sellerId = furniture.shopData.userId;
  const [selectedVariant, setSelectedVariant] = useState(furniture.variants[0]);

  const handleAddToCart = async (variantName) => {
    const userInfo = await getUserInfo();
    try {
      const userId = auth.currentUser?.uid;
      if (!userId || userInfo.role !== "shopper") {
        toast.error("You must be logged in to add items to your cart.");
        return;
      }

      const result = await addToCart(
        userId,
        furniture.id,
        variantName,
        sellerId
      );

      if (result.success) {
        if (result.isDuplicate) {
          toast.error("This item is already in your cart.");
        } else {
          toast.success("Item successfully added to your cart!");
        }
      } else {
        toast.error("Failed to add item to your cart.");
      }
    } catch (error) {
      toast.error("An error occurred while adding the item to your cart.");
      console.error("Error adding item to cart:", error);
    }
  };

  const handleVariantChange = (event) => {
    const variantName = event.target.value;
    const variant = furniture.variants.find((v) => v.name === variantName);
    setSelectedVariant(variant);
  };

  const handleClose = () => updateIsAddToCartOpen(false);

  return (
    <Drawer
      open={isAddToCartOpen}
      onClose={handleClose}
      position="bottom"
      className="bg-transparent bg-white rounded-t-lg h-3/4"
    >
      <Toaster />
      <ArrowsPointingInIcon
        className="absolute z-10 w-6 h-6 cursor-pointer right-3 top-3 text-arfablack"
        onClick={handleClose}
      />
      <div className="absolute">
        <h1 className="text-base font-semibold text-gray-900 dark:text-white sm:text-lg">
          {furniture.name}
        </h1>
        <p className="">{formatToPeso(furniture.discountedPrice)}</p>
      </div>

      <div className="rounded-none h-5/6 md:rounded-lg">
        {path ? (
          <ShowModel
            path={path}
            addToCartBtn={true}
            handleAddToCart={handleAddToCart}
          />
        ) : (
          // If the furniture has no 3d model
          <>
            {furniture.variants.length !== 0 &&
            furniture.variants.some((variant) => variant.name) ? (
              <div className="absolute flex items-center left-4 right-4 bottom-12">
                <span>Variant:</span>
                <select
                  id="variant"
                  className="text-sm text-center border-none border-x-transparent border-t-transparent focus:border-transparent focus:outline-none focus:ring-transparent"
                  onChange={handleVariantChange}
                >
                  {furniture.variants.map((variant, index) => (
                    <option key={index} value={variant.name}>
                      {variant.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="flex items-center mt-9"></div>
            )}
            <div
              className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 absolute bottom-3 left-0 right-0 mx-auto mt-4 flex w-fit cursor-pointer items-center justify-center rounded-lg bg-arfagreen px-5 py-2.5 text-sm font-medium text-white focus:ring-4 sm:mt-0"
              onClick={() => handleAddToCart(selectedVariant.name)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffff"
                className="w-4 h-4 -ms-2 me-2"
                id="Outline"
                viewBox="0 0 24 24"
                width="512"
                height="512"
              >
                <path d="M22.713,4.077A2.993,2.993,0,0,0,20.41,3H4.242L4.2,2.649A3,3,0,0,0,1.222,0H1A1,1,0,0,0,1,2h.222a1,1,0,0,1,.993.883l1.376,11.7A5,5,0,0,0,8.557,19H19a1,1,0,0,0,0-2H8.557a3,3,0,0,1-2.82-2h11.92a5,5,0,0,0,4.921-4.113l.785-4.354A2.994,2.994,0,0,0,22.713,4.077ZM21.4,6.178l-.786,4.354A3,3,0,0,1,17.657,13H5.419L4.478,5H20.41A1,1,0,0,1,21.4,6.178Z" />
                <circle cx="7" cy="22" r="2" />
                <circle cx="17" cy="22" r="2" />
              </svg>
              Add to cart
            </div>
            <div className="relative max-w-2xl mx-auto mt-14 h-96">
              <Carousel>
                {selectedVariant.imagePaths.map((image, index) => (
                  <img
                    src={image}
                    alt="Variant image"
                    key={index}
                    className="object-cover w-full h-full"
                  />
                ))}
              </Carousel>
            </div>
          </>
        )}
      </div>
    </Drawer>
  );
};

export default AddToCartSelection;
