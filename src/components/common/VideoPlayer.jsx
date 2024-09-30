import React, { useEffect, useRef } from "react";
import YouTube from "react-youtube";

const VideoPlayer = ({ videoId }) => {
  const opts = {
    height: "450",
    width: "100%",
  };

  const ref = useRef();

  useEffect(() => {
    ref?.current?.internalPlayer?.stopVideo();
  }, []);

  return <YouTube videoId={videoId} opts={opts} ref={ref} />;
};

export default VideoPlayer;
