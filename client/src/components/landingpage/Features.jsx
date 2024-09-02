import React from "react";

export default function Features() {
  return (
    <section className="py-20 bg-white dark:bg-white">
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-16 lg:px-6">
        <div
          className="max-w-screen-lg mx-auto mb-8 text-center lg:mb-16"
          data-aos="zoom-in-down"
        >
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-green-500 dark:text-green">
            Designed for your furniture business
          </h2>
          <p className="text-gray-400 sm:text-xl dark:text-gray-400">
            Let us transform furniture shopping in the Philippines with our
            Augmented Reality Web Application! 🛋️ <br /> We offer customers an
            immersive experience, letting them visualize products in their
            space.
          </p>
        </div>
        <div className="mx-auto space-y-8 md:w-5/6 md:grid md:grid-cols-2 lg:grid-cols-2 md:gap-8 md:space-y-0">
          <p
            data-aos="fade-right"
            data-aos-delay="220"
            className="relative col-start-1 col-end-3 text-gray-400 -bottom-5 md:-bottom-14 sm:text-xl"
          >
            Shoppers:
          </p>
          <div data-aos="fade-right" data-aos-delay="200">
            <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg
                id="Layer_1"
                height="512"
                viewBox="0 0 24 24"
                width="21"
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
                fill="rgb(107 114 128)"
              >
                <path d="m12.883 15.216-7.935 7.935a2.9 2.9 0 1 1 -4.1-4.1l7.935-7.935zm4.217-8.316a2.967 2.967 0 0 0 -4.1 0l-2.8 2.8 4.1 4.1 2.8-2.8a2.9 2.9 0 0 0 0-4.1zm-12.237-1.755 1.55.442.442 1.55a1.191 1.191 0 0 0 2.29 0l.442-1.55 1.55-.442a1.191 1.191 0 0 0 0-2.29l-1.55-.442-.442-1.55a1.191 1.191 0 0 0 -2.29 0l-.442 1.55-1.55.442a1.191 1.191 0 0 0 0 2.29zm12 12 1.55.442.442 1.55a1.191 1.191 0 0 0 2.29 0l.442-1.55 1.55-.442a1.191 1.191 0 0 0 0-2.29l-1.55-.442-.442-1.55a1.191 1.191 0 0 0 -2.29 0l-.442 1.55-1.55.442a1.191 1.191 0 0 0 0 2.29zm.893-12.645 1.355.387.389 1.357a1.042 1.042 0 0 0 2 0l.387-1.355 1.357-.389a1.042 1.042 0 0 0 0-2l-1.355-.387-.389-1.357a1.042 1.042 0 0 0 -2 0l-.387 1.355-1.357.389a1.042 1.042 0 0 0 0 2z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-green-400 dark:text-green-400">
              3D Furniture Models
            </h3>
            <p className="text-gray-400 dark:text-gray-400">
              Explore our furniture in 3D. Rotate, zoom, and inspect every
              detail before making your purchase
            </p>
          </div>
          <div data-aos="fade-left" data-aos-delay="200">
            <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="24"
                fill="rgb(107 114 128)"
              >
                <path d="m8,13.71v-2.844l3,1.714v3.424l-2.496-1.426c-.311-.178-.504-.511-.504-.868Zm4.498-5.999c-.153-.088-.325-.132-.498-.132s-.345.044-.498.132l-2.49,1.43,2.988,1.708,2.988-1.708-2.491-1.43Zm-5.426.321c.139-.118.274-.241.435-.333l3-1.723c.922-.529,2.065-.529,2.987,0l3.001,1.723c.161.092.296.215.434.333l4.418-2.525c-.253-.257-.541-.484-.863-.667l-6.5-3.715c-1.225-.699-2.745-.699-3.968,0h0l-6.5,3.715c-.321.183-.609.41-.863.667l4.419,2.525Zm3.928,10.195c-.166-.059-.334-.111-.489-.199l-3-1.714c-.933-.533-1.512-1.531-1.512-2.604v-3.409c0-.183.039-.359.072-.537L1.65,7.237c-.097.346-.15.707-.15,1.075v7.375c0,1.432.772,2.763,2.016,3.473l6.5,3.715c.312.178.643.31.984.397v-5.044Zm6.928-8.464c.033.177.072.353.072.537v3.409c0,1.073-.579,2.071-1.511,2.604l-3.001,1.714c-.155.089-.323.141-.488.199v5.044c.341-.087.672-.219.984-.397l6.5-3.715c1.243-.711,2.016-2.041,2.016-3.473v-7.375c0-.368-.053-.729-.15-1.075l-4.422,2.527Zm-1.928,3.946v-2.844l-3,1.714v3.424l2.496-1.426c.311-.178.504-.511.504-.868Z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-green-400 dark:text-green-400">
              Try Before You Buy
            </h3>
            <p className="text-gray-400 dark:text-gray-400">
              Place furniture virtually in your home using AR. Ensure it fits
              perfectly with your décor before placing an order
            </p>
          </div>
          <p
            data-aos="fade-right"
            data-aos-delay="220"
            className="relative col-start-1 col-end-3 text-gray-400 -bottom-3 md:-bottom-8 sm:text-xl"
          >
            Sellers:
          </p>
          <div data-aos="fade-right" data-aos-delay="240">
            <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="24"
                fill="rgb(107 114 128)"
              >
                <path d="m12,0C5.047,0,0,2.523,0,6v13.548c0,1.574,1.055,3.057,2.971,4.175.315.184.668.275,1.021.275.348,0,.696-.09,1.006-.268.626-.36,1.001-1.007,1.001-1.729v-10.678c0-1.12-.628-2.143-1.639-2.667h0c-1.5-.777-2.36-1.745-2.36-2.656,0-1.932,4.018-4,10-4s10,2.068,10,4c0,.911-.86,1.879-2.36,2.656h0c-1.011.524-1.639,1.547-1.639,2.667v10.678c0,.723.375,1.369,1.001,1.729.311.178.658.268,1.006.268.353,0,.707-.092,1.021-.275,1.916-1.118,2.971-2.601,2.971-4.175V6c0-3.477-5.047-6-12-6Zm0,10c-1.381,0-2.5-1.119-2.5-2.5s1.119-2.5,2.5-2.5,2.5,1.119,2.5,2.5-1.119,2.5-2.5,2.5Zm0,1c-2.206,0-4,1.794-4,4v2c0,.883.391,1.67,1,2.22v3.78c0,.553.448,1,1,1s1-.447,1-1v-3h2v3c0,.553.448,1,1,1s1-.447,1-1v-3.78c.609-.549,1-1.337,1-2.22v-2c0-2.206-1.794-4-4-4Z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-green-400 dark:text-green-400">
              Showcase Your Products
            </h3>
            <p className="text-gray-400 dark:text-gray-400">
              See furniture in your space before you buy. Step into the future
              of interior design with confidence and style!
            </p>
          </div>
          <div data-aos="fade-left" data-aos-delay="240">
            <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="24"
                fill="rgb(107 114 128)"
              >
                <path d="m23.365,3.699l-1.322,1.322-3.064-3.064,1.234-1.234c.801-.801,2.108-.955,2.985-.237,1.009.825,1.064,2.316.166,3.214Zm-5.8-.328l-5.296,5.296c-.813.813-1.269,1.915-1.269,3.064v.769c0,.276.224.5.5.5h.769c1.149,0,2.251-.457,3.064-1.269l5.296-5.296-3.064-3.064Zm3.707,10.514l-.451-.26c.102-.544.153-1.088.153-1.625s-.051-1.081-.153-1.625l-.29-1.015-3.784,3.784c-1.196,1.196-2.786,1.855-4.478,1.855h-.77c-1.379,0-2.5-1.121-2.5-2.5v-.77c0-1.691.659-3.281,1.855-4.478l4.119-4.119v-.134c0-1.654-1.346-3-3-3s-3,1.346-3,3v.522c-1.047.37-2.016.929-2.857,1.649l-.45-.259c-.693-.398-1.501-.504-2.277-.295-.773.208-1.419.706-1.818,1.4-.4.694-.505,1.503-.296,2.277.208.773.706,1.419,1.401,1.819l.451.259c-.102.544-.153,1.088-.153,1.626s.051,1.082.153,1.626l-.451.259c-.695.4-1.192,1.046-1.401,1.819-.209.774-.104,1.583.295,2.276.399.695,1.045,1.193,1.819,1.401.776.21,1.584.104,2.277-.295l.45-.259c.841.721,1.81,1.279,2.857,1.649v.522c0,1.654,1.346,3,3,3s3-1.346,3-3v-.522c1.047-.37,2.016-.929,2.857-1.649l.45.259c.695.399,1.503.505,2.277.295.773-.208,1.419-.706,1.819-1.401.825-1.434.329-3.271-1.105-4.096Z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-green-400 dark:text-green-400">
              Augmented Reality
            </h3>
            <p className="text-gray-400 dark:text-gray-400">
              Enable shoppers to visualize your products in their space with AR.
              Make their decision-making process easier."
            </p>
          </div>
          <div data-aos="fade-right" data-aos-delay="260">
            <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="24"
                fill="rgb(107 114 128)"
              >
                <path d="M24,23c0,.552-.448,1-1,1H3c-1.654,0-3-1.346-3-3V1C.006-.308,1.994-.307,2,1V21c0,.551,.449,1,1,1H23c.552,0,1,.448,1,1Zm-.858-13.1l-2.021-2.021c-1.134-1.134-3.11-1.134-4.243,0l-1.879,1.878-3.879-3.878c-1.133-1.134-3.109-1.134-4.242,0l-2,2c-.567,.566-.879,1.32-.879,2.121v7c0,1.654,1.346,3,3,3h14.006c1.65,0,2.996-1.342,3-2.991l.015-4.979c.002-.794-.318-1.571-.879-2.13Z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-green-400 dark:text-green-400">
              Manage Your Inventory
            </h3>
            <p className="text-gray-400 dark:text-gray-400">
              Keep track of your stock in real-time and manage orders
              effortlessly.
            </p>
          </div>
          <div data-aos="fade-left" data-aos-delay="260">
            <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg
                id="Layer_1"
                height="512"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
                fill="rgb(107 114 128)"
              >
                <path d="m12 4v1a4 4 0 0 1 -4 4h-1v2h2a1 1 0 0 1 0 2h-6a1 1 0 0 1 0-2h2v-2h-1a4 4 0 0 1 -4-4v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4zm3 1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 2 0v-2a3 3 0 0 0 -3-3h-2a1 1 0 0 0 0 2zm-4 14h-3a1 1 0 0 1 -1-1v-2a1 1 0 0 0 -2 0v2a3 3 0 0 0 3 3h3a1 1 0 0 0 0-2zm13-4v5a4 4 0 0 1 -4 4h-2a4 4 0 0 1 -4-4v-5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4zm-4 5a1 1 0 1 0 -1 1 1 1 0 0 0 1-1z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-green-400 dark:text-green-400">
              Business Analytics
            </h3>
            <p className="text-gray-400 dark:text-gray-400">
              Gain insights into customer behavior and market trends. Optimize
              your listings and grow your business with actionable data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
