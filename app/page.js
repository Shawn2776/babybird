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
      <div className={`flex justify-center w-full mx-auto gap-1`}>
        <div>
          <LeftNavbar />
        </div>
        <main className="sm:min-w-[460] w-full md:max-w-lg lg:max-w-2xl">
          <Feed />
        </main>
        {/* <RightNavbar /> */}
      </div>
      {/* <BottomNavbar /> */}
    </>
  );
}
