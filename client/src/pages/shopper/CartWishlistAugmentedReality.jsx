import React, { useEffect, useRef, useState } from "react";
import NavigationBar from "../../components/navigation/NavigationBar";
import greaterthan from "../../assets/icons/greater-than.svg";
import { FooterSection } from "../../components/navigation/FooterSection";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import ShowModel from "../../components/ShowModel";
import { NavLink, useParams } from "react-router-dom";
const CartWishlistAugmentedReality = () => {
  const [photoURL, setPhotoURL] = useState(null);
  const photoPath = "models/sofa.glb";

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const storageRef = ref(storage, photoPath);
        const url = await getDownloadURL(storageRef);
        setPhotoURL(url);
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
    };

    fetchPhoto();
  }, [photoPath]);

  const changeModel = async (path) => {
    const storageRef = ref(storage, path);
    const url = await getDownloadURL(storageRef);
    setPhotoURL(url);
  };

  const { page } = useParams();

  return (
    <section className="antialiased dark:bg-gray-900">
      <section className="mx-6 my-3">
        <NavigationBar />
      </section>
      <div className="px-4 max-w-screen md:mx-8 2xl:px-0">
        <div className="flex items-center gap-2 py-5 text-sm text-arfablack">
          <span className="cursor-pointer hover:text-arfagreen">Home</span>
          <img src={greaterthan} alt=">" className="w-2 h-2" />
          <span className="cursor-pointer hover:text-arfagreen">
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </span>
          <img src={greaterthan} alt=">" className="w-2 h-2" />
          <span className="cursor-pointer hover:text-arfagreen">
            Augmented Reality
          </span>
        </div>
        <div className="mb-8 ml-auto underline cursor-pointer w-fit underline-offset-2 decoration-arfablack">
          <NavLink to={`/${page}`}>
            <div className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill=""
                id="Outline"
                viewBox="0 0 24 24"
                width="512"
                height="512"
                className="w-4 h-auto text-arfablack"
              >
                <path d="M22.713,4.077A2.993,2.993,0,0,0,20.41,3H4.242L4.2,2.649A3,3,0,0,0,1.222,0H1A1,1,0,0,0,1,2h.222a1,1,0,0,1,.993.883l1.376,11.7A5,5,0,0,0,8.557,19H19a1,1,0,0,0,0-2H8.557a3,3,0,0,1-2.82-2h11.92a5,5,0,0,0,4.921-4.113l.785-4.354A2.994,2.994,0,0,0,22.713,4.077ZM21.4,6.178l-.786,4.354A3,3,0,0,1,17.657,13H5.419L4.478,5H20.41A1,1,0,0,1,21.4,6.178Z" />
                <circle cx="7" cy="22" r="2" />
                <circle cx="17" cy="22" r="2" />
              </svg>
              <span className="text-sm font-normal text-arfablack hover:text-arfagreen ">
                Back to {page.charAt(0).toUpperCase() + page.slice(1)}
              </span>
            </div>
          </NavLink>
        </div>

        <main className="flex flex-col gap-5 h-96 md:flex-row md:max-h-96">
          <div className="flex gap-5 overflow-scroll max-h-60 md:max-h-full md:flex-col">
            <div className="flex-shrink-0 w-36 h-36 md:w-auto md:h-44 ">
              <img
                src="https://www.love-your-home.co.uk/media/catalog/product/cache/becc11b8c68583c761d59f399a3e3771/e/l/eliza_armchair__1.jpg"
                className="object-cover w-full h-full rounded-lg cursor-pointer"
                onClick={() => changeModel("models/armchair.glb")}
              />
            </div>
            <div className="flex-shrink-0 w-36 h-36 md:w-auto md:h-44">
              <img
                src="https://m.media-amazon.com/images/I/71DArvEAIAL.jpg"
                className="object-cover w-full h-full rounded-lg cursor-pointer"
                onClick={() => changeModel("models/chair.glb")}
              />
            </div>
            <div className="flex-shrink-0 w-36 h-36 md:w-auto md:h-44">
              <img
                src="https://www.retrosexual.gr/wp-content/uploads/2021/11/KA0193-5.jpg"
                className="object-cover w-full h-full rounded-lg cursor-pointer"
                onClick={() => changeModel("models/modernarmchair.glb")}
              />
            </div>
            <div className="flex-shrink-0 w-36 h-36 md:w-auto md:h-44">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="object-cover w-full h-full rounded-lg cursor-pointer"
                onClick={() => changeModel("models/sofa.glb")}
              />
            </div>
          </div>
          <div className="flex-1 w-full rounded-none md:rounded-lg h-96 bg-arfagray">
            <ShowModel path={photoURL}></ShowModel>
          </div>
        </main>
      </div>
      <section className="mt-20">
        <FooterSection />
      </section>
    </section>
  );
};

export default CartWishlistAugmentedReality;
