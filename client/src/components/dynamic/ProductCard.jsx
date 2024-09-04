import React from "react";

const ProductCard = () => {
  return (
    <div className="absolute z-30">
      <div class="max-w-sm w-full lg:max-w-full lg:flex">
        <div className="flex-none h-48 text-center rounded-t lg:h-auto lg:w-48 lg:rounded-t-none lg:rounded-l">
          <img
            src="https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg"
            alt="Woman holding a mug"
            className="object-cover w-full h-full"
          />
        </div>
        <div class="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div class="mb-8">
            <div class="text-gray-900 font-bold text-xl mb-2">
              Can coffee make you a better developer?
            </div>
            <p class="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
