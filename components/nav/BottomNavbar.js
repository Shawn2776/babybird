import Link from "next/link";
import React from "react";
import { BiHomeSmile, BiMessageAltDetail } from "react-icons/bi";
import { LuSearch } from "react-icons/lu";
import { MdOutlineNotificationsNone } from "react-icons/md";

function BottomNavbar() {
  return (
    <div className="sticky bottom-0 flex justify-between w-full p-4 m-4 mx-auto text-2xl border-t-2 md:hidden">
      <Link href="/">
        <BiHomeSmile />
      </Link>
      <Link href="#">
        <LuSearch />
      </Link>
      <Link href="#">
        <MdOutlineNotificationsNone />
      </Link>
      <Link href="#">
        <BiMessageAltDetail />
      </Link>
    </div>
  );
}

export default BottomNavbar;
