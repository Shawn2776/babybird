import Link from "next/link";
import React from "react";
import { BiHomeSmile, BiMessageAltDetail } from "react-icons/bi";
import { LuSearch } from "react-icons/lu";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { BsBookmark, BsListStars, BsStar } from "react-icons/bs";
import { RiCommunityLine } from "react-icons/ri";
import { TbHexagonLetterT } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";

function LeftNavbar() {
  return (
    <div className="flex-col items-end hidden w-full p-4 bg-[#222] text-white md:flex rounded-l-lg h-screen sticky top-0">
      <div className="flex flex-col gap-1">
        <div className="flex items-center w-full gap-4 p-2 ">
          <Link href="/">
            <TbHexagonLetterT className="text-2xl" />
          </Link>
        </div>

        <div className="flex items-center w-full gap-4 p-2 cursor-pointer hover:bg-white hover:text-black hover:rounded-lg">
          <Link href="/">
            <div className="flex gap-4">
              <BiHomeSmile className="text-xl" />
              <span className="text-xl">Home</span>
            </div>
          </Link>
        </div>

        {/* <div className="flex items-center w-full gap-4 p-2 cursor-pointer hover:bg-white hover:text-black hover:rounded-lg">
          <Link href="/">
            <div className="flex gap-4">
              <LuSearch className="text-2xl" />
              <span className="text-xl">Explore</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center w-full gap-4 p-2 cursor-pointer hover:bg-white hover:text-black hover:rounded-lg">
          <Link href="/">
            <div className="flex gap-4">
              <MdOutlineNotificationsNone className="text-2xl" />
              <span className="text-xl">Notifications</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center w-full gap-4 p-2 cursor-pointer hover:bg-white hover:text-black hover:rounded-lg">
          <Link href="/">
            <div className="flex gap-4">
              <BiMessageAltDetail className="text-2xl" />
              <span className="text-xl">Messages</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center w-full gap-4 p-2 cursor-pointer hover:bg-white hover:text-black hover:rounded-lg">
          <Link href="/">
            <div className="flex gap-4">
              <BsListStars className="text-2xl" />
              <span className="text-xl">Lists</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center w-full gap-4 p-2 cursor-pointer hover:bg-white hover:text-black hover:rounded-lg">
          <Link href="/">
            <div className="flex gap-4">
              <BsBookmark className="text-2xl" />
              <span className="text-xl">Bookmarks</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center w-full gap-4 p-2 cursor-pointer hover:bg-white hover:text-black hover:rounded-lg">
          <Link href="/">
            <div className="flex gap-4">
              <RiCommunityLine className="text-2xl" />
              <span className="text-xl">Communities</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center w-full gap-4 p-2 cursor-pointer hover:bg-white hover:text-black hover:rounded-lg">
          <Link href="/">
            <div className="flex gap-4">
              <BsStar className="text-2xl" />
              <span className="text-xl">Premium</span>
            </div>
          </Link>
        </div> */}

        <div className="flex items-center w-full gap-4 p-2 cursor-pointer hover:bg-white hover:text-black hover:rounded-lg">
          <Link href="/">
            <div className="flex gap-4">
              <CgProfile className="text-2xl" />
              <span className="text-xl">Profile</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center w-full gap-4 p-2 cursor-pointer hover:bg-white hover:text-black hover:rounded-lg">
          <Link href="/">
            <div className="flex gap-4">
              <BiMessageAltDetail className="text-2xl" />
              <span className="text-xl">More</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LeftNavbar;
