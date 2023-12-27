"use client";

import { Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

const AccountCard = () => {
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch("/api/userAccount/");

      if (!response.ok) {
        router.replace("/");
      }

      const data = await response.json();
      return data;
    },
  });

  if (userQuery.isLoading)
    return (
      <div className="flex justify-center w-full align-middle">
        <Spinner />
      </div>
    );

  if (userQuery.isError) return <div>Error fetching user xzy profile</div>;

  if (userQuery.isSuccess) {
    const user = userQuery.data;

    return <div className="w-full min-h-screen bg-neutral-700"></div>;
  }
};

export default AccountCard;
