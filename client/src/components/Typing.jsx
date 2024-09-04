import React from "react";

const Typing = () => {
  return (
    <div className="relative flex items-center justify-center w-20 h-8 p-2 ml-2 bg-gray-200 rounded-md">
      <div className="float-left w-2 h-2 mx-1 bg-gray-500 rounded-full opacity-0 animate-[loadingFade_1s_infinite]"></div>
      <div className="float-left w-2 h-2 mx-1 bg-gray-500 rounded-full opacity-0 animate-[loadingFade_1s_infinite_0.2s]"></div>
      <div className="float-left w-2 h-2 mx-1 bg-gray-500 rounded-full opacity-0 animate-[loadingFade_1s_infinite_0.4s]"></div>
    </div>
  );
};

export default Typing;
