import React, { useRef } from "react";
import { Button, Drawer } from "flowbite-react";
import { useStore } from "../../stores/useStore";
import ShowModel from "../ShowModel";
import { formatToPeso } from "../globalFunctions";
import { useEffect } from "react";
import { ArrowsPointingInIcon } from "@heroicons/react/20/solid";
import { addToCart } from "../../firebase/cart";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "../../firebase/firebase";

const AddToCartSelection = ({ path, furniture }) => {
  const isAddToCartOpen = useStore((state) => state.isAddToCartOpen);
  const updateIsAddToCartOpen = useStore(
    (state) => state.updateIsAddToCartOpen
  );

  const handleAddToCart = async (variantName) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        toast.error("You must be logged in to add items to your cart.");
        return;
      }

      const result = await addToCart(userId, furniture.id, variantName);

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
        className="absolute z-10 w-6 h-6 cursor-pointer text-arfablack top-3 right-3"
        onClick={handleClose}
      />
      <div className="absolute">
        <h1 className="text-base font-semibold text-gray-900 sm:text-lg dark:text-white">
          {furniture.name}
        </h1>
        <p className="">{formatToPeso(furniture.discountedPrice)}</p>
      </div>

      <div className="rounded-none h-5/6 md:rounded-lg ">
        {path ? (
          <ShowModel
            path={path}
            addToCartBtn={true}
            handleAddToCart={handleAddToCart}
          />
        ) : null}
      </div>
    </Drawer>
  );
};

export default AddToCartSelection;
