import React from "react";
import "@google/model-viewer";

function ShowModel({path}) {
  console.log('the model rendered');
  return (
    <model-viewer
      id="chair"
      ar
      // ar-scale="fixed"
      loading="eager"
      camera-controls
      touch-action="pan-y"
      auto-rotate
      src={path}
      shadow-intensity="1"
    ></model-viewer>
  );
}

export default ShowModel;
