import React from "react";
import Talk from "./profileTalks/TalkCard";

import { FaLongArrowAltLeft } from "react-icons/fa";
import Link from "next/link";

export const ProfileCard = (user) => {
  if (Object.keys(user).length === 0 && user.constructor === Object) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const { name, username, profilePic, talks } = user.userProfile;

  return (
    <>
      <Link href={`/`}>
        <div className="flex items-center gap-4 py-2 pl-4 text-xl text-white">
          <FaLongArrowAltLeft />
          <div>{name}</div>
        </div>
      </Link>
      <hr />
      {talks?.map((talk) => {
        return (
          <div key={talk.id} className="max-w-2xl mx-auto mt-2">
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
