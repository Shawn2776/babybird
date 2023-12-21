import React from "react";

function EmbedPlayer({ src }) {
  return (
    <>
      <video
        controls
        width="100%"
        className="bg-black rounded-md shadow-md max-h-[75vh] shadow-black py-2"
      >
        <source src={src} type="video/webm" />

        <source src={src} type="video/mp4" />
      </video>
    </>
  );
}

export default EmbedPlayer;
