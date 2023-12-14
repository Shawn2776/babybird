"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import defaultProfilePic from "../../../public/defaultProfilePic.jpg";
import ProfileTalk from "@/app/components/talks/ProfileTalkCard";

function Profile({ params }) {
  const { status } = useSession();
  const router = useRouter();
  const username = params.username;

  const [about, setAbout] = useState(true);

  const userQuery = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await fetch(
        `/api/user/:${username}?username=${username}`,
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

  const talkQuery = useQuery({
    queryKey: ["talksProfile"],
    queryFn: async () => {
      const response = await fetch(
        `/api/user/talks/:${username}?username=${username}`,
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

  // useEffect for handling redirection
  useEffect(() => {
    if (status !== "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading") return <div>Loading...</div>;

  if (userQuery.isLoading || talkQuery.isLoading) return <div>Loading...</div>;

  if (userQuery.data && talkQuery.data) {
    return (
      <div className="lg:max-w-2xl lg:mx-auto">
        <div className="flex items-center justify-between w-full py-1 pr-4 bg-white">
          <Link
            href={"/"}
            className="flex items-center gap-2 my-1 ml-4 text-xl font-bold"
          >
            <FaLongArrowAltLeft />
            {userQuery?.data?.name}
          </Link>
          <Link href={"/api/auth/signout?callbackUrl=/"} className="font-bold">
            Sign Out
          </Link>
        </div>
        <div className="w-full pt-4 pl-5 border">
          <Image
            src={
              userQuery?.data?.profilePic
                ? userQuery?.data.profilePic
                : defaultProfilePic
            }
            width={100}
            height={100}
            alt={`${userQuery?.data?.name}'s profile picture`}
            className="rounded-full"
            priority
          />
          <p className="mt-2 text-xl font-bold">
            {userQuery?.data?.name ? userQuery?.data?.name : ""}
          </p>
          <p className="mb-2">
            @{userQuery?.data?.username ? userQuery?.data?.username : ""}
          </p>
        </div>
        <hr />
        <div>
          {talkQuery?.data?.talks?.map((talk) => (
            <ProfileTalk
              key={talk.id}
              talk={talk}
              owner={talk.owner}
              likes={talk.likes}
              dislikes={talk.dislikes}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Profile;
