import React from "react";
import { Link } from "react-router-dom";
import { FooterSection } from "../components/navigation/FooterSection";
import Features from "../components/landingpage/Features";
import Zigzag from "../components/landingpage/Zigzag";
import Testimonials from "../components/landingpage/Testimonials";
import heroBg from "../assets/images/hero-bg.png";
import logo from "../assets/logos/logo_white.svg";
import Hotspots from "../components/landingpage/Hotspots";
import CookiesBar from "../components/modals/CookiesBar";
import SaleProduct from "../components/landingpage/SaleProduct";

const LandingPage = () => {
  return (
    <>
      <CookiesBar />
      <div>
        {/* Hero Section */}
        <div className="relative flex flex-col flex-1 w-full h-screen from-green-50/50 via-teal-50 to-green-50/50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
          {/* <NavigationBar></NavigationBar> */}
          <section className="mx-6 my-3">
            <Link to="/">
              <img src={logo} alt="ARFA" className="h-auto w-14 md:w-24" />
            </Link>
          </section>
          <div className="fixed inset-0 -z-10">
            <img
              src={heroBg}
              className="object-cover w-full h-full md:object-cover "
            />
            <div className="absolute inset-0 bg-black bg-opacity-25"></div>
          </div>

          <article className="flex flex-col gap-5 px-6 mt-32">
            <h1
              className="text-3xl font-bold tracking-normal text-center text-white sm:text-6xl"
              data-aos="fade-right"
              data-aos-delay="200"
              style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" }}
            >
              Transform Your Furniture Shopping Experience
              <span className="relative text-white whitespace-nowrap">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 418 42"
                  className="absolute top-2/3 left-0 h-[0.58em] w-full  fill-white"
                  preserveAspectRatio="none"
                >
                  <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.780 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.540-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.810 23.239-7.825 27.934-10.149 28.304-14.005 .417-4.348-3.529-6-16.878-7.066Z"></path>
                </svg>
                <span className="relative text-white"> with AR</span>
              </span>
            </h1>
            <h2
              className="w-full mx-auto text-base leading-7 text-center text-white md:text-lg md:w-2/4 sm:text-white-400 text-white-500"
              data-aos="fade-right"
              data-aos-delay="220"
              style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" }}
            >
              Explore the future of furniture shopping with our state-of-the-art
              Augmented Reality tool. From visualizing pieces in your home to
              interactive product features, our innovative system enhances every
              aspect of your furniture shopping journey.
            </h2>
            <Link
              to="/catalog"
              className="px-4 py-3 mx-auto text-sm font-semibold text-white transition rounded-md hover:text-white w-fit bg-arfagreen hover:bg-green-700"
              data-aos="fade-right"
              data-aos-delay="240"
            >
              Start Now!
            </Link>
          </article>
        </div>
        <section>
          <section>
            <Zigzag />
          </section>
          <section>
            <Features></Features>
          </section>
          <section>
            <Testimonials />
          </section>
          <section>
            <SaleProduct />
          </section>
          <section>
            <Hotspots />
          </section>

          {/* <section className="bg-white">
            <Newsletter />
          </section> */}
          <section className="relative">
            <FooterSection></FooterSection>
          </section>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
