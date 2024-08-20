import React from "react";

const CustomButton = ({ data }) => {
  const handleClick = () => {
    alert(`Button clicked for transaction: ${data.transactionNumber}`);
    // You can perform any action you want with `data` here
  };

  return (
    <button
      onClick={handleClick}
      className=" text-black rounded-md underline flex  mx-auto"
    >
      View
    </button>
  );
};

export default CustomButton;
