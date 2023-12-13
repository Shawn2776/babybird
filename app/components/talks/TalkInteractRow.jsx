"use client";

import { FaRegComments, FaChartLine } from "react-icons/fa6";
import { PiArrowsCounterClockwise } from "react-icons/pi";
import { MdSaveAlt } from "react-icons/md";
import { IoMdShareAlt } from "react-icons/io";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";

const TalkInteractRow = ({
  likes,
  dislikes,
  retalks,
  backtalks,
  talkId,
  likeArray,
  dislikeArray,
}) => {
  const likeMutation = useMutation({
    mutationFn: (addLike) => {
      try {
        const response = fetch(`/api/talks?id=${id}&like=true`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.log("handleLike error", error);
      }
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: (addDislike) => {
      try {
        const response = fetch(`/api/talks?id=${id}&dislike=${true}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.log("handleDislike error", error);
      }
    },
  });

  const id = talkId;

  const handleLike = async () => {
    await likeMutation.mutateAsync({});
  };

  const handleDislike = async () => {
    await dislikeMutation.mutateAsync({});
  };

  return (
    <div className="flex justify-between text-sm">
      <div className="flex items-center gap-1">
        <span className="text-gray-600">0</span>
        <FaRegComments className="text-gray-600" />
      </div>
      <div className="flex items-center gap-1">
        <span className="text-gray-600">0</span>
        <PiArrowsCounterClockwise className="text-gray-600" />
      </div>
      <div>
        <button onClick={handleLike} className="flex items-center gap-1">
          <span className="">{likes}</span>
          <AiFillLike className="" />
        </button>
      </div>
      <div>
        <button onClick={handleDislike} className="flex items-center gap-1">
          <span className="text-gray-600">{dislikes}</span>
          <AiOutlineDislike className="text-gray-600" />
        </button>
      </div>

      <div className="flex items-center gap-1">
        <span className="text-gray-600">2.2k</span>
        <FaChartLine className="text-gray-600" />
      </div>
      <div className="flex items-center gap-1">
        <span className="text-gray-600">18k</span>
        <MdSaveAlt className="text-gray-600" />
      </div>
      <div className="flex items-center gap-1">
        <span className="text-gray-600">1.1k</span>
        <IoMdShareAlt className="text-gray-600" />
      </div>
    </div>
  );
};

export default TalkInteractRow;
