import React from "react";
import { Link, NavLink } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";

export const SellerSideBar = () => {
  const logout = () => {
    try {
      doSignOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside class="top-0 left-0 z-10 w-fit h-screen">
      <div class="h-full px-3 py-4 overflow-y-auto">
        <ul class="space-y-2 text-sm">
          <li>
            <NavLink
              to={"dashboard"}
              className={({ isActive }) =>
                isActive
                  ? "text-white flex items-center justify-center p-2 md:pr-6 rounded-lg bg-arfagreen"
                  : "text-arfablack flex items-center justify-center p-2 md:pr-6 rounded-lg"
              }
            >
              {({ isActive }) => (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Outline"
                    viewBox="0 0 24 24"
                    width="512"
                    height="512"
                    className="w-4 h-4 text-arfagreen "
                    fill={`${isActive ? "white" : "#111827"}`}
                  >
                    <path d="M18.581,2.14,12.316.051a1,1,0,0,0-.632,0L5.419,2.14A4.993,4.993,0,0,0,2,6.883V12c0,7.563,9.2,11.74,9.594,11.914a1,1,0,0,0,.812,0C12.8,23.74,22,19.563,22,12V6.883A4.993,4.993,0,0,0,18.581,2.14ZM20,12c0,5.455-6.319,9.033-8,9.889-1.683-.853-8-4.42-8-9.889V6.883A3,3,0,0,1,6.052,4.037L12,2.054l5.948,1.983A3,3,0,0,1,20,6.883Z" />
                    <path d="M15.3,8.3,11.112,12.5,8.868,10.16a1,1,0,1,0-1.441,1.386l2.306,2.4a1.872,1.872,0,0,0,1.345.6h.033a1.873,1.873,0,0,0,1.335-.553l4.272-4.272A1,1,0,0,0,15.3,8.3Z" />
                  </svg>
                  <span class="flex-1 ms-3 whitespace-nowrap md:inline hidden">
                    Dashboard
                  </span>
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"order"}
              className={({ isActive }) =>
                isActive
                  ? "text-white flex items-center justify-center p-2 md:pr-6 rounded-lg bg-arfagreen"
                  : "text-arfablack flex items-center justify-center p-2 md:pr-6 rounded-lg"
              }
            >
              {({ isActive }) => (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_1"
                    data-name="Layer 1"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-arfagreen"
                    fill={`${isActive ? "white" : "#111827"}`}
                  >
                    <path d="m22,9.184v-1.184C22,3.589,18.411,0,14,0h-4C5.589,0,2,3.589,2,8v1.184c-1.161.414-2,1.514-2,2.816v5.5c0,1.557.795,2.93,2,3.738v1.762c0,.552.448,1,1,1s1-.448,1-1v-1.051c.166.019.329.051.5.051h15c.171,0,.334-.032.5-.051v1.051c0,.552.448,1,1,1s1-.448,1-1v-1.762c1.205-.808,2-2.182,2-3.738v-5.5c0-1.302-.839-2.402-2-2.816ZM10,2h4c3.309,0,6,2.691,6,6v1.184c-1.161.414-2,1.514-2,2.816v2H6v-2c0-1.302-.839-2.402-2-2.816v-1.184c0-3.309,2.691-6,6-6Zm-6,17.95c-1.14-.232-2-1.242-2-2.45v-5.5c0-.551.449-1,1-1s1,.449,1,1v7.95Zm2,.05v-4h12v4H6Zm16-2.5c0,1.208-.86,2.217-2,2.45v-7.95c0-.551.449-1,1-1s1,.449,1,1v5.5Z" />
                  </svg>
                  <span class="flex-1 ms-3 whitespace-nowrap md:inline hidden">
                    Order
                  </span>
                </>
              )}

              {/* <span class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                Pro
              </span> */}
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"product"}
              className={({ isActive }) =>
                isActive
                  ? "text-white flex items-center justify-center p-2 md:pr-6 rounded-lg bg-arfagreen"
                  : "text-arfablack flex items-center justify-center p-2 md:pr-6 rounded-lg"
              }
            >
              {({ isActive }) => (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Outline"
                    viewBox="0 0 24 24"
                    width="512"
                    height="512"
                    className="w-4 h-4 text-arfagreen "
                    fill={`${isActive ? "white" : "#111827"}`}
                  >
                    <circle cx="5.5" cy="15.5" r="1.5" />
                    <path d="M19,3H5A5.006,5.006,0,0,0,0,8v8a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V8A5.006,5.006,0,0,0,19,3ZM5,5H19a3,3,0,0,1,3,3H2A3,3,0,0,1,5,5ZM19,19H5a3,3,0,0,1-3-3V10H22v6A3,3,0,0,1,19,19Z" />
                  </svg>
                  <span class="flex-1 ms-3 whitespace-nowrap md:inline hidden">
                    Product
                  </span>
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"category"}
              className={({ isActive }) =>
                isActive
                  ? "text-white flex items-center justify-center p-2 md:pr-6 rounded-lg bg-arfagreen"
                  : "text-arfablack flex items-center justify-center p-2 md:pr-6 rounded-lg"
              }
            >
              {({ isActive }) => (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Outline"
                    viewBox="0 0 24 24"
                    width="512"
                    height="512"
                    className="w-4 h-4 text-arfagreen "
                    fill={`${isActive ? "white" : "#111827"}`}
                  >
                    <path d="M18.581,2.14,12.316.051a1,1,0,0,0-.632,0L5.419,2.14A4.993,4.993,0,0,0,2,6.883V12c0,7.563,9.2,11.74,9.594,11.914a1,1,0,0,0,.812,0C12.8,23.74,22,19.563,22,12V6.883A4.993,4.993,0,0,0,18.581,2.14ZM20,12c0,5.455-6.319,9.033-8,9.889-1.683-.853-8-4.42-8-9.889V6.883A3,3,0,0,1,6.052,4.037L12,2.054l5.948,1.983A3,3,0,0,1,20,6.883Z" />
                    <path d="M15.3,8.3,11.112,12.5,8.868,10.16a1,1,0,1,0-1.441,1.386l2.306,2.4a1.872,1.872,0,0,0,1.345.6h.033a1.873,1.873,0,0,0,1.335-.553l4.272-4.272A1,1,0,0,0,15.3,8.3Z" />
                  </svg>
                  <span class="flex-1 ms-3 whitespace-nowrap md:inline hidden">
                    Category
                  </span>
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"customer"}
              className={({ isActive }) =>
                isActive
                  ? "text-white flex items-center justify-center p-2 md:pr-6 rounded-lg bg-arfagreen"
                  : "text-arfablack flex items-center justify-center p-2 md:pr-6 rounded-lg"
              }
            >
              {({ isActive }) => (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Outline"
                    viewBox="0 0 24 24"
                    width="512"
                    height="512"
                    className="w-4 h-4 text-arfagreen "
                    fill={`${isActive ? "white" : "#111827"}`}
                  >
                    <path d="M18.581,2.14,12.316.051a1,1,0,0,0-.632,0L5.419,2.14A4.993,4.993,0,0,0,2,6.883V12c0,7.563,9.2,11.74,9.594,11.914a1,1,0,0,0,.812,0C12.8,23.74,22,19.563,22,12V6.883A4.993,4.993,0,0,0,18.581,2.14ZM20,12c0,5.455-6.319,9.033-8,9.889-1.683-.853-8-4.42-8-9.889V6.883A3,3,0,0,1,6.052,4.037L12,2.054l5.948,1.983A3,3,0,0,1,20,6.883Z" />
                    <path d="M15.3,8.3,11.112,12.5,8.868,10.16a1,1,0,1,0-1.441,1.386l2.306,2.4a1.872,1.872,0,0,0,1.345.6h.033a1.873,1.873,0,0,0,1.335-.553l4.272-4.272A1,1,0,0,0,15.3,8.3Z" />
                  </svg>
                  <span class="flex-1 ms-3 whitespace-nowrap md:inline hidden">
                    Customer
                  </span>
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"report"}
              className={({ isActive }) =>
                isActive
                  ? "text-white flex items-center justify-center p-2 md:pr-6 rounded-lg bg-arfagreen"
                  : "text-arfablack flex items-center justify-center p-2 md:pr-6 rounded-lg"
              }
            >
              {({ isActive }) => (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Outline"
                    viewBox="0 0 24 24"
                    width="512"
                    height="512"
                    className="w-4 h-4 text-arfagreen "
                    fill={`${isActive ? "white" : "#111827"}`}
                  >
                    <path d="M18.581,2.14,12.316.051a1,1,0,0,0-.632,0L5.419,2.14A4.993,4.993,0,0,0,2,6.883V12c0,7.563,9.2,11.74,9.594,11.914a1,1,0,0,0,.812,0C12.8,23.74,22,19.563,22,12V6.883A4.993,4.993,0,0,0,18.581,2.14ZM20,12c0,5.455-6.319,9.033-8,9.889-1.683-.853-8-4.42-8-9.889V6.883A3,3,0,0,1,6.052,4.037L12,2.054l5.948,1.983A3,3,0,0,1,20,6.883Z" />
                    <path d="M15.3,8.3,11.112,12.5,8.868,10.16a1,1,0,1,0-1.441,1.386l2.306,2.4a1.872,1.872,0,0,0,1.345.6h.033a1.873,1.873,0,0,0,1.335-.553l4.272-4.272A1,1,0,0,0,15.3,8.3Z" />
                  </svg>
                  <span class="flex-1 ms-3 whitespace-nowrap md:inline hidden">
                    Report
                  </span>
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"inbox"}
              className={({ isActive }) =>
                isActive
                  ? "text-white flex items-center justify-center p-2 md:pr-6 rounded-lg bg-arfagreen"
                  : "text-arfablack flex items-center justify-center p-2 md:pr-6 rounded-lg"
              }
            >
              {({ isActive }) => (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_1"
                    data-name="Layer 1"
                    viewBox="0 0 24 24"
                    width="512"
                    height="512"
                    className="w-4 h-4 text-arfagreen "
                    fill={`${isActive ? "white" : "#111827"}`}
                  >
                    <path d="m13.5,10.5c0,.828-.672,1.5-1.5,1.5s-1.5-.672-1.5-1.5.672-1.5,1.5-1.5,1.5.672,1.5,1.5Zm3.5-1.5c-.828,0-1.5.672-1.5,1.5s.672,1.5,1.5,1.5,1.5-.672,1.5-1.5-.672-1.5-1.5-1.5Zm-10,0c-.828,0-1.5.672-1.5,1.5s.672,1.5,1.5,1.5,1.5-.672,1.5-1.5-.672-1.5-1.5-1.5Zm17-5v12c0,2.206-1.794,4-4,4h-2.852l-3.848,3.18c-.361.322-.824.484-1.292.484-.476,0-.955-.168-1.337-.507l-3.749-3.157h-2.923c-2.206,0-4-1.794-4-4V4C0,1.794,1.794,0,4,0h16c2.206,0,4,1.794,4,4Zm-2,0c0-1.103-.897-2-2-2H4c-1.103,0-2,.897-2,2v12c0,1.103.897,2,2,2h3.288c.235,0,.464.083.645.235l4.048,3.41,4.171-3.416c.179-.148.404-.229.637-.229h3.212c1.103,0,2-.897,2-2V4Z" />
                  </svg>

                  <span class="flex-1 ms-3 whitespace-nowrap md:inline hidden">
                    Inbox
                  </span>
                  <span
                    class={`hidden ${
                      isActive
                        ? "bg-white text-black"
                        : "bg-arfagreen text-white"
                    }  md:inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-xs font-medium   rounded-full`}
                  >
                    4
                  </span>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};
