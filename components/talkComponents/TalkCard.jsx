import { BiDotsHorizontal } from "react-icons/bi";
// import TalkInteractRow from "./TalkInteractRow";
import defaultProfilePic from "../../public/defaultProfilePic.jpg";
import Link from "next/link";
import EmbedPlayer from "../misc/EmbedPlayer";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardHeader, CardBody, Image, Skeleton } from "@nextui-org/react";
import DropDownComp from "../ui/DropDown";

function Talk({
  talk,
  talk: {
    id,
    text,
    image,
    video,
    imageUrl,
    videoUrl,
    createdAt,
    profilePic,
    _count,
  },
  owner,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inImage = image ? imageUrl : null;
  const inVideo = video ? videoUrl : null;

  const router = useRouter();

  const readableDate = new Date(createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleClick = (e) => {
    e.preventDefault();
    router.push(`/Talk/${id}`);
  };

  function toggleModal(e) {
    e.stopPropagation();
    setIsModalOpen(!isModalOpen);
  }

  return (
    <Card className="py-4 bg-[rgb(24,25,26)] rounded-md mb-[1px] mt-[1px]">
      <CardHeader className="flex-col items-start px-4 pt-2 pb-0">
        <div className="w-full">
          <div className="flex items-center justify-between w-full">
            <Link href={`/Profile/${owner.username}/`}>
              <div className="flex items-center gap-2">
                <div>
                  <Image
                    src={
                      owner.profilePic === null
                        ? defaultProfilePic
                        : owner.profilePic
                    }
                    height={40}
                    width={40}
                    alt=""
                    className="bg-black rounded-full shadow-md shadow-black"
                  />
                </div>
                <div className="text-sm">
                  <h4 className="text-sm text-white">{owner.name}</h4>
                  <p className="text-neutral-400 text-tiny">
                    @{owner.username}
                  </p>
                </div>
              </div>
            </Link>
            <div className="text-white">
              <DropDownComp
                menuIcon={<BiDotsHorizontal />}
                items={["Not Interested", "Follow", "Report"]}
              />
            </div>
          </div>
          <div className="mb-2">
            <small className="text-default-500">{readableDate}</small>
          </div>
        </div>
      </CardHeader>
      <CardBody className="relative w-full py-2 overflow-visible">
        <div className="mb-2 whitespace-break-spaces">
          <p className="text-white">{text}</p>
        </div>
        <div className="flex justify-center">
          <Image
            alt="Card background"
            className="object-cover shadow-md rounded-xl shadow-black"
            src={inImage}
          />
        </div>
      </CardBody>
    </Card>
    // <div
    //   className="md:p-4 border border-b-transparent border-l-transparent border-r-transparent md:border-none md:my-1 text-white border-gray-600 rounded-lg md:rounded-lg bg-[rgb(24,25,26)] cursor-pointer hover:bg-[rgb(29,30,31)] transition duration-200 ease-in-out mr-1 mb-1 mt-1 md:mr-0"
    //   onClick={(e) => handleClick(e)}
    // >
    //   <div
    //     id="talkTopRow"
    //     className="flex justify-between w-full pt-4 pr-4 md:p-0"
    //   >
    //     <Link href={`/Profile/${owner.username}/`}>
    //       <div className="flex gap-4">
    //         <div className="pl-2 md:p-0">
    //           <Image
    //             src={
    //               owner.profilePic === null
    //                 ? defaultProfilePic
    //                 : owner.profilePic
    //             }
    //             height={40}
    //             width={40}
    //             alt=""
    //             className="bg-black rounded-full"
    //           />
    //         </div>
    //         <div className="flex flex-col gap-4">
    //           <div className="leading-4">
    //             <p className="text-md">{owner.name}</p>
    //             <p className="text-sm text-gray-600">@{owner.username}</p>
    //           </div>
    //         </div>
    //       </div>
    //     </Link>
    //     <BiDotsHorizontal className="text-2xl text-gray-400" />
    //   </div>
    //   <div className="mt-1 text-sm text-gray-600 pl-14">{readableDate}</div>

    //   <div id="talkContent" className="pt-4 pr-4">
    //     <div id="talkText" className="pb-4 pl-16 whitespace-break-spaces">
    //       <p className="pb-4">{text}</p>
    //     </div>
    //     <div
    //       id="talkImage"
    //       className={`${inImage ? "max-w-2xl h-96 relative ml-4" : "hidden"}`}
    //     >
    //       {inImage ? (
    //         <Image
    //           style={{ objectFit: "cover" }}
    //           src={imageUrl}
    //           fill={true}
    //           alt=""
    //           className="rounded-2xl"
    //           priority={true}
    //           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    //           onClick={toggleModal}
    //         />
    //       ) : (
    //         <></>
    //       )}
    //     </div>
    //     <div
    //       id="talkVideo"
    //       className={`${inVideo ? "max-w-2xl ml-14" : "pt-4"}`}
    //     >
    //       {inVideo ? <EmbedPlayer src={videoUrl} /> : <></>}
    //     </div>
    //     {/* <div id="talkInteractBar" className="px-6 pb-4 mt-4 md:pb-0 md:px-2">
    //       <TalkInteractRow
    //         likes={_count.likes}
    //         dislikes={_count.dislikes}
    //         talkId={id}
    //         likeArray={talk.likes}
    //         dislikeArray={talk.dislikes}
    //         // retalks={retalks}
    //         // backtalks={backtalks}
    //         // likeCount={likeCount}
    //         // dislikeCount={dislikeCount}
    //         // retalkCount={retalkCount}
    //         // backtalkCount={backtalkCount}
    //       />
    //     </div> */}
    //   </div>
    //   {isModalOpen && (
    //     <div className="fixed top-0 left-0 w-full h-screen bg-[rgba(0, 0, 0, 0.8)] flex flex-col justify-center align-middle z-[1000] bg-blur-3xl">
    //       <Image
    //         style={{ objectFit: "contain" }}
    //         src={imageUrl}
    //         fill={true}
    //         alt=""
    //         className="rounded-2xl"
    //         priority={true}
    //         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    //         onClick={toggleModal}
    //       />
    //     </div>
    //   )}
    // </div>
  );
}

export default Talk;
