"use client";

import Link from "next/link";
import { IoFolderOpenOutline, IoSettingsOutline } from "react-icons/io5";
import { useState } from "react";
import Friends from "./Friends";
import Following from "./Following";
import TalkForm from "./talkForm/TalkForm";
import { Button, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";

function Feed({ children }) {
  const [followingActive, setFollowingActive] = useState(false);
  const [friendsActive, setFriendsActive] = useState(true);

  return (
    <div className="bg-[rgb(24,25,26)] ml-0">
      <Navbar shouldHideOnScroll className="bg-[#18191A] dark w-full">
        <NavbarContent className="w-full">
          <div className="flex w-full justify-evenly">
            <div className="w-full">
              <NavbarItem className="w-full">
                <Button
                  onClick={() => {
                    setFollowingActive(false);
                    setFriendsActive(true);
                  }}
                  className={`${
                    friendsActive
                      ? "bg-[#18191A] text-cambridge underline-offset-8 underline decoration-4 decoration-cambridge"
                      : "bg-[#18191A] hover:bg-bittersweet hover:text-white transition duration-300"
                  } items-center flex justify-center w-full h-10 p-1 cursor-pointer text-2xl transition duration-300`}
                >
                  Friends
                </Button>
              </NavbarItem>
            </div>
            <div className="w-full">
              <NavbarItem>
                <Button
                  onClick={() => {
                    setFollowingActive(true);
                    setFriendsActive(false);
                  }}
                  className={`${
                    followingActive
                      ? "bg-[#18191A] text-cambridge underline-offset-8 underline decoration-4 decoration-cambridge"
                      : "bg-[#18191A] hover:bg-bittersweet hover:text-white transition duration-300"
                  } items-center flex justify-center w-full h-10 p-1 cursor-pointer text-2xl transition duration-300"
                  } items-center flex justify-center w-full h-10 p-1 cursor-pointer text-2xl transition duration-300`}
                >
                  Following
                </Button>
              </NavbarItem>
            </div>
          </div>
        </NavbarContent>
      </Navbar>
      <div className={friendsActive ? "" : "hidden"}>
        <Friends>{children}</Friends>
      </div>
      <div className={followingActive ? "" : "hidden"}>
        <Following>{children}</Following>
      </div>
    </div>
    // <div className="flex flex-col w-full min-h-screen px-1 md:pr-0 bg-[rgb(24,25,26)] mx-auto">
    //   <div className="flex w-full bg-[rgb(24,25,26)] ">
    //     <div className="flex justify-around p-4 w-[90%]">
    //       <button
    //         onClick={() => {
    //           setFollowingActive(false);
    //           setFriendsActive(true);
    //         }}
    //         className={
    //           friendsActive
    //             ? "flex items-center justify-center w-full h-10 p-1 cursor-pointer hover:bg-bittersweet hover:text-white transition duration-300 text-zomp underline-offset-8 font-extrabold text-lg decoration-4 underline"
    //             : "flex items-center justify-center w-full h-10 p-1 cursor-pointer hover:bg-gray-500 hover:text-black text-slate-600 transition duration-300"
    //         }
    //       >
    //         Friends
    //       </button>

    //       <button
    //         onClick={() => {
    //           setFollowingActive(true);
    //           setFriendsActive(false);
    //         }}
    //         className={
    //           followingActive
    //             ? "flex items-center justify-center w-full h-10 p-1 cursor-pointer hover:bg-bittersweet hover:text-white transition duration-300 text-zomp underline-offset-8 font-extrabold text-lg decoration-4 underline"
    //             : "flex items-center justify-center w-full h-10 p-1 cursor-pointer hover:bg-gray-500 hover:text-black text-slate-600 transition duration-300"
    //         }
    //       >
    //         Following
    //       </button>
    //     </div>

    //     <div className="flex justify-around p-2 w-[10%]">
    //       <div className="flex items-center justify-center w-full h-10 p-2 m-2 hover:bg-gray-500 hover:text-black hover:rounded-full">
    //         <Link href="#settings">
    //           <IoSettingsOutline className="text-2xl text-slate-600" />
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    //   <div className={friendsActive ? "" : "hidden"}>
    //     <Friends>{children}</Friends>
    //   </div>
    //   <div className={followingActive ? "" : "hidden"}>
    //     <Following>{children}</Following>
    //   </div>
    // </div>
  );
}

export default Feed;
