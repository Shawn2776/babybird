"use client";

import { Button, Image, Input, Skeleton } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import { TbLetterX } from "react-icons/tb";
import bg from "../../public/Background43.jpg";
import TabsComponent from "../misc/Tabs";
import SkeletonComp from "../ui/SkeletonComp";

const AccountCard = ({ user }) => {
  const inName = user.name;
  const inUsername = user.username;
  const [name, setName] = useState(inName);
  const [username, setUsername] = useState(inUsername);
  const [isDisabled, setIsDisabled] = useState(true);

  const mutation = useMutation({
    mutationFn: async (username) => {
      const updateUser = await fetch(`/api/userAccount?username=${username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username }),
      });

      if (!updateUser.ok) {
        return "Error updating user information!";
      }

      if (updateUser.ok) {
        return "User information updated!";
      }
    },
  });

  const handleCancel = () => {
    setName(user.name);
    setUsername(user.username);
    setIsDisabled(true);
  };

  const handleSave = () => {
    if (username !== user.username && username !== "" && username.length < 5) {
      alert("Username must be at least 5 characters long!");
      return;
    }

    mutation.mutate(username);

    if (mutation.isSuccess) {
      setIsDisabled(true);
      return;
    }

    if (mutation.isError) {
      setIsDisabled(true);
      return;
    }
  };

  return (
    <div className="h-screen bg-neutral-900">
      <div className="flex justify-between w-full bg-white">
        <Link href={`/`} className="w-full bg-white ">
          <Button className="flex items-center gap-4 py-2 pl-4 text-lg text-black bg-white">
            <FaLongArrowAltLeft />
          </Button>
        </Link>
      </div>
      {/* Top Section with user image, name, and stats */}
      <div className="px-4 pt-12 pb-6">
        <div className="flex items-end space-x-4">
          <div className="relative w-24 h-24">
            <Image
              src={user.profilePic}
              alt="Profile Image"
              layout="fill"
              className="rounded-full"
            />
          </div>
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <div className="flex w-full h-8">
                <Skeleton isLoaded={user?.username ? user.name : false}>
                  <Input
                    isDisabled={isDisabled}
                    value={username}
                    variant="underlined"
                    onValueChange={setUsername}
                    isClearable={!isDisabled}
                    className="dark"
                    classNames={{
                      label: "text-white dark:text-white",
                      input: [
                        "bg-transparent",
                        "text-white-100 dark:text-white-100 text-xl",
                        "placeholder:text-white-100 dark:placeholder:text-white-100 h-20 my-2 py-2",
                      ],
                      inputWrapper: ["border-none my-0 py-0 w-[90%]"],
                      mainWrapper: ["h-10 my-0 py-0"],
                    }}
                  />
                </Skeleton>
              </div>

              <div>{/* Settings Icon */}</div>
            </div>
            <div className="flex mt-3 space-x-6 ">
              <div>
                <span className="font-bold">8</span> Posts
              </div>
              <div>
                <span className="font-bold">12k</span> Followers
              </div>
              <div>
                <span className="font-bold">2k</span> Following
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <h1 className="font-bold">{user.name}</h1>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur
          </p>
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="px-4 mb-4 ">
        <button className="w-full px-4 py-2 text-sm font-semibold text-center border border-gray-300 rounded">
          {isDisabled ? (
            <button
              onClick={() => setIsDisabled(!isDisabled)}
              variant="light"
              color="white"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <Button onClick={() => handleCancel()} variant="light">
                <TbLetterX className="text-2xl text-red-500" />
              </Button>
              <Button
                onClick={() => handleSave()}
                variant="light"
                className="py-0"
              >
                <IoMdCheckmark className="text-2xl text-green-500" />
              </Button>
            </>
          )}
        </button>
      </div>

      <div className="flex px-2 py-2 mx-2 rounded-lg shadow-md shadow-black">
        <TabsComponent
          optionOne={"talks"}
          optionTwo={"friends"}
          optionThree={"following"}
          talks={user.talks}
        />
      </div>
    </div>
    // <div className="w-full bg-[#222] text-white min-h-screen">
    //   <div className="flex justify-between w-full bg-white">
    //     <Link href={`/`} className="bg-white ">
    //       <Button className="flex items-center gap-4 py-2 pl-4 text-lg text-black bg-white">
    //         <FaLongArrowAltLeft />
    //       </Button>
    //     </Link>
    //     <div className="flex justify-end gap-2 py-0 text-black bg-white">
    //       {isDisabled ? (
    //         <Button
    //           onClick={() => setIsDisabled(!isDisabled)}
    //           variant="light"
    //           color="white"
    //         >
    //           <FiEdit2 />
    //         </Button>
    //       ) : (
    //         <>
    //           <Button onClick={() => handleCancel()} variant="light">
    //             <TbLetterX className="text-2xl text-red-500" />
    //           </Button>
    //           <Button
    //             onClick={() => handleSave()}
    //             variant="light"
    //             className="py-0"
    //           >
    //             <IoMdCheckmark className="text-2xl text-green-500" />
    //           </Button>
    //         </>
    //       )}
    //     </div>
    //   </div>
    //   <div
    //     className="flex flex-col px-2 py-4 my-2"
    //     style={{ backgroundImage: `url(${bg.src})` }}
    //   >
    //     <Skeleton isLoaded={user.profilePic ? user.profilePic : false}>
    //       <Image
    //         src={user?.profilePic}
    //         className="w-24 h-24 m-2 rounded-full shadow-md shadow-black"
    //         alt={`${user?.name}'s profile pic`}
    //       />
    //     </Skeleton>
    //   </div>
    //   <div className="px-2 py-1 mx-2 mb-2 rounded-lg shadow-md bg-neutral-700 shadow-black">
    //     <div>
    //       <div className="h-6">
    //         <Skeleton isLoaded={user?.name ? user.name : false}>
    //           <Input
    //             isDisabled={isDisabled}
    //             value={name}
    //             variant="underlined"
    //             className="dark "
    //             onValueChange={setName}
    //             classNames={{
    //               label: "text-black/50 dark:text-white/90",
    //               input: [
    //                 "bg-transparent",
    //                 "text-black/90 dark:text-white/90 text-xl",
    //                 "placeholder:text-default-700/50 dark:placeholder:text-white/60",
    //               ],
    //               inputWrapper: ["border-none my-0 py-0"],
    //               mainWrapper: ["h-10 my-0 py-0"],
    //             }}
    //           />
    //         </Skeleton>
    //       </div>

    //       <div className="flex w-full h-8">
    //         <Skeleton isLoaded={user?.username ? user.name : false}>
    //           <Input
    //             isDisabled={isDisabled}
    //             value={username}
    //             variant="underlined"
    //             className="dark "
    //             onValueChange={setUsername}
    //             isClearable={!isDisabled}
    //             classNames={{
    //               label: "text-black/50 dark:text-white/90",
    //               input: [
    //                 "bg-transparent",
    //                 "text-black/90 dark:text-white/90 text-xl",
    //                 "placeholder:text-default-700/50 dark:placeholder:text-white/60 h-10 my-0 py-0",
    //               ],
    //               inputWrapper: ["border-none my-0 py-0 w-[90%]"],
    //               mainWrapper: ["h-10 my-0 py-0"],
    //             }}
    //           />
    //         </Skeleton>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="flex px-2 py-2 mx-2 rounded-lg shadow-md shadow-black">
    //     <TabsComponent
    //       optionOne={"talks"}
    //       optionTwo={"friends"}
    //       optionThree={"following"}
    //     />
    //   </div>
    // </div>
  );
};

export default AccountCard;
