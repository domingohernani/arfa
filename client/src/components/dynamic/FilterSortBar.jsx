import React from "react";
import { useStore } from "../../stores/useStore";
import { XMarkIcon } from "@heroicons/react/20/solid";

const FilterSortBar = () => {
  const minP = useStore((state) => state.minPrice);
  const maxP = useStore((state) => state.maxPrice);

  const isSaleOnly = useStore((state) => state.isSaleOnly);
  const isNewArrivalsOnly = useStore((state) => state.isNewArrivalsOnly);

  const updateMinPrice = useStore((state) => state.updateMinPrice);
  const updateMaxPrice = useStore((state) => state.updateMaxPrice);
  const updateIsSaleOnly = useStore((state) => state.updateIsSaleOnly);
  const updateIsNewArrivalsOnly = useStore(
    (state) => state.updateIsNewArrivalsOnly
  );

  return (
    <div className="flex flex-wrap gap-3">
      {minP && maxP && (
        <div className="flex items-center justify-center gap-1 px-2 py-1 border rounded-sm bg-arfagray w-fit">
          <span className="text-sm">
            ₱{minP} - ₱{maxP}
          </span>
          <XMarkIcon
            className="w-4 h-4 ml-auto mr-1 text-gray-400 cursor-pointer hover:text-gray-500"
            aria-hidden="true"
            onClick={() => {
              updateMinPrice("");
              updateMaxPrice("");
            }}
          />
        </div>
      )}
      {isSaleOnly && (
        <div className="flex items-center justify-center gap-1 px-2 py-1 border rounded-sm bg-arfagray w-fit">
          <span className="text-sm">Sale</span>
          <XMarkIcon
            className="w-4 h-4 ml-auto mr-1 text-gray-400 cursor-pointer hover:text-gray-500"
            aria-hidden="true"
            onClick={() => {
              updateIsSaleOnly(false);
            }}
          />
        </div>
      )}
      {isNewArrivalsOnly && (
        <div className="flex items-center justify-center gap-1 px-2 py-1 border rounded-sm bg-arfagray w-fit">
          <span className="text-sm">New Arrivals</span>
          <XMarkIcon
            className="w-4 h-4 ml-auto mr-1 text-gray-400 cursor-pointer hover:text-gray-500"
            aria-hidden="true"
            onClick={() => {
              updateIsNewArrivalsOnly(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default FilterSortBar;
