import React, { useRef } from "react";
import { Button, Drawer } from "flowbite-react";
import { useStore } from "../../stores/useStore";
import ShowModel from "../ShowModel";
import { formatToPeso } from "../globalFunctions";
import { useEffect } from "react";
import { Carousel } from "flowbite-react";
import { ArrowsPointingInIcon } from "@heroicons/react/20/solid";

const MaximizeImages = ({ furnitureImgUrls }) => {
  const isImgsOpen = useStore((state) => state.isImgsOpen);
  const updateIsImgsOpen = useStore((state) => state.updateIsImgsOpen);

  const handleClose = () => updateIsImgsOpen(false);

  return (
    <Drawer
      open={isImgsOpen}
      onClose={handleClose}
      position="bottom"
      className="h-full bg-transparent rounded-t-xl"
    >
      <ArrowsPointingInIcon
        className="absolute z-10 w-6 h-6 text-white cursor-pointer top-3 right-3"
        onClick={handleClose}
      />
      <div className="relative h-64 mx-auto carousel sm:h-80 md:w-2/3 lg:h-full">
        <Carousel className="mx-auto">
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
      </div>
    </Drawer>
  );
};

export default MaximizeImages;
