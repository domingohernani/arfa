import React, { useEffect, useState } from "react";
import logo from "../../assets/logos/logo_black.svg";
import { Link } from "react-router-dom";
import { NotificationDrawer } from "../dynamic/NotificationDrawer";
import {
  ChatBubbleBottomCenterIcon,
  EllipsisVerticalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import DisplayAvatar from "../dynamic/DisplayAvatar";
import { getLoggedShopInfo, getUserInfo } from "../../firebase/user";
import { useStore } from "../../stores/useStore";
import { getImageDownloadUrl } from "../../firebase/photos";
function SellerNavigationBar() {
  const { loggedUser, setLoggedUser } = useStore();
  const [logoUrl, setLogoUrl] = useState("");
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getLoggedShopInfo();
        setLoggedUser(user);
        const url = await getImageDownloadUrl(user.logo);
        setLogoUrl(url);
      } catch (error) {
        console.error("Error fetching logged in user ", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="relative flex items-center justify-between px-6 py-3">
      {/* <img src={logo} alt="ARFA" className="w-20 h-auto" /> */}
      {/* tempo */}
      <img src={logo} alt="ARFA" className="w-16 h-auto" />

      <div className="items-center justify-end hidden col-start-11 gap-5 sm:flex">
        <div className="flex gap-2">
          <Link to={"inbox"} className="">
            <ChatBubbleBottomCenterIcon
              className="w-5 h-5 ml-auto cursor-pointer text-arfablack "
              aria-hidden="true"
            />
          </Link>
          <NotificationDrawer />
        </div>
        <div className="flex items-center w-48 md:w-full">
          <DisplayAvatar
            url={loggedUser && logoUrl ? logoUrl : null}
            className={"w-8 h-8 mr-2"}
            name={loggedUser && loggedUser.name ? loggedUser.name : "User"} // Fallback to "User" if name is null
          />
          <span className="flex-1 text-sm font-medium truncate">
            {loggedUser && loggedUser.name}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:hidden">
        <EllipsisVerticalIcon
          className="w-5 h-5 cursor-pointer"
          onClick={() => setMobileNav(!mobileNav)}
        />
        <DisplayAvatar
          url={loggedUser && logoUrl ? logoUrl : null}
          className={"w-8 h-8 mr-2"}
          name={loggedUser && loggedUser.name ? loggedUser.name : "User"} // Fallback to "User" if name is null
        />

        {mobileNav && (
          <div className="absolute right-0 flex w-full p-3 bg-white border -bottom-10">
            <span className="flex-1 text-sm font-medium truncate">
              {loggedUser && loggedUser.name}
            </span>
            <div className="flex justify-end">
              <Link to={"inbox"} className="">
                <ChatBubbleBottomCenterIcon
                  className="w-5 h-5 cursor-pointer text-arfablack "
                  aria-hidden="true"
                />
              </Link>
              <NotificationDrawer />
            </div>
            <XMarkIcon
              className="w-5 h-5 cursor-pointer"
              onClick={() => setMobileNav(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerNavigationBar;

// <div className="flex justify-start col-span-1 ">
//         <Link to="/">
//           <img src={logo} alt="ARFA" className="h-auto min-w-16 md:w-20" />
//         </Link>
//       </div>
//       <div className="flex items-center justify-end col-start-11 bg-red-300">
//         <div className="flex gap-2">
//           <NotificationDrawer />
//           <Link to={"/profile/user-profile"} className="">
//             <ChatBubbleBottomCenterIcon
//               className="w-5 h-5 ml-auto cursor-pointer text-arfablack "
//               aria-hidden="true"
//             />
//           </Link>
//         </div>
//         <DisplayAvatar
//           url={user && user.profileUrl ? user.profileUrl : null}
//           className={"w-9 h-9"}
//         />
//       </div>
