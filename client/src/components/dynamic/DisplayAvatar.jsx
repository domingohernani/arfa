import React from "react";

const DisplayAvatar = ({ url, className, name }) => {
  return (
    <>
      {!url ? (
        <div>
          <div
            className={`object-cover ${className} text-sm font-semibold rounded-full bg-gray-400 text-white flex justify-center items-center`}
          >
            <img
              src={
                "https://i0.wp.com/www.computingtech.net/wp-content/uploads/2016/08/generic.png?resize=1810%2C2560&ssl=1"
              }
            />
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
