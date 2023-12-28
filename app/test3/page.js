"use client";

import { Image, Tab, Tabs } from "@nextui-org/react";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";

const Home2 = ({
  username = "webDev2776",
  name = "Shawn Harrington",
  profilePic = "/defaultProfilePic.jpg",
  description = "Frontend developer and UI/UX enthusiast. Join me on this coding adventure!",
}) => {
  const [isEditing, setIsEditing] = useState(false);

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

  return (
    <div className="bg-[#333739] w-full min-h-screen">
      <div className="flex items-center justify-between w-full h-16 px-6 text-2xl text-white">
        <IoIosArrowBack />
        <Image src={profilePic} width="40px" height="40px" alt="" />
      </div>
      <hr />
      <div className="flex justify-center pt-2">
        <Card className="mx-4 dark">
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar isBordered radius="full" size="lg" src={profilePic} />
              <div className="flex flex-col items-start justify-center gap-1">
                <h4 className="font-semibold leading-none text-small text-default-600">
                  {name}
                </h4>
                <h5 className="tracking-tight text-small text-default-400">
                  @{username}
                </h5>
              </div>
            </div>
            <Button
              className={
                isEditing
                  ? "bg-green-500 text-white border-default-200"
                  : "bg-oxford text-white"
              }
              color="primary"
              radius="full"
              size="sm"
              variant={isEditing ? "bordered" : "solid"}
              onPress={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Save" : "Edit"}
            </Button>
          </CardHeader>
          <CardBody className="px-3 py-0 text-white text-small">
            <p>{description}</p>
          </CardBody>
          <CardFooter className="gap-3">
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">4</p>
              <p className=" text-default-400 text-small">Friends</p>
            </div>
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">97.1K</p>
              <p className="text-default-400 text-small">Followers</p>
            </div>
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">97.1K</p>
              <p className="text-default-400 text-small">Following</p>
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="flex flex-wrap w-full gap-12 mt-2 dark">
        <Tabs variant="underlined" aria-label="Tabs variants" fullWidth>
          <Tab key="photos" title="Photos" />

          <Tab key="videos" title="Videos" />

          <Tab key="music" title="Music" />
        </Tabs>
      </div>
    </div>
  );
};

export default Home2;
