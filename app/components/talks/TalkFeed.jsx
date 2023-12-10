"use client";

import React, { useEffect, useState } from "react";
import Talk from "./Talk";

function TalkFeed() {
  const [talks, setTalks] = useState([]);

  useEffect(() => {
    async function fetchTalks() {
      const response = await fetch("/api/talks", {
        method: "GET",
        cache: "no-store",
      });
      if (response.ok) {
        const data = await response.json();
        setTalks(data);
      }
    }

    fetchTalks();
  }, []);

  return (
    <div>
      {talks.map((talk) => (
        <Talk key={talk.id} talk={talk} owner={talk.owner} />
      ))}
    </div>
  );
}

export default TalkFeed;
