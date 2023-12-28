"use client";

import AccountCard from "@/components/accountComponents/AccountCard";
import { Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page({ params }) {
  const session = useSession();

  if (!session || session?.status === "unauthenticated") {
    redirect("/");
  }
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch("/api/userAccount/", {
        method: "GET",
        cache: "no-store",
      });

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

  if (userQuery.isError) return <div>Error fetching user abc profile</div>;

  if (userQuery.isSuccess) {
    const user = userQuery.data;

    return (
      <div className="bg-[#222] min-h-screen max-w-4xl mx-auto w-full text-white">
        <AccountCard user={user} />
      </div>
    );
  }
}
