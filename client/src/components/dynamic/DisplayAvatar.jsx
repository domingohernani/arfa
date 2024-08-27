import React from "react";

const DisplayAvatar = ({ url, className }) => {
  return (
    <>
      {url === null ? (
        <div
          className={`object-cover ${className} text-sm font-semibold rounded-full bg-gray-500 text-white flex justify-center items-center`}
        >
          HD
        </div>
      ) : (
        <img
          className={`object-cover ${className} rounded-full`}
          src={url}
          alt="img"
        />
      )}
    </>
  );
};

export default DisplayAvatar;
