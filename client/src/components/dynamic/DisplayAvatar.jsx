import React from "react";
import defaultImg from "../../assets/icons/default.png";

const DisplayAvatar = ({ url, className, name }) => {
  return (
    <>
      {!url ? (
        <div>
          <div
            className={`object-cover ${className} text-sm font-semibold rounded-full bg-gray-400 text-white flex justify-center items-center`}
          >
            <img src={defaultImg} />
          </div>
        </div>
      ) : (
        <img
          className={`object-cover ${className} rounded-full border`}
          src={url}
        />
      )}
    </>
  );
};

export default DisplayAvatar;
