import Image from "next/image";
import { BiDotsHorizontal } from "react-icons/bi";
import TalkInteractRow from "./TalkInteractRow";
import EmbedPlayer from "../embedPlayer/EmbedPlayer";
import Link from "next/link";
import { ProfileImage } from "./ProfileImage";

function Talk2({
  talk: { id, text, image, video, imageUrl, videoUrl, createdAt },
  owner,
}) {
  const inImage = image ? imageUrl : null;
  const inVideo = video ? videoUrl : null;
  const tempSource =
    "https://utalkto.s3.us-west-2.amazonaws.com/defaultProfilePic.png";

  const readableDate = new Date(createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="md:p-4 border border-b-transparent border-l-transparent border-r-transparent md:border-none md:my-1 text-white border-gray-600 md:rounded-lg bg-[rgb(24,25,26)] ">
      <div
        id="talkTopRow"
        className="flex justify-between w-full pt-4 pr-4 md:p-0"
      >
        <div className="flex gap-4">
          <div className="pl-2 md:p-0">
            {owner.profilePic ? (
              <Image
                src={owner.profilePic}
                height={40}
                width={40}
                alt=""
                className="rounded-full"
              />
            ) : (
              <Image
                src={tempSource}
                height={40}
                width={40}
                alt=""
                className="rounded-full"
              />
            )}
          </div>
          <div className="leading-4">
            <p className="text-md">{owner.name}</p>
            <p className="text-sm text-gray-600">@{owner.username}</p>
          </div>
        </div>
        <div>
          <BiDotsHorizontal className="text-2xl text-gray-400" />
        </div>
      </div>

      <div id="talkContent" className="pt-4 pr-4">
        <div id="talkText" className="pb-4 pl-16 whitespace-break-spaces">
          <p className="pb-4">{text}</p>
        </div>
        <div
          id="talkImage"
          className={`${inImage ? "max-w-2xl h-64 relative ml-14" : "hidden"}`}
        >
          {inImage ? (
            <Image
              style={{ objectFit: "cover" }}
              src={imageUrl}
              fill={true}
              alt=""
              className="rounded-2xl"
            />
          ) : (
            <></>
          )}
        </div>
        <div id="talkVideo" className={`${inVideo ? "default" : "pt-4"}`}>
          {inVideo ? <EmbedPlayer src={videoUrl} /> : <></>}
        </div>
        <div id="talkInteractBar" className="px-6 pb-4 mt-4 md:pb-0 md:px-2">
          {/* <TalkInteractRow
            likes={likes}
            dislikes={dislikes}
            retalks={retalks}
            backtalks={backtalks}
            likeCount={likeCount}
            dislikeCount={dislikeCount}
            retalkCount={retalkCount}
            backtalkCount={backtalkCount}
          />*/}
        </div>
      </div>
    </div>
  );
}

export default Talk2;
