"use client";

import React from "react";
import { BsBookmark, BsListStars } from "react-icons/bs";
import { LuSearch } from "react-icons/lu";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { Image, Spinner } from "@nextui-org/react";
import defaultProfilePic from "../../public/defaultProfilePic.jpg";
import EmbedPlayer from "@/components/misc/EmbedPlayer";
import Link from "next/link";
import { BiDotsHorizontal } from "react-icons/bi";

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

  const readableDate = (createdAt) => {
    return new Date(createdAt).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  if (talkQuery.isLoading)
    return (
      <div className="flex justify-center w-full align-middle">
        <Spinner />
      </div>
    );

  if (talkQuery.isError) return <div>Error fetching talks</div>;

  if (talkQuery.isSuccess) {
    const date = readableDate(talkQuery?.data.createdAt);
    return (
      <div className="flex flex-col justify-between w-full h-screen bg-gradient-to-b from-[#55BCC9] to-oxford">
        <div>
          {talkQuery?.data?.map((talk) => (
            <div key={talk.id} className="container px-4 mx-auto ">
              {/* Header Section */}
              <div className="py-4 text-center">
                <div className="relative w-24 h-24 mx-auto rounded-full">
                  <Image
                    src={talk.owner.profilePic}
                    alt="profile"
                    layout="fill"
                    className="rounded-full"
                  />
                </div>
                <h1 className="text-xl font-bold">Username</h1>
                <p className="text-sm text-gray-600">Bio goes here</p>
                <div className="mt-2 space-x-2">
                  {/* Edit Profile Button */}
                  <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded">
                    Edit Profile
                  </button>
                  {/* Settings or New Post Button */}
                  <button className="px-4 py-2 text-white bg-blue-500 rounded">
                    Settings
                  </button>
                </div>
              </div>

              {/* Stats Section */}
              <div className="flex justify-around py-2 text-center">
                <div>
                  <span className="text-lg font-bold">100</span> posts
                </div>
                <div>
                  <span className="text-lg font-bold">2k</span> followers
                </div>
                <div>
                  <span className="text-lg font-bold">300</span> following
                </div>
              </div>

              {/* Post Grid */}
              <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-3">
                {/* Repeat for each post */}
                <div className="md:p-4 border border-b-transparent border-l-transparent border-r-transparent md:border-none md:my-1 text-white border-gray-600 md:rounded-lg bg-[rgb(24,25,26)] ">
                  <div
                    id="talkTopRow"
                    className="flex justify-between w-full pt-4 pr-4 md:p-0"
                  >
                    <div className="flex gap-4">
                      <div className="pl-2 md:p-0">
                        <Link href={`/Profile/${talk.owner.username}/`}>
                          <Image
                            src={
                              talk.owner.profilePic === null
                                ? defaultProfilePic
                                : talk.owner.profilePic
                            }
                            height={40}
                            width={40}
                            alt=""
                            className="bg-black rounded-full"
                          />
                        </Link>
                      </div>
                      <div className="leading-4">
                        <p className="text-md">{talk.owner.name}</p>
                        <p className="text-sm text-gray-600">
                          @{talk.owner.username}
                        </p>
                      </div>
                    </div>
                    <div>
                      {date}{" "}
                      <BiDotsHorizontal className="text-2xl text-gray-400" />
                    </div>
                  </div>

                  <div id="talkContent" className="pt-4 pr-4">
                    <div
                      id="talkText"
                      className="pb-4 pl-16 whitespace-break-spaces"
                    >
                      <p className="pb-4">{talk.text}</p>
                    </div>
                    <div
                      id="talkImage"
                      className={`${
                        talk.image ? "max-w-2xl h-64 relative ml-14" : "hidden"
                      }`}
                    >
                      {talk.image ? (
                        <Image
                          style={{ objectFit: "cover" }}
                          src={talk.imageUrl}
                          fill={true}
                          alt=""
                          className="rounded-2xl"
                          priority={true}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                    <div
                      id="talkVideo"
                      className={`${talk.video ? "max-w-2xl ml-14" : "pt-4"}`}
                    >
                      {talk.video ? <EmbedPlayer src={talk.videoUrl} /> : <></>}
                    </div>
                    {/* <div id="talkInteractBar" className="px-6 pb-4 mt-4 md:pb-0 md:px-2">
          <TalkInteractRow
            likes={_count.likes}
            dislikes={_count.dislikes}
            talkId={id}
            likeArray={talk.likes}
            dislikeArray={talk.dislikes}
            // retalks={retalks}
            // backtalks={backtalks}
            // likeCount={likeCount}
            // dislikeCount={dislikeCount}
            // retalkCount={retalkCount}
            // backtalkCount={backtalkCount}
          />
        </div> */}
                  </div>
                </div>
                {/* ... */}
              </div>

              {/* Footer */}
              <div className="fixed bottom-0 left-0 right-0 py-2 text-center bg-white border-t border-gray-200">
                {/* Footer Icons */}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Test;
