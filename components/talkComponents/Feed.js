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
  Image,
  DropdownSection,
  User,
  Select,
  SelectItem,
  Spinner,
  Input,
  NavbarBrand,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ThemeProvider } from "@/utils/providers/nextUI/ThemeProvider";
import { ThemeSwitcher } from "../ui/ThemeSwitcher";
import { IoSearchCircleOutline } from "react-icons/io5";
import Talk from "./TalkCard";
import FriendFeed from "./FriendFeed";

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
      return data;
    },
  });

  const [theme, setTheme] = useState("System");
  const handleSelectionChange = (e) => {
    setTheme(e.target.value);
  };

  const [followingActive, setFollowingActive] = useState(false);
  const [friendsActive, setFriendsActive] = useState(true);

  const handleFriendsActive = () => {
    setFriendsActive(!friendsActive);
    setFollowingActive(false);
  };

  const handleFollowingActive = () => {
    setFollowingActive(!followingActive);
    setFriendsActive(false);
  };

  if (userQuery.isLoading) {
    return (
      <div className="w-full h-screen bg-[#222] flex justify-center align-middle">
        <Spinner />
      </div>
    );
  }

  if (userQuery.isError) {
    return <div className="w-full h-screen ">Error...</div>;
  }

  if (userQuery.isSuccess) {
    return (
      <div className="w-full text-xl text-white dark md:bg-[#222]">
        <nav>
          <div className="flex items-center justify-between align-middle">
            <div className="flex items-center px-2 ml-2 align-middle rounded-md shadow-md bg-oxford shadow-black text-bittersweet">
              <Link href="/feed" className="pt-1 text-xl text-bittersweet">
                uTalkTo
              </Link>
            </div>
            <div className="px-2 pt-2 pb-1 mr-2">
              <Dropdown backdrop="blur">
                <DropdownTrigger className="transition duration-150 shadow-md shadow-black hover:border-2">
                  <Avatar
                    classNames={
                      "transition-transform duration-300 hover:scale-110 rounded-full"
                    }
                    src={userQuery?.data?.profilePic}
                    className="hover:border-white hover:cursor-pointer"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownSection aria-label="Profile & Actions" showDivider>
                    <DropdownItem
                      href={`/UserAccount/${userQuery?.data?.username}`}
                      isReadOnly
                      key="profile"
                      className="gap-2 opacity-100 h-14"
                      textValue={userQuery?.data?.name}
                    >
                      <User
                        name={userQuery?.data?.name}
                        description={`@${userQuery?.data?.username}`}
                        classNames={{
                          name: "text-default-600",
                          description: "text-default-500",
                        }}
                        avatarProps={{
                          src: `${userQuery?.data?.profilePic}`,
                        }}
                      />
                    </DropdownItem>
                    <DropdownItem key="new">Settings</DropdownItem>
                    <DropdownItem key="copy">Account</DropdownItem>
                  </DropdownSection>

                  <DropdownSection aria-label="Help & Feedback">
                    <DropdownItem key="help_and_feedback">
                      Help & Feedback
                    </DropdownItem>
                    <DropdownItem
                      href="/api/auth/signout"
                      key="logout"
                      className="text-danger"
                      color="danger"
                    >
                      Log Out
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="flex w-full pt-2 justify-evenly">
            <div
              className={`cursor-pointer pt-2 transition duration-250 ${
                friendsActive
                  ? "text-bittersweet flex justify-center w-full pt-1 pb-2 ml-2 bg-[#222] rounded-t-md"
                  : "flex justify-center w-full pt-1 pb-2 ml-2 rounded-t-md text-gray-700 hover:text-white md:text-gray-400"
              }`}
              onClick={handleFriendsActive}
            >
              Friends
            </div>
            <div
              className={`cursor-pointer pt-2 transition duration-250 ${
                followingActive
                  ? "text-bittersweet flex justify-center w-full pt-1 pb-2 mr-2 bg-[#222] rounded-t-md"
                  : "flex justify-center w-full pt-1 pb-2 mr-2 rounded-t-md md:text-gray-400 text-gray-700 hover:text-white"
              }`}
              onClick={handleFollowingActive}
            >
              Following
            </div>
          </div>
          <div className={`min-h-screen ${friendsActive ? "" : "hidden"}`}>
            <FriendFeed />
          </div>
          <div
            className={`min-h-screen bg-[#222] ${
              friendsActive ? "hidden" : " mr-2 ml-1"
            }`}
          >
            <Following />
          </div>
        </nav>
      </div>
    );
  }
};

export default Feed;

{
  /* <div className="w-full ml-0 mr-0 dark">test</div> */
}
