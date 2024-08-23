import React from "react";

const CustomButton = ({ data }) => {
  const handleClick = () => {
    alert(`Button clicked for transaction: ${data.id}`);

    // You can perform any action you want with `data` here
  };

  return (
    <button
      onClick={handleClick}
      className="flex mx-auto text-black underline rounded-md"
    >
      View
    </button>
  );
};

export default CustomButton;
