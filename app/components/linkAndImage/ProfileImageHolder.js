"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import defaultProfilePic from "../../../public/defaultProfilePic.jpg";
import { useQuery } from "@tanstack/react-query";

const defaultImage = defaultProfilePic;

function ProfileImageHolder({ link }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["user2"],
    queryFn: async () => {
      const response = await fetch("/api/user2/", {
        method: "GET",
        cache: "no-store",
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }

      return null;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (data) {
    return (
      <>
        <Link href={"/talker/"}>
          {data?.user?.profilePic ? (
            <Image
              src={`${data?.user?.profilePic}`}
              alt="profile image"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <Image
              src={defaultImage}
              alt="profile image"
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
        </Link>
      </>
    );
  }
}

export default ProfileImageHolder;