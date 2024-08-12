import React, { useRef } from "react";
import { Button, Drawer } from "flowbite-react";
import { useStore } from "../../stores/useStore";
import ShowModel from "../ShowModel";
import { formatToPeso } from "../globalFunctions";
import { useEffect } from "react";
import { Carousel } from "flowbite-react";

const MaximizeImages = ({ furnitureImgUrls }) => {
  const isImgsOpen = useStore((state) => state.isImgsOpen);
  const updateIsImgsOpen = useStore((state) => state.updateIsImgsOpen);

  const handleClose = () => updateIsImgsOpen(false);

  return (
    <Drawer
      open={isImgsOpen}
      onClose={handleClose}
      position="bottom"
      className="md:h-5/6 h-3/4 rounded-t-xl"
    >
      <div className="relative h-64 mx-auto sm:h-80 md:w-2/4 lg:h-full">
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
