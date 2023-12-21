"use client";

import { useQuery } from "@tanstack/react-query";

const url = process.env.MAIN_URL;

export default function Page({ params }) {
  const username = params.username;

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch("/api/userAccount/", {
        method: "GET",
        cache: "no-store",
      });

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

    return <div>{user.name}</div>;
  }
}
