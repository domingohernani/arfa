import React, { useRef } from "react";
import { Button, Drawer } from "flowbite-react";
import { useStore } from "../../stores/useStore";
import ShowModel from "../ShowModel";
import { formatToPeso } from "../globalFunctions";
import { useEffect } from "react";

const Show3D = ({ path, furniture }) => {
  const isOpen = useStore((state) => state.is3dOpen);
  const setIsOpen = useStore((state) => state.updateIs3dOpen);

  const handleClose = () => setIsOpen(false);

  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      position="bottom"
      className="h-3/4 rounded-t-xl"
    >
      <div className="absolute">
        <h1 className="text-base font-semibold text-gray-900 sm:text-lg dark:text-white">
          {furniture.name}
        </h1>
        <p className="">{formatToPeso(furniture.discountedPrice)}</p>
      </div>

      <div className="rounded-none h-5/6 md:rounded-lg ">
        {path ? <ShowModel path={path} /> : null}
      </div>
    </Drawer>
  );
};

export default Show3D;
