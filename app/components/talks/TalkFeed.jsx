"use client";

import { useQuery } from "@tanstack/react-query";
import Talk from "./TalkCard";
import { useSession } from "next-auth/react";

function TalkFeed() {
  const { data: session, status } = useSession();

  const talkQuery = useQuery({
    queryKey: ["talks"],
    queryFn: async () => {
      const response = await fetch("/api/talks/", {
        method: "GET",
        cache: "no-store",
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    },
  });

  if (!session) {
    return <div>Not authenticated</div>;
  }

  if (status === "loading") return <div>Loading...</div>;

  if (talkQuery.error) {
    return <div>Error Fetching Talks</div>;
  }

  if (talkQuery.isLoading) return <div>Loading...</div>;

  if (talkQuery.data) {
    return (
      <div>
        {data.map((talk) => (
          <Talk
            key={talk.id}
            talk={talk}
            owner={talk.owner}
            likes={talk.likes}
            dislikes={talk.dislikes}
          />
        ))}
      </div>
    );
  }
}

export default TalkFeed;
