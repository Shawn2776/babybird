"use client";

import AccountCard from "@/components/accountComponents/AccountCard";
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

  if (userQuery.isLoading) return <div>Loading...</div>;

  if (userQuery.isError) return <div>Error fetching user abc profile</div>;

  if (userQuery.isSuccess) {
    const user = userQuery.data;

    return (
      <div className="bg-[#18191A] min-h-screen w-full text-white">
        <AccountCard user={user} />
      </div>
    );
  }
}
