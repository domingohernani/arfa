import VideoThumb from "../../../public/images/hero-image-01.jpg";
import heroBg from "../../assets/images/hero-bg.jpg";

// import ModalVideo from '@/components/modal-video'
 
export default function Hero() {
  return (
    <section className="">
      {/* Illustration behind hero content */}
      <div className="relative w-screen h-screen overflow-hidden">
        {/* <img
          src={heroBg}
          className="object-cover w-full h-full"
          style={{ transform: "scaleX(-1)" }}
        /> */}
        <div
          className="absolute flex flex-col gap-1 transform "
          data-aos="fade-right"
        >
          {/* <h1 className="text-3xl font-bold text-arfagreen">
            Consectetur adipisicing elit.
          </h1> */}
          {/* <p className="text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum
            rerum corrupti enim quas.
          </p> */}
        </div>
      </div>

      {/* Hero content */}
      {/* Section header */}
      {/* <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
          <div className="max-w-3xl pb-12 mx-auto text-center md:pb-16">
            <h1 className="mb-4 h1" data-aos="fade-up">
              Landing template for startups
            </h1>
            <p
              className="mb-8 text-xl text-gray-400"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Our landing page template works on all devices, so you only have
              to set it up once, and get beautiful results forever.
            </p>
            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div data-aos="fade-up" data-aos-delay="400">
                <a
                  className="w-full mb-4 text-white bg-purple-600 btn hover:bg-purple-700 sm:w-auto sm:mb-0"
                  href="#0"
                >
                  Start free trial
                </a>
              </div>
              <div data-aos="fade-up" data-aos-delay="600">
                <a
                  className="w-full text-white bg-gray-700 btn hover:bg-gray-800 sm:w-auto sm:ml-4"
                  href="#0"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div> */}

      {/* <ModalVideo
            thumb={VideoThumb}
            thumbWidth={1024}
            thumbHeight={576}
            thumbAlt="Modal video thumbnail"
            video="/videos/video.mp4"
            videoWidth={1920}
            videoHeight={1080} /> */}
    </section>
  );
}
