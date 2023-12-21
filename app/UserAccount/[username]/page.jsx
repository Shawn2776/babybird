"use client";

import ProfileCard from "@/components/talkComponents/ProfileCard";
import AccountCard from "@/components/talkComponents/accountTalks/AccountCard";
import Talk from "@/components/talkComponents/accountTalks/TalkCard";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const url = process.env.MAIN_URL;

export default function Page({ params }) {
  const username = params.username;

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch("/api/userAccount/");

      if (!response.ok) {
        router.replace("/Login");
      }

      const data = await response.json();
      return data;
    },
  });

  if (userQuery.isLoading) return <div>Loading...</div>;

  if (userQuery.isError) return <div>Error fetching user profile</div>;

  if (userQuery.isSuccess) {
    const user = userQuery.data;

    return (
      <>
        <AccountCard />
        {/* <Talk /> */}
      </>
    );
  }
}
