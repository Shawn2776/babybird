"use client";

import Link from "next/link";
import { IoFolderOpenOutline, IoSettingsOutline } from "react-icons/io5";
import { useState } from "react";
import Friends from "./Friends";
import Following from "./Following";

function Feed({ children }) {
  const [followingActive, setFollowingActive] = useState(false);
  const [friendsActive, setFriendsActive] = useState(true);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="flex w-full">
        <div className="flex justify-around p-4 w-[90%]">
          <button
            onClick={() => {
              setFollowingActive(false);
              setFriendsActive(true);
            }}
            className="flex items-center justify-center w-full h-10 p-1 cursor-pointer hover:bg-gray-500 hover:text-black"
          >
            Friends
          </button>

          <button
            onClick={() => {
              setFollowingActive(true);
              setFriendsActive(false);
            }}
            className="flex items-center justify-center w-full h-10 p-1 cursor-pointer hover:bg-gray-500 hover:text-black"
          >
            Following
          </button>
        </div>

        <div className="flex justify-around p-2 w-[10%]">
          <div className="flex items-center justify-center w-full h-10 p-2 m-2 hover:bg-gray-500 hover:text-black hover:rounded-full">
            <Link href="#settings">
              <IoSettingsOutline className="text-2xl" />
            </Link>
          </div>
        </div>
      </div>
      <div className={friendsActive ? "" : "hidden"}>
        <Friends>{children}</Friends>
      </div>
      <div className={followingActive ? "" : "hidden"}>
        <Following>{children}</Following>
      </div>
    </div>
  );
}

export default Feed;
