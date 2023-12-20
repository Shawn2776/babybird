import Link from "next/link";
import React from "react";
import { TbHexagonLetterT } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";

function TopNavbar() {
  return (
    <div className="sticky top-0 z-10 flex justify-between p-4 md:hidden backdrop-blur ">
      <Link href="/" className="text-2xl">
        <CgProfile />
      </Link>
      <Link href="#" className="text-2xl">
        <TbHexagonLetterT />
      </Link>
      <Link href="#" className="text-2xl">
        <IoSettingsOutline />
      </Link>
    </div>
  );
}

export default TopNavbar;
