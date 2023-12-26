"use client";

import DevelopmentModal from "@/components/dev/DevModal";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import mobileLogo from "../../public/logos/uTalkTo-logos_white.png";
import logo from "../../public/logos/uTalkTo-logos_black.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Login = () => {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    window.location.href = "/";
  };

  useEffect(() => {
    if (!sessionStorage.getItem("modalShown")) {
      setShowModal(true);
      sessionStorage.setItem("modalShown", true);
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    redirect("/Home");
  }

  return (
    <>
      {showModal && <DevelopmentModal onClose={handleCloseModal} />}
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
                className="px-6 py-4 text-6xl text-white transition duration-300 rounded-full shadow-xl shadow-black bg-oxford hover:bg-cambridge hover:text-bittersweet"
                href={"/api/auth/signin/google"}
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

export default Login;
