"use client";

import React, { useEffect, useState } from "react";
import Talk2 from "./Talk2";

function TalkFeed2() {
  const [talks, setTalks] = useState([]);

  useEffect(() => {
    async function fetchTalks() {
      const response = await fetch("https://www.utalkto.com/api/talks", {
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
        <Talk2 key={talk.id} talk={talk} owner={talk.owner} />
      ))}
    </div>
  );
}

export default TalkFeed2;
