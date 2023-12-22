import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Feed from "@/components/talkComponents/Feed";
import RightNavbar from "@/components/nav/RightNavbar";
import LeftNavbar from "@/components/nav/LeftNavbar";

export default async function Home() {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/Login");
  }

  return (
    <div className="flex justify-center w-full">
      <div className="flex justify-end ">
        <LeftNavbar />
      </div>
      <div className="sm:min-w-[460] w-full md:max-w-lg lg:max-w-2xl">
        <Feed />
      </div>
      <div>
        <RightNavbar />
      </div>
    </div>
    // <div className="flex justify-center w-full mx-auto">
    //   <TopNavbar />

    //   <div className={`flex justify-center w-full`}>
    //     <div className="flex justify-end w-full">
    //       <LeftNavbar />
    //     </div>
    //     <main className="sm:min-w-[460] w-full md:max-w-lg lg:max-w-2xl">
    //       <Feed />
    //     </main>
    //     <div className="flex justify-start w-full">
    //       <RightNavbar className="sm:hidden" />
    //     </div>
    //   </div>
    //   {/* <BottomNavbar /> */}
    // </div>
  );
}
