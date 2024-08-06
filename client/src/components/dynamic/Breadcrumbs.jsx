import React from "react";
import { Link, useLocation } from "react-router-dom";
import greaterthan from "../../assets/icons/greater-than.svg";

const Breadcrumbs = () => {
  const formatSegment = (segment) => {
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  const formattedSegments = pathSegments.map((segment) =>
    formatSegment(segment)
  );

  return (
    <nav aria-label="breadcrumb" className="w-full max-w-full overflow-x-auto text-arfablack">
      <ol className="flex items-center px-4 py-2 rounded-md flex-nowrap bg-blue-gray-50 bg-opacity-60">
        <li className="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-light-blue-500">
          <Link to={"/"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="black"
            >
              <path d="M19,24H5c-2.757,0-5-2.243-5-5V9.724c0-1.665,.824-3.215,2.204-4.145L9.203,.855c1.699-1.146,3.895-1.146,5.594,0l7,4.724c1.379,.93,2.203,2.479,2.203,4.145v9.276c0,2.757-2.243,5-5,5ZM12,1.997c-.584,0-1.168,.172-1.678,.517L3.322,7.237c-.828,.558-1.322,1.487-1.322,2.486v9.276c0,1.654,1.346,3,3,3h14c1.654,0,3-1.346,3-3V9.724c0-.999-.494-1.929-1.321-2.486L13.678,2.514c-.51-.345-1.094-.517-1.678-.517Z" />
            </svg>
          </Link>
        </li>
        {formattedSegments.map((path, index) => {
          if (path === "Item" || path === "Category") return null;
          return (
            <li
              key={index}
              className="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-arfablack text-blue-gray-900 hover:text-light-blue-500"
            >
              <span className="mx-2 font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500">
                /
              </span>
              <Link
                to={"/"}
                className="truncate overflow-hidden text-arfablack whitespace-nowrap max-w-[100px] sm:max-w-full"
              >
                <span className="font-normal truncate text-arfablack">
                  {path}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
