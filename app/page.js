"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import mobileLogo from "../public/logos/uTalkTo-logos_white.png";
import logo from "../public/logos/uTalkTo-logos_black.png";
import Link from "next/link";
import { redirect } from "next/navigation";

const Home = () => {
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    window.location.href = "/"; // Change to your sign-in page
  };

  // Optional: handle loading status
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    redirect("/Home");
  }

  return (
    <>
      <main>
        <div className="flex flex-col w-full sm:flex-row">
          <div className="w-full">
            <Image
              className="sm:hidden"
              src={mobileLogo}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
              alt="photo"
            />

            <Image
              className="hidden sm:flex"
              src={logo}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
              alt="photo"
            />
          </div>

          <div className="flex justify-center w-full sm:items-center">
            {session ? (
              <Link
                className="text-6xl"
                href={"/api/auth/signout/google?callbackUrl=/"}
              >
                <button onClick={handleSignOut}>Sign Out</button>
              </Link>
            ) : (
              <Link
                className="px-6 py-4 text-6xl text-white rounded-full shadow-xl bg-oxford"
                href={"/api/auth/signin/google?callbackUrl=/Home"}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

// import mobileLogo from "../public/logos/uTalkTo-logos_white.png";
// import logo from "../public/logos/uTalkTo-logos_black.png";
// import Image from "next/image";
// import Link from "next/link";
// import { getServerSession } from "next-auth";
// import { options } from "./api/auth/[...nextauth]/options";

// const Home = () => {
//   const session = getServerSession(options);

//   return (
//     <>
//       <main className="flex flex-col w-full h-screen md:flex-row md:justify-evenly">
//         <div className="flex items-center justify-center w-full h-screen sm:hidden">
//           <Image
//             src={mobileLogo}
//             style={{
//               maxWidth: "100%",
//               height: "auto",
//             }}
//             alt="photo"
//           />
//         </div>
//         <div className="items-center justify-center hidden w-full h-screen sm:flex">
//           <Image
//             src={logo}
//             style={{
//               maxWidth: "100%",
//               height: "auto",
//             }}
//             alt="photo"
//           />
//         </div>
//         <div className="flex items-start justify-center w-full h-screen sm:items-center">
//           {session ? (
//             <Link className="text-6xl" href={"/api/auth/signout/google"}>
//               Sign Out
//             </Link>
//           ) : (
//             <Link
//               className="text-6xl"
//               href={"/api/auth/signin/google?callbackUrl=/Home"}
//             >
//               Sign In
//             </Link>
//           )}
//         </div>
//       </main>
//     </>
//   );
// };

// export default Home;
