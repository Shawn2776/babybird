import { getServerSession } from "next-auth";
import Image from "next/image";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import ProfileCard from "@/components/talkComponents/ProfileCard";
import TopNavbar from "@/components/nav/TopNavbar";
import Feed from "@/components/talkComponents/Feed";
import RightNavbar from "@/components/nav/RightNavbar";
import LeftNavbar from "@/components/nav/LeftNavbar";
import BottomNavbar from "@/components/nav/BottomNavbar";

export default async function Home() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/Login");
  }

  return (
    <>
      <TopNavbar />
      <div className={`flex justify-between w-full mx-auto`}>
        <LeftNavbar />
        <main className="sm:min-w-[460] w-full">
          <Feed />
        </main>
        {/* <RightNavbar /> */}
      </div>
      <BottomNavbar />
    </>
  );
}
