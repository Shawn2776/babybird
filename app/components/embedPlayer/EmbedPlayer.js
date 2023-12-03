import React from "react";

function EmbedPlayer({ src }) {
  return (
    <iframe
      width="100%"
      height="315"
      src={src}
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
      allowFullScreen
      className="border-0"
    ></iframe>
  );
}

export default EmbedPlayer;
