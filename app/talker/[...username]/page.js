"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaLongArrowAltLeft } from "react-icons/fa";

function Talker({ params }) {
  const { status } = useSession();
  // const router = useRouter();
  const username = params.username;
  const newUsername = username[0].replace(":", "");

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch(
        `/api/user/username/?username=${newUsername}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    },
  });

  if (status === "loading") return <div>Loading...</div>;

  if (status === "unauthenticated") {
    return (
      <div>
        <p>Access Denied</p>
      </div>
    );
  }

  if (userQuery.isLoading) return <div>Loading...</div>;

  if (userQuery.error) return <div>{userQuery.error.message}</div>;

  return (
    <div>
      <div className="flex items-center justify-between w-full py-1 pr-4 bg-white">
        <Link
          href={"/"}
          className="flex items-center gap-2 my-1 ml-4 text-xl font-bold"
        >
          <FaLongArrowAltLeft />
          {userQuery?.data?.user?.name}
        </Link>
        <Link href={"/api/auth/signout?callbackUrl=/"} className="font-bold">
          Sign Out
        </Link>
      </div>
      <div className="w-full pt-4 ml-5">
        <Image
          src={`${userQuery?.data?.user?.profilePic}`}
          width={100}
          height={100}
          alt={""}
          className="rounded-full"
        />
        <p className="mt-2 text-xl font-bold">{userQuery?.data?.user?.name}</p>
        <p className="mb-2">@{userQuery?.data?.user?.username}</p>
      </div>
      <hr />
      <div className="flex px-2 mt-2 text-xl justify-evenly">
        <div>
          <p>Talks</p>
        </div>
        <div>
          <p>About</p>
        </div>
      </div>
    </div>
  );
}

export default Talker;
