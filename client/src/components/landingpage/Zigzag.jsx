import yourSpaceYourFurniture from "../../assets/videos/your-space-your-furniture.mp4";

export default function Zigzag() {
  return (
    <section className="overflow-hidden" style={{ backgroundColor: "#F1F0EC" }}>
      <div className="w-4/5 px-4 mx-auto sm:px-6 md:w-4/6">
        {/* Removed w-8/12 to allow full width */}
        <div className="py-12 md:py-20">
          <div className="max-w-3xl pb-12 mx-auto text-center md:pb-16">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-green-500 dark:text-green">
              Shop Smarter, Visualize Better, Buy Confidently
            </h1>
            <p className="text-gray-500 sm:text-xl">
              Discover the next generation of online shopping with 3D models and
              augmented reality. View furniture from every angle, place it in
              your space, and ensure the perfect fit before making a purchase ✨
            </p>
          </div>

          {/* Items */}
          <div className="grid gap-10">
            {/* 1st item */}
            <div className="flex flex-col items-center md:flex-row">
              {/* Image */}
              <div
                className="hidden mx-auto mb-8 md:block md:ml-auto w-fit md:col-span-5 lg:col-span-6 md:mb-0 md:order-1"
                data-aos="fade-up"
              >
                <div
                  className="relative flex justify-center items-center h-[520px] w-[235px] border-4 border-black rounded-2xl bg-black"
                  style={{ boxShadow: "3px 3px 5px rgb(209, 218, 218)" }}
                >
                  {/* Phone Details */}
                  <span className="absolute top-0 z-10 w-16 h-4 mt-2 bg-black border border-black rounded-full"></span>
                  <span className="absolute -right-1.5 top-20 border-4 border-black h-14 rounded-lg"></span>
                  <span className="absolute -left-1.5 top-16 border-4 border-black h-6 rounded-lg"></span>
                  <span className="absolute -left-1.5 top-32 border-4 border-black h-14 rounded-lg"></span>
                  <span className="absolute -left-1.5 top-48 border-4 border-black h-14 rounded-lg"></span>

                  {/* Video inside the phone */}

                  <video
                    src={yourSpaceYourFurniture}
                    loop
                    muted
                    playsInline
                    controls
                    className="absolute object-contain w-full h-full rounded-2xl"
                  />
                </div>
              </div>
              {/* Content */}
              <div
                className="w-full md:col-span-7 lg:col-span-6"
                data-aos="fade-right"
              >
                <div className="pr-4 text-base lg:pr-12 xl:pr-16">
                  <h3 className="mb-2 font-bold text-green-500">
                    Your Space, Your Furniture
                  </h3>
                  <p className="mb-4 text-gray-500 t">
                    Use augmented reality to place furniture virtually in your
                    room. Rotate, zoom, and interact with furniture like never
                    before. See how it fits before you buy! 🏡
                  </p>
                  <ul className="-mb-2 text-gray-500">
                    <li className="flex items-center mb-2">
                      <svg
                        className="w-3 h-3 mr-2 text-green-500 fill-current shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Rotate and zoom for a detailed view</span>
                    </li>
                    <li className="flex items-center mb-2">
                      <svg
                        className="w-3 h-3 mr-2 text-green-500 fill-current shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Place furniture in your room using AR</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-3 h-3 mr-2 text-green-500 fill-current shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Make decisions with confidence</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2nd item */}
            <div className="flex flex-col items-center md:flex-row-reverse">
              {/* Content */}
              <div
                className="w-full md:col-span-7 lg:col-span-6"
                data-aos="fade-left"
              >
                <div className="text-base md:pl-4 lg:pl-12 xl:pl-16">
                  <h3 className="mb-2 font-bold text-green-500">
                    Styles That Complement Your Space
                  </h3>
                  <p className="mb-4 text-gray-500">
                    Whether you're looking for a cozy sofa, an elegant dining
                    table, or a modern coffee table, our platform helps you find
                    the perfect match for your space and style 🪑
                  </p>
                  <ul className="-mb-2 text-gray-500">
                    <li className="flex items-center mb-2">
                      <svg
                        className="w-3 h-3 mr-2 text-green-500 fill-current shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Visualize different colors and finishes</span>
                    </li>
                    <li className="flex items-center mb-2">
                      <svg
                        className="w-3 h-3 mr-2 text-green-500 fill-current shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>See how it fits with your decor</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-3 h-3 mr-2 text-green-500 fill-current shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Find furniture that feels like home</span>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Image */}
              <div
                className="hidden mx-auto mb-8 md:block md:mr-auto w-fit md:col-span-5 lg:col-span-6 md:mb-0"
                data-aos="fade-up"
              >
                <div
                  className="relative flex justify-center items-center h-[520px] w-[235px] border-4 border-black rounded-2xl bg-black"
                  style={{ boxShadow: "3px 3px 5px rgb(209, 218, 218)" }}
                >
                  {/* Phone Details */}
                  <span className="absolute top-0 z-10 w-16 h-4 mt-2 bg-black border border-black rounded-full"></span>
                  <span className="absolute -right-1.5 top-20 border-4 border-black h-14 rounded-lg"></span>
                  <span className="absolute -left-1.5 top-16 border-4 border-black h-6 rounded-lg"></span>
                  <span className="absolute -left-1.5 top-32 border-4 border-black h-14 rounded-lg"></span>
                  <span className="absolute -left-1.5 top-48 border-4 border-black h-14 rounded-lg"></span>

                  {/* Video inside the phone */}

                  <video
                    src={yourSpaceYourFurniture}
                    loop
                    muted
                    playsInline
                    controls
                    className="absolute object-contain w-full h-full rounded-2xl"
                  />
                </div>
              </div>
            </div>

            {/* 3rd item */}
            <div className="flex flex-col items-center md:flex-row">
              {/* Image */}
              <div
                className="hidden mx-auto mb-8 md:block md:ml-auto w-fit md:col-span-5 lg:col-span-6 md:mb-0 md:order-1"
                data-aos="fade-up"
              >
                <div
                  className="relative flex justify-center items-center h-[520px] w-[235px] border-4 border-black rounded-2xl bg-black"
                  style={{ boxShadow: "3px 3px 5px rgb(209, 218, 218)" }}
                >
                  {/* Phone Details */}
                  <span className="absolute top-0 z-10 w-16 h-4 mt-2 bg-black border border-black rounded-full"></span>
                  <span className="absolute -right-1.5 top-20 border-4 border-black h-14 rounded-lg"></span>
                  <span className="absolute -left-1.5 top-16 border-4 border-black h-6 rounded-lg"></span>
                  <span className="absolute -left-1.5 top-32 border-4 border-black h-14 rounded-lg"></span>
                  <span className="absolute -left-1.5 top-48 border-4 border-black h-14 rounded-lg"></span>

                  {/* Video inside the phone */}
                  <video
                    src={yourSpaceYourFurniture}
                    loop
                    muted
                    playsInline
                    controls
                    className="absolute object-contain w-full h-full rounded-2xl"
                  />
                </div>
              </div>
              {/* Content */}
              <div
                className="w-full md:col-span-7 lg:col-span-6"
                data-aos="fade-right"
              >
                <div className="pr-4 text-base lg:pr-12 xl:pr-16">
                  <h3 className="mb-2 font-bold text-green-500">
                    Bring Furniture to Life
                  </h3>
                  <p className="mb-4 text-gray-500">
                    Use augmented reality to see how furniture fits into your
                    space and create the perfect environment for your needs 📐
                  </p>
                  <ul className="-mb-2 text-gray-500">
                    <li className="flex items-center mb-2">
                      <svg
                        className="w-3 h-3 mr-2 text-green-500 fill-current shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Visualize furniture placement in real-time</span>
                    </li>
                    <li className="flex items-center mb-2">
                      <svg
                        className="w-3 h-3 mr-2 text-green-500 fill-current shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Ensure every piece fits perfectly</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-3 h-3 mr-2 text-green-500 fill-current shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Plan your space with confidence</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
