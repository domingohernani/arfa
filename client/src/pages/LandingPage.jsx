import React from "react";
import NavigationBar from "../components/navigation/NavigationBar";
import LatestTrends from "../components/dynamic/LatestTrends";
import { Link } from "react-router-dom";
import { FooterSection } from "../components/navigation/FooterSection";
import Hero from "../components/landingpage/Hero";
import Features from "../components/landingpage/Features";
import Zigzag from "../components/landingpage/Zigzag";
import Testimonials from "../components/landingpage/Testimonials";
import Newsletter from "../components/landingpage/Newsletter";
import Footer from "../components/landingpage/Footer";
import heroBg from "../assets/images/hero-bg.jpg";
import logo from "../assets/logos/logo_green.svg";

const LandingPage = () => {
  return (
    <>
      <div>
        {/* Hero Section */}
        <div className="relative flex flex-col flex-1 w-full h-screen from-green-50/50 via-teal-50 to-green-50/50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
          {/* <NavigationBar></NavigationBar> */}
          <section className="mx-6 my-3">
            <Link to="/">
              <img
                src={logo}
                alt="ARFA"
                className="w-16 h-auto"
                data-aos="zoom-in"
              />
            </Link>
          </section>
          <div className="fixed w-screen h-screen -z-10">
            <img
              src="https://images.unsplash.com/photo-1521689058547-ad3350ffe5ea?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              // src={heroBg}
              className="top-0 left-0 object-cover w-full h-full "
              style={{ transform: "scaleX(-1)" }}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-5"></div>
          </div>

          <article className="flex flex-col gap-5 px-6 mt-32">
            <h1
              className="text-3xl font-bold tracking-normal text-center text-arfablack text-white-300 sm:text-6xl"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              Transform Your Furniture Shopping Experience
              <span className="relative text-white whitespace-nowrap">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 418 42"
                  className="absolute top-2/3 left-0 h-[0.58em] w-full  fill-arfagreen"
                  preserveAspectRatio="none"
                >
                  <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.780 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.540-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.810 23.239-7.825 27.934-10.149 28.304-14.005 .417-4.348-3.529-6-16.878-7.066Z"></path>
                </svg>
                <span className="relative text-arfagreen"> with AR</span>
              </span>
            </h1>
            <h2
              className="w-full mx-auto text-base leading-7 text-center text-green-600 md:text-lg md:w-2/4 sm:text-white-400 text-white-500"
              data-aos="fade-right"
              data-aos-delay="220"
            >
              Explore the future of furniture shopping with our state-of-the-art
              Augmented Reality tool. From visualizing pieces in your home to
              interactive product features, our innovative system enhances every
              aspect of your furniture shopping journey.
            </h2>
            <Link
              to="/catalog"
              className="px-4 py-3 mx-auto text-sm font-medium text-white transition w-fit bg-arfagreen rounded-xl hover:text-white"
              data-aos="fade-right"
              data-aos-delay="240"
            >
              Start Now!
            </Link>
          </article>
        </div>

        {/* Latest Trends */}
        {/* <section className="pb-10 bg-arfagray">
          <LatestTrends></LatestTrends>
        </section> */}

        {/* Categories */}
        {/* <section>
          <ul className="grid items-start grid-cols-1 p-8 xl:grid-cols-3 gap-y-10 gap-x-6">
            <li className="relative flex flex-col items-start sm:flex-row xl:flex-col">
              <div className="order-1 sm:ml-6 xl:ml-0">
                <h3 className="mb-1 font-semibold text-slate-900">
                  <span className="block mb-1 text-sm leading-6 text-indigo-500">
                    Headless UI
                  </span>
                  Completely unstyled, fully accessible UI components
                </h3>
                <div className="text-sm prose-sm prose prose-slate">
                  <p>
                    Completely unstyled, fully accessible UI components,
                    designed to integrate beautifully with Tailwind CSS.
                  </p>
                </div>
                <a
                  className="inline-flex items-center px-3 mt-6 text-sm font-semibold rounded-full group h-9 whitespace-nowrap focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500"
                  href=""
                >
                  Learn more
                  <span className="sr-only">
                    , Completely unstyled, fully accessible UI components
                  </span>
                  <svg
                    className="ml-3 overflow-visible text-slate-300 group-hover:text-slate-400"
                    width="3"
                    height="6"
                    viewBox="0 0 3 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M0 0L3 3L0 6"></path>
                  </svg>
                </a>
              </div>
              <img
                src="https://tailwindcss.com/_next/static/media/headlessui@75.c1d50bc1.jpg"
                alt=""
                className="mb-6 shadow-md bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full"
                width="1216"
                height="640"
              />
            </li>
            <li className="relative flex flex-col items-start sm:flex-row xl:flex-col">
              <div className="order-1 sm:ml-6 xl:ml-0">
                <h3 className="mb-1 font-semibold text-slate-900">
                  <span className="block mb-1 text-sm leading-6 text-purple-500">
                    Heroicons
                  </span>
                  Beautiful hand-crafted SVG icons, by the makers of Tailwind
                  CSS.
                </h3>
                <div className="text-sm prose-sm prose prose-slate">
                  <p>
                    A set of 450+ free MIT-licensed SVG icons. Available as
                    basic SVG icons and via first-party React and Vue libraries.
                  </p>
                </div>
                <a
                  className="inline-flex items-center px-3 mt-6 text-sm font-semibold rounded-full group h-9 whitespace-nowrap focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500"
                  href=""
                >
                  Learn more
                  <span className="sr-only">
                    , Beautiful hand-crafted SVG icons, by the makers of
                    Tailwind CSS.
                  </span>
                  <svg
                    className="ml-3 overflow-visible text-slate-300 group-hover:text-slate-400"
                    width="3"
                    height="6"
                    viewBox="0 0 3 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M0 0L3 3L0 6"></path>
                  </svg>
                </a>
              </div>
              <img
                src="https://tailwindcss.com/_next/static/media/heroicons@75.4a558f35.jpg"
                alt=""
                className="mb-6 shadow-md bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full"
                width="1216"
                height="640"
              />
            </li>
            <li className="relative flex flex-col items-start sm:flex-row xl:flex-col">
              <div className="order-1 sm:ml-6 xl:ml-0">
                <h3 className="mb-1 font-semibold text-slate-900">
                  <span className="block mb-1 text-sm leading-6 text-cyan-500">
                    Hero Patterns
                  </span>
                  Seamless SVG background patterns by the makers of Tailwind
                  CSS.
                </h3>
                <div className="text-sm prose-sm prose prose-slate">
                  <p>
                    A collection of over 100 free MIT-licensed high-quality SVG
                    patterns for you to use in your web projects.
                  </p>
                </div>
                <a
                  className="inline-flex items-center px-3 mt-6 text-sm font-semibold rounded-full group h-9 whitespace-nowrap focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500"
                  href=""
                >
                  Learn more
                  <span className="sr-only">
                    , Seamless SVG background patterns by the makers of Tailwind
                    CSS.
                  </span>
                  <svg
                    className="ml-3 overflow-visible text-slate-300 group-hover:text-slate-400"
                    width="3"
                    height="6"
                    viewBox="0 0 3 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M0 0L3 3L0 6"></path>
                  </svg>
                </a>
              </div>
              <img
                src="https://tailwindcss.com/_next/static/media/heropatterns@75.82a09697.jpg"
                alt=""
                className="mb-6 shadow-md bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full"
                width="1216"
                height="640"
              />
            </li>
          </ul>
        </section> */}
        <section>
          <Features></Features>
        </section>
        <section>
          <FooterSection></FooterSection>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
