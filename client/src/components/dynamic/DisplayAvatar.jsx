import React from "react";

const DisplayAvatar = ({ url, className }) => {
  return (
    <img className={`object-cover ${className} rounded-full`} src={url} alt="img" />
  );
};

export default DisplayAvatar;
