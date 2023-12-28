import React from "react";

const ReadableDate = (createdAt) => {
  const pastDate = new Date(createdAt);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate - pastDate);

  // Convert time difference from milliseconds to hours
  const hours = diffTime / (1000 * 60 * 60);

  let timePassed;
  if (hours > 24) {
    const days = Math.ceil(hours / 24);
    timePassed = days > 1 ? days + " days ago" : days + " day ago";
  } else {
    timePassed =
      Math.ceil(hours) <= 1
        ? "Just now"
        : Math.ceil(hours) > 1
        ? Math.ceil(hours) + " hours ago"
        : Math.ceil(hours) + " hour ago";
  }

  // Custom format for the date to abbreviate months and format time
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  let readableDate = pastDate.toLocaleString("en-US", options);
  readableDate = readableDate.replace("AM", "am").replace("PM", "pm");

  return { readableDate, timePassed };
};

export default ReadableDate;
