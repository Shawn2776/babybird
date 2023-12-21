import React from "react";

const readableDate = (createdAt) => {
  const readableDate = new Date(createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return readableDate;
};

export default readableDate;
