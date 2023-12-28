import Image from "next/image";
import { BiDotsHorizontal } from "react-icons/bi";
// import TalkInteractRow from "./TalkInteractRow";
import defaultProfilePic from "../../../public/defaultProfilePic.jpg";
import Link from "next/link";
import EmbedPlayer from "../../misc/EmbedPlayer";
import readableDate from "@/utils/misc/readableDate";
import dateToDaysHours from "@/utils/misc/dateToDaysHours";
import { Tooltip } from "@nextui-org/react";

function Talk({
  talk,
  talk: { id, text, image, video, imageUrl, videoUrl, createdAt, _count },
  username,
  name,
  profilePic,
}) {
  const inImage = image ? imageUrl : null;
  const inVideo = video ? videoUrl : null;

  return (
    <div className="md:p-4 border border-b-transparent border-l-transparent border-r-transparent md:border-none md:my-1 text-white border-gray-600 md:rounded-lg bg-[#333739] ">
      <div
        id="talkTopRow"
        className="flex justify-between w-full pt-4 pr-4 md:p-0"
      >
        <div className="flex gap-4">
          <div className="pl-2 md:p-0">
            <Image
              src={profilePic === null ? defaultProfilePic : profilePic}
              height={40}
              width={40}
              alt=""
              className="bg-black rounded-full"
            />
          </div>
          <div className="leading-4">
            <p className="text-md">{name}</p>
            <p className="text-sm text-gray-600">@{username}</p>
          </div>
        </div>
        <div>
          <BiDotsHorizontal className="text-2xl text-gray-400" />
        </div>
      </div>

      <div id="talkContent" className="pt-4 pr-4">
        <div id="talkText" className="pb-2 pl-16 whitespace-break-spaces">
          <p className="pb-4">{text}</p>
        </div>
        <div
          id="talkImage"
          className={`${
            inImage ? "max-w-2xl h-96 relative ml-14 rounded-2xl" : "hidden"
          }`}
        >
          {inImage ? (
            <Image
              style={{ objectFit: "cover" }}
              src={imageUrl}
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
          className={`${inVideo ? "max-w-2xl ml-14" : "pt-4"}`}
        >
          {inVideo ? <EmbedPlayer src={videoUrl} /> : <></>}
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
  );
}

export default Talk;
