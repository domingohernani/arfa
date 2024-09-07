import React from "react";

const VideoPlayer = ({ url }) => {
  return (
    <video width="100%" controls className="border rounded">
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
