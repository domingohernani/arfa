import React from "react";

const DisplayAvatar = ({ url, className, name }) => {
  return (
    <>
      {url === null || url === "" ? (
        <div>
          <div
            className={`object-cover ${className} text-sm font-semibold border rounded-full bg-gray-400 text-white flex justify-center items-center`}
          >
            {name[0]}
          </div>
        </div>
      ) : (
        <img
          className={`object-cover ${className} rounded-full border`}
          src={url}
          alt="img"
        />
      )}
    </>
  );
};

export default DisplayAvatar;
