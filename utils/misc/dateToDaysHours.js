import React from "react";

function dateToDaysHours(date) {
  const days = Math.floor(date / (1000 * 60 * 60 * 24));
  const hours = Math.floor((date % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return { days, hours };
}

export default dateToDaysHours;
