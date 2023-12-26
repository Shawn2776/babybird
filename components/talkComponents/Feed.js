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
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ThemeProvider } from "@/utils/providers/nextUI/ThemeProvider";
import { ThemeSwitcher } from "../ui/ThemeSwitcher";

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
            <Dropdown backdrop="blur">
              <DropdownTrigger>
                <Avatar
                  isBordered
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
    );
  }
};

export default Feed;
