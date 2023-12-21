"use client";

import { useQuery } from "@tanstack/react-query";

const url = process.env.MAIN_URL;

export const Page = ({ params }) => {
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

    return <div>{user.name}</div>;
  }
};

