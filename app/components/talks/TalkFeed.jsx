"use client";

import { useQuery } from "@tanstack/react-query";
import Talk from "./TalkCard";

export const TalkFeed = () => {
  const talkQuery = useQuery({
    queryKey: ["talks"],
    queryFn: async () => {
      const response = await fetch("/api/talks/", {
        method: "GET",
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    },
  });

  return (
    <>
      {talkQuery?.data?.map((talk) => (
        <div key={talk.id}>
          <Talk talk={talk} owner={talk.owner} />
        </div>
      ))}
    </>
  );
};

export default TalkFeed;
