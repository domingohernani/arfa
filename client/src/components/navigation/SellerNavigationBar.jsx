import React, { useEffect, useState } from "react";
import logo from "../../assets/logos/logo_black.svg";
import profile from "../../assets/icons/profile-black.svg";
import cart from "../../assets/icons/cart.svg";
import search from "../../assets/icons/search.svg";
import heart from "../../assets/icons/heart-black.svg";
import { Link } from "react-router-dom";
import { NotificationDrawer } from "../dynamic/NotificationDrawer";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import DisplayAvatar from "../dynamic/DisplayAvatar";
import { getLoggedShopInfo, getUserInfo } from "../../firebase/user";
import { useStore } from "../../stores/useStore";
function SellerNavigationBar() {
  const { loggedUser, setLoggedUser } = useStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getLoggedShopInfo();
        setLoggedUser(user);
      } catch (error) {
        console.error("Error fetching logged in user ", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="flex justify-between px-6 py-3">
      <img src={logo} alt="ARFA" className="w-20 h-auto" />

      <div className="flex items-center justify-end col-start-11 gap-5">
        <div className="flex gap-2">
          <Link to={"inbox"} className="">
            <ChatBubbleBottomCenterIcon
              className="w-5 h-5 ml-auto cursor-pointer text-arfablack "
              aria-hidden="true"
            />
          </Link>
          <NotificationDrawer />
        </div>
        <div className="flex items-center w-48">
          <DisplayAvatar
            url={loggedUser && loggedUser.profileUrl ? loggedUser.profileUrl : null}
            className={"w-8 h-8 mr-2"}
          />
          <span className="flex-1 text-sm font-semibold truncate">
            {loggedUser && loggedUser.name}
          </span>
        </div>
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
