"use client";

import ProfileCard from "@/components/talkComponents/ProfileCard";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const url = process.env.MAIN_URL;

export default function Page({ params }) {
  const username = params.username;

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await fetch(
        `${url}/api/userProfile/${username}?${username}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (!response.ok) {
        return "Error fetching user profile";
      }

      const data = await response.json();
      return data;
    },
  });

  if (profileQuery.isLoading) return <div>Loading...</div>;

  if (profileQuery.isError) return <div>Error fetching user profile</div>;

  if (profileQuery.isSuccess) {
    const user = profileQuery.data;

    return (
      <>
        <ProfileCard userProfile={user} />
      </>
    );
  }
}
