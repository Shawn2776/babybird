import React from "react";

function EmbedPlayer({ src }) {
  return (
    <>
      <video
        controls
        width="100%"
        className="rounded-md shadow-md shadow-black"
      >
        <source src={src} type="video/webm" />

        <source src={src} type="video/mp4" />
      </video>
    </>
  );
}

export default EmbedPlayer;
