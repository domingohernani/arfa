import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOnSaleFurnitures } from "../../firebase/furniture";
import DisplayStars from "../dynamic/DisplayStars";
import {
  calculateRatingSummary,
  formatToPeso,
  toSlug,
} from "../globalFunctions";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";

import { Autoplay, Navigation } from "swiper/modules";

const SaleProduct = () => {
  const [saleProducts, setSaleProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getOnSaleFurnitures();
        setSaleProducts(products);
      } catch (error) {
        console.error("Error fetching sale products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-6 py-6 bg-white" style={{ height: "120vh" }}>
      <div className="max-w-3xl pb-12 mx-auto text-center md:pb-20">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-green-500 dark:text-green">
          Hot Deals Just for You
        </h1>
        <p className="text-xl text-gray-500">
          Explore our top picks on sale! Grab these amazing offers while they
          last. 🛒🔥
        </p>
      </div>

      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        loopFillGroupWithBlank={true}
        navigation={true}
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        speed={800}
      >
        {saleProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <Link
              to={`catalog/item/${toSlug(product.name)}/${product.id}`}
              key={product.id}
            >
              <article className="relative cursor-pointer">
                {/* Image Section */}
                <div className="overflow-hidden border rounded-lg aspect-square">
                  <img
                    className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                    src={product.imgUrl}
                    alt={product.name}
                    loading="lazy"
                  />
                </div>

                {/* Sale Badge */}
                {product.isSale && (
                  <div className="absolute top-0 m-1 rounded-full">
                    <p className="text-[10px] rounded-full bg-arfablack p-1 font-bold uppercase tracking-wide text-white sm:px-3 sm:py-1">
                      Sale
                    </p>
                  </div>
                )}

                {/* Name and Price Section */}
                <div className="flex items-start justify-between mt-4">
                  <div className="relative">
                    {/* Furniture Name */}
                    <h3 className="text-xs font-semibold sm:text-sm md:text-sm">
                      <div className="w-20 text-sm truncate cursor-pointer sm:w-24 2xl:w-32 lg:w-20 text-arfablack hover:text-arfablack whitespace-nowrap">
                        {product.name}
                      </div>
                    </h3>

                    {/* Rating Stars */}
                    <div className="flex items-center mt-2">
                      <DisplayStars
                        number={Math.round(
                          calculateRatingSummary(product.reviewsData || {})
                            .average
                        )}
                        size={4}
                      />
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    {product.isSale ? (
                      <>
                        <del className="mt-px text-xs text-gray-600 sm:text-xs">
                          {formatToPeso(product.price)}
                        </del>
                        <p className="text-sm font-normal text-arfablack">
                          {formatToPeso(product.discountedPrice)}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm font-normal text-arfablack">
                        {formatToPeso(product.price)}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SaleProduct;
