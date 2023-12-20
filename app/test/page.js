"use client";

import React from "react";
import { BsBookmark, BsListStars } from "react-icons/bs";
import { LuSearch } from "react-icons/lu";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { Image } from "@nextui-org/react";
import defaultProfilePic from "../../public/defaultProfilePic.jpg";

function Test() {
  const talkQuery = useQuery({
    queryKey: ["talks"],
    queryFn: async () => {
      const response = await fetch("/api/talks/", {
        method: "GET",
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    },
  });

  if (talkQuery.isLoading) return <div>Loading...</div>;

  if (talkQuery.isError) return <div>Error fetching talks</div>;

  if (talkQuery.isSuccess) {
    return (
      <div className="flex flex-col justify-between w-full h-screen bg-gradient-to-b from-[#55BCC9] to-oxford">
        <div>
          {talkQuery?.data?.map((talk) => (
            <div
              key={talk.id}
              className="bg-[#F49068] rounded-full p-1 h-20 mb-5"
            >
              <div className="flex">
                {
                  <Image
                    src={talk.owner.profilePic}
                    className="object-cover rounded-full shadow-md shadow-black"
                    alt={talk.owner.name}
                    width={40}
                  />
                }
                <div className={`${talk.image ? "" : "hidden"}`}>
                  {
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl"
                      src={talk.imageUrl}
                      width={100}
                      height={100}
                    />
                  }
                </div>
                {talk.text}
              </div>
            </div>
          ))}
        </div>
        <div className="pt-1 mx-2 mr-2 px-4 h-12 rounded-full bg-[#F49068] mb-2 border-b-[#e67346] border-b-5 flex justify-between shadow-md shadow-black fixed bottom-0 w-[96%] z-[1000]">
          <LuSearch className="p-2 text-4xl font-extrabold text-black rounded-full shadow-md shadow-black" />

          <BsBookmark className="p-2 text-4xl font-extrabold text-black rounded-full shadow-md shadow-black " />

          <MdOutlineNotificationsNone className="p-2 text-4xl font-extrabold text-black rounded-full shadow-md shadow-black " />

          <BsListStars className="p-2 text-4xl font-extrabold text-black rounded-full shadow-md shadow-black " />
        </div>
      </div>
    );
  }
}

export default Test;
