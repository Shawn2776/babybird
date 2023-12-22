"use client";

import { useState } from "react";
import Friends from "./Friends";
import Following from "./Following";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const Feed = ({ children }) => {
  const router = useRouter();
  const session = useSession();
  if (!session) {
    router.replace("/");
  }

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch("/api/userAccount/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("response not ok", response);
        router.replace("/");
      }

      const data = await response.json();
      console.log("data", data);
      return data;
    },
  });
  const [followingActive, setFollowingActive] = useState(false);
  const [friendsActive, setFriendsActive] = useState(true);

  if (userQuery.isLoading) {
    return <div className="w-full h-screen bg-[#18191A]">Loading...</div>;
  }

  if (userQuery.isError) {
    return <div className="w-full h-screen bg-[#18191A]">Error...</div>;
  }

  if (userQuery.isSuccess) {
    return (
      <div className="bg-[rgb(24,25,26)] ml-0 mr-0 w-full dark">
        <Navbar shouldHideOnScroll className="bg-[#18191A] dark w-full">
          <NavbarContent as={"div"}>
            <Dropdown
              placement="bottom-start"
              className="dark bg-neutral-600 hover:cursor-pointer"
              backdrop="blur"
            >
              <DropdownTrigger>
                <Avatar
                  src={userQuery?.data?.profilePic}
                  className="hover:border-white hover:cursor-pointer"
                />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Profile Actions"
                variant="bordered"
                className="dark"
              >
                <DropdownItem
                  key="profile"
                  className="gap-2 text-white h-14 dark"
                >
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{userQuery?.data?.username}</p>
                </DropdownItem>
                <DropdownItem key="settings" className="text-white">
                  <Link
                    href={`/UserAccount/${userQuery?.data?.username}?${userQuery?.data?.username}`}
                  >
                    My Account
                  </Link>
                </DropdownItem>
                {/* <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem> */}
                <DropdownItem key="help_and_feedback" className="text-white">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  className="text-danger"
                  href="/api/auth/signout"
                >
                  Sign out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
          <NavbarContent justify="center" className="w-full">
            <div className="flex w-full justify-evenly">
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

              <NavbarItem className="w-full">
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
};

export default Feed;
