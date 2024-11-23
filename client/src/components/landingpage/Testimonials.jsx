import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Autoplay, Pagination } from "swiper/modules";

const testimonialsData = [
  {
    text: "This platform has revolutionized how I sell furniture. The ability to showcase 3D models has increased my sales by 40%. Shoppers love interacting with the products before purchasing!",
    name: "Sophia Green",
    role: "Furniture Seller",
    company: "Cozy Living",
  },
  {
    text: "As a shopper, I love how easy it is to visualize furniture in my space using augmented reality. The checkout process is seamless, and delivery is always on time!",
    name: "John Doe",
    role: "Happy Shopper",
    location: "Los Angeles, CA",
  },
  {
    text: "The seller dashboard is incredibly intuitive. Managing my inventory and orders has never been easier. This platform gives me the tools I need to scale my business.",
    name: "Emily Carter",
    role: "Shop Owner",
    company: "Modern Luxe",
  },
  {
    text: "I was hesitant to buy furniture online, but the AR feature allowed me to see exactly how it would fit in my home. It's like shopping with a personal designer!",
    name: "Sarah Johnson",
    role: "Satisfied Shopper",
    location: "Austin, TX",
  },
  {
    text: "As a seller, I appreciate the detailed analytics. I can see which products perform best and adjust my strategy accordingly. It's a game-changer for my business.",
    name: "William Martinez",
    role: "Seller",
    company: "Rustic Charm",
  },
  // {
  //   text: "The multi-shop checkout feature is amazing. I was able to purchase from three different sellers in one go. It's so convenient!",
  //   name: "Olivia Brown",
  //   role: "Shopper",
  //   location: "New York, NY",
  // },
];

export default function Testimonials() {
  return (
    <section className="h-screen bg-white">
      <div className="px-4 mx-auto sm:px-6">
        <div className="py-12 border-gray-800 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl pb-12 mx-auto text-center md:pb-20">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-green-500 dark:text-green">
              What Our Users Say
            </h1>
            <p className="text-xl text-gray-500">
              Discover how our e-commerce platform empowers sellers and enhances
              shopping experiences for buyers.
            </p>
          </div>

          {/* Swiper Testimonials */}
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            pagination={{ clickable: true }}
            slidesPerView={1}
            spaceBetween={30}
            breakpoints={{
              1024: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 2,
              },
            }}
            speed={800} // Smooth animation
          >
            {testimonialsData.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col h-full p-6 mb-10 rounded-lg shadow-md bg-arfagray">
                  <blockquote className="text-lg text-gray-500 grow">
                    — {testimonial.text}
                  </blockquote>
                  <div className="pt-5 mt-6 font-medium text-gray-500 border-t">
                    <cite className="not-italic text-gray-500">
                      {testimonial.name}
                    </cite>{" "}
                    -{" "}
                    {testimonial.company ? (
                      <span className="text-arfagreen">
                        {testimonial.role} at {testimonial.company}
                      </span>
                    ) : (
                      <span className="text-arfagreen">
                        {testimonial.role}, {testimonial.location}
                      </span>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
