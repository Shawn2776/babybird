import { useQuery } from "@tanstack/react-query";
import React from "react";
import Talk from "./profileTalks/TalkCard";
import Image from "next/image";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Link from "next/link";

export const ProfileCard = (user) => {
  if (Object.keys(user).length === 0 && user.constructor === Object) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  console.log("user in ProfileCard", user);

  const { name, username, profilePic, talks } = user.userProfile;

  return (
    <>
      <Link href={`/`}>
        <div className="flex items-center gap-4 py-2 pl-4 text-xl">
          <FaLongArrowAltLeft />
          <div>{name}</div>
        </div>
      </Link>
      {talks?.map((talk) => {
        return (
          <div key={talk.id}>
            <Talk
              talk={talk}
              username={username}
              name={name}
              profilePic={profilePic}
            />
          </div>
        );
      })}
    </>
  );
};

export default ProfileCard;
