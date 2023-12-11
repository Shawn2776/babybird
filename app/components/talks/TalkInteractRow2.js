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
import { useSession } from "next-auth/react";

async function getUser(email) {
  const response = await fetch(`/api/user/${email}?email=${email}`);

  if (response.ok) {
    const user = response.json();
    return user;
  } else {
    console.log("getUser error", response);
  }
}

const TalkInteractRow2 = ({
  likeCount,
  dislikeCount,
  talkId,
  likeArray,
  dislikeArray,
}) => {
  const { data: session, status } = useSession();
  const email = session?.user?.email;

  const user = getUser(email);

  console.log("user", user);

  return <div className="flex justify-between text-sm">{likeCount}</div>;
};

export default TalkInteractRow2;
