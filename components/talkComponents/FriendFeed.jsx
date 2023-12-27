"use client";

import { useQuery } from "@tanstack/react-query";
import Talk from "./TalkCard";
import SkeletonComp from "../ui/SkeletonComp";
import TalkForm from "./talkForm/TalkForm";

const url = process.env.MAIN_URL;

export const FriendFeed = () => {
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

  if (talkQuery.isLoading)
    return (
      <div className="h-screen bg-neutral-700 flex justify-center align-middle">
        <SkeletonComp />
      </div>
    );

  if (talkQuery.isError) return <div>Error fetching talks</div>;

  if (talkQuery.isSuccess) {
    return (
      <>
        <TalkForm talkQuery={talkQuery} />
        {talkQuery?.data?.map((talk) => (
          <div key={talk.id}>
            <Talk talk={talk} owner={talk.owner} />
          </div>
        ))}
      </>
    );
  }
};

export default FriendFeed;
