import React from "react";

function ShowModel({path}) {
  return (
    <model-viewer
      id="chair"
      ar
      loading="eager"
      camera-controls
      touch-action="pan-y"
      auto-rotate
      src={path}
      shadow-intensity="1"
       camera-orbit="0deg 90deg 2.9m"
    ></model-viewer>
  );
}

export default ShowModel;
