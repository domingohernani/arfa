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
    <div className="flex items-center gap-2 text-sm lg:pl-8 md:pl-4 text-arfablack">
      <Link to={"/"}>
        <span className="font-normal cursor-pointer text-arfablack hover:text-arfagreen">
          Home
        </span>
      </Link>
      {formattedSegments.map((path, index) => {
        return (
          <>
            <img src={greaterthan} className="w-2 h-2" />
            {index != 1 ? (
              <Link to={`/catalog`}>
                <span className="font-normal cursor-pointer text-arfablack hover:text-arfagreen">
                  {path}
                </span>
              </Link>
            ) : (
              <span className="font-normal cursor-pointer text-arfablack hover:text-arfagreen">
                {path}
              </span>
            )}
          </>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
