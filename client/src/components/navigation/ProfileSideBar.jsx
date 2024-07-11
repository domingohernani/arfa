import React from "react";
import { Link, NavLink } from "react-router-dom";

export const ProfileSideBar = () => {
  return (
    <aside class="top-0 left-0 border-r z-40 w-fit h-screen">
      <div class="h-full px-3 py-4 overflow-y-auto">
        <ul class="space-y-2 text-sm">
          <li>
            <NavLink
              to={"user-profile"}
              className={({ isActive }) =>
                isActive
                  ? "text-arfagreen flex items-center justify-center p-2 rounded-lg"
                  : "text-arfablack flex items-center justify-center p-2 rounded-lg"
              }
            >
              {({ isActive }) => (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Outline"
                    viewBox="0 0 25 25"
                    width="512"
                    height="512"
                    className="w-4 h-4"
                    fill={`${isActive ? "#0E9F6E" : "#111827"}`}
                  >
                    <path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z" />
                    <path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z" />
                  </svg>
                  <span class="ms-3 font-medium md:inline hidden">
                    Profile Information
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
                  ? "text-arfagreen flex items-center justify-center p-2 rounded-lg"
                  : "text-arfablack flex items-center justify-center p-2 rounded-lg"
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
                    fill={`${isActive ? "#0E9F6E" : "#111827"}`}
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
              to={"inbox"}
              className={({ isActive }) =>
                isActive
                  ? "text-arfagreen flex items-center justify-center p-2 rounded-lg"
                  : "text-arfablack flex items-center justify-center p-2 rounded-lg"
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
                    fill={`${isActive ? "#0E9F6E" : "#111827"}`}
                  >
                    <path d="m13.5,10.5c0,.828-.672,1.5-1.5,1.5s-1.5-.672-1.5-1.5.672-1.5,1.5-1.5,1.5.672,1.5,1.5Zm3.5-1.5c-.828,0-1.5.672-1.5,1.5s.672,1.5,1.5,1.5,1.5-.672,1.5-1.5-.672-1.5-1.5-1.5Zm-10,0c-.828,0-1.5.672-1.5,1.5s.672,1.5,1.5,1.5,1.5-.672,1.5-1.5-.672-1.5-1.5-1.5Zm17-5v12c0,2.206-1.794,4-4,4h-2.852l-3.848,3.18c-.361.322-.824.484-1.292.484-.476,0-.955-.168-1.337-.507l-3.749-3.157h-2.923c-2.206,0-4-1.794-4-4V4C0,1.794,1.794,0,4,0h16c2.206,0,4,1.794,4,4Zm-2,0c0-1.103-.897-2-2-2H4c-1.103,0-2,.897-2,2v12c0,1.103.897,2,2,2h3.288c.235,0,.464.083.645.235l4.048,3.41,4.171-3.416c.179-.148.404-.229.637-.229h3.212c1.103,0,2-.897,2-2V4Z" />
                  </svg>

                  <span class="flex-1 ms-3 whitespace-nowrap md:inline hidden">
                    Inbox
                  </span>
                  <span class="hidden md:inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-xs font-medium text-white bg-arfagreen rounded-full ">
                    3
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
